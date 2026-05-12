# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Webpack mode)
npm run build        # Production build (Webpack mode)
npm run start        # Start production server
npm run lint         # ESLint
npm run lint:strict  # ESLint with zero warnings (used in CI)
npm run ci           # lint:strict + build + npm audit
```

Lighthouse audits must run against a production build, never `next dev`:

```bash
npm run lighthouse:prod:desktop
npm run lighthouse:prod:mobile
npm run lighthouse:prod   # runs both in sequence
```

## Architecture

This is a **Next.js 16 App Router** site for Awesome Mate Removals (Perth removalists), deployed to Vercel.

### Route layout

```
app/
  layout.jsx            # Root layout: fonts, OG metadata, org schema.org, WhatsApp widget, Vercel analytics
  (main)/
    layout.jsx          # Injects review + FAQ schema.org, wraps in MainShell
    page.jsx            # Home → renders src/PageViews/Home1/Home1
    services/page.jsx   # /services
    blog/…/page.jsx     # Blog posts
    privacy-policy/     # Static legal pages
    terms-and-conditions/
  api/
    contact/route.js    # JSON-body contact form: Zod validation → Resend email
    forms/route.js      # HTML form-data fallback: Zod validation → webhook (FORM_WEBHOOK_URL)
```

### Component layers

| Layer | Path | Role |
|---|---|---|
| Page shell | `src/Layouts/MainShell.jsx` | Wraps every page with `<Navbar>`, `<Footer>`, `<ScrollToTop>` |
| Page views | `src/PageViews/` | Full-page compositions, one file per route |
| Section components | `src/Componant1/` | Reusable homepage/inner-page sections (Banner, About, Service, Testimonial, etc.) |
| Shared UI | `src/Shared/` | Navbar, Footer, Breadcamp, ErrorPage, ScrollToTop |
| App-level components | `components/` and `src/components/` | ContactForm (multi-step), WhatsAppWidget |

> **Note:** `src/Componant1/` is the legacy spelling — do not rename; imports throughout the codebase reference it.

### Data

Static content lives in `src/data/homepageContent.js` (reviews, FAQs). No database or CMS.

### Contact form

`components/ContactForm/ContactForm.jsx` is a two-step React Hook Form + Zod form:
- Step 1: personal info + service type (validated with `contactStep1Schema`)
- Step 2: property type with conditional fields (house → multi-storey, apartment → lift, villa → item types), addresses, Cloudflare Turnstile

Validation schema: `lib/schemas/contactSchema.js` (also duplicated at `src/lib/schemas/contactSchema.js`; keep both in sync).

API handler `app/api/contact/route.js`: rate-limiting (20 req/min/IP) → Turnstile verify (production only) → Zod → Resend email.

### react-router-dom compatibility layer

`src/lib/react-router-dom-compat.js` shims `react-router-dom` exports (`Link`, `NavLink`, `useNavigate`, `useLocation`, `Outlet`, etc.) onto Next.js primitives. It is aliased via webpack in `next.config.mjs`. **Do not remove it** — legacy `src/` components import from `react-router-dom` and the alias silently redirects those imports here.

### Path alias

`@/*` maps to the repo root (e.g., `@/src/…`, `@/lib/…`, `@/components/…`).

## Environment variables

See `.env.example` for all required variables. Critical ones:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata and schema.org |
| `RESEND_API_KEY` | Email delivery via Resend |
| `FORM_WEBHOOK_URL` | Webhook target for `app/api/forms/route.js` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile CAPTCHA (production only) |
| `NEXT_PUBLIC_TURNSTILE_ENABLED` / `TURNSTILE_ENABLED` | Must be `"true"` to activate Turnstile |

Turnstile is bypassed when `NODE_ENV !== 'production'` or `TURNSTILE_ENABLED !== 'true'`. The contact form also fails-open on email errors in non-production environments.

## Known constraints

- The dev server runs in Webpack mode (`--webpack` flag). Do not switch to Turbopack without testing the compat layer and CSS imports.
- Swiper carousels: keep `slidesPerView` and slide counts aligned when editing carousel data or you will get loop artefacts.
- SEO redirects for legacy URLs (from a prior HTML template) are maintained in `next.config.mjs` — do not remove them.
- Lighthouse CI gates are run in CI (`npm run lhci`). Do not regress performance/accessibility scores.
