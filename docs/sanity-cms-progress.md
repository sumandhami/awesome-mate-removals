# Sanity CMS Integration — Progress & Remaining Plan

## Project
**Awesome Mate Removals** — Next.js 16 App Router site for a Perth removalist, deployed to Vercel.
**Repo root:** `c:\Users\suman\Documents\AwesomeMate Removals\website\AwesomeMate`
**Branch:** `anjan`

## Sanity Project
- **Project ID:** `m2nn2d0k`
- **Dataset:** `production`
- **API Version:** `2026-05-12`
- **Studio URL (local):** `http://localhost:3000/studio`

## Architecture Notes (important for all phases)
- `src/Componant1/` — legacy spelling, do NOT rename
- `@/*` maps to repo root (defined in both `jsconfig.json` and `tsconfig.json`)
- Dev server runs with `--webpack` flag — do not switch to Turbopack
- Sanity client lives at `@/sanity/lib/client` (exports `client`)
- Image URL builder lives at `@/sanity/lib/image` (exports `urlFor`)
- Shared re-export at `@/lib/sanity.js` (exports `sanity`, `urlFor`, `sanityFetch`, `SanityLive`)
- GROQ queries live in `@/lib/queries/`
- All cache tags use `{ next: { tags: [...] } }` on `client.fetch()`
- Revalidation webhook at `POST /api/revalidate` — checks `x-sanity-webhook-secret` header, calls `revalidateTag()`

---

## ✅ Phase 1 — Sanity Setup (COMPLETE)

### What was done
- Sanity project created via CLI, Studio scaffolded in `sanity/` folder
- `@portabletext/react` installed (v6.2.0, direct dep)
- `lib/sanity.js` created — re-exports `client`, `urlFor`, `sanityFetch`, `SanityLive`
- `.env.local` populated with project ID, dataset, API version, read token placeholder
- `.env.example` updated with all Sanity var placeholders
- `next.config.mjs` updated:
  - `images.remotePatterns` — added `cdn.sanity.io`
  - `connect-src` CSP — added `https://*.sanity.io wss://*.sanity.io`
- `tsconfig.json` — added `baseUrl: "."` and `paths: { "@/*": ["./*"] }` (Sanity CLI had overwritten these)
- `app/studio/[[...tool]]/page.tsx` — Studio embedded route (created by CLI)
- CORS origins added in `sanity.io/manage`: `http://localhost:3000` + production URL, both with credentials enabled

### Key files created/modified
- `sanity/` (entire folder — Studio)
- `sanity.config.ts` (Studio config, basePath: '/studio')
- `sanity.cli.ts`
- `sanity/env.ts`
- `sanity/lib/client.ts`
- `sanity/lib/image.ts`
- `sanity/lib/live.ts`
- `sanity/schemaTypes/index.ts`
- `lib/sanity.js`
- `tsconfig.json`
- `next.config.mjs`
- `.env.local`
- `.env.example`

---

## ✅ Phase 2 — Blog CMS (COMPLETE)

### What was done
- `post` Sanity schema defined — fields: `title`, `slug`, `publishedAt`, `updatedAt`, `excerpt`, `coverImage` (image+hotspot+alt), `body` (Portable Text: blocks + images), `seo` (metaTitle, metaDescription, ogImage)
- GROQ queries created: `ALL_POSTS_QUERY`, `POST_BY_SLUG_QUERY`, `ALL_POST_SLUGS_QUERY`
- Dynamic blog route created — `app/(main)/blog/[slug]/page.jsx`
  - Server component, fetches by slug with `next: { tags: ["posts"] }`
  - `generateStaticParams()` for ISR
  - `generateMetadata()` from `post.seo` fields
  - PortableText rendering with custom Tailwind-styled components (h2, h3, normal, bullet, number, image, strong, em, link)
  - BlogPosting schema.org JSON-LD
  - 404 via `notFound()` if post missing
- Blog listing page created — `app/(main)/blog/page.jsx`
  - Server component, fetches all posts
  - Shows "No posts yet" when empty
  - Date formatting for card thumbnails
- `src/Componant1/Blog/Blog.jsx` refactored — accepts `posts` prop, returns `null` when empty, "View All Blog" links to `/blog`
- `src/Componant1/Blog/BlogCard.jsx` refactored — handles Sanity image objects via `urlFor`, accepts any `/blog/*` URL (removed hardcoded URL whitelist)
- `app/(main)/page.jsx` converted to Server Component — fetches posts, passes to `<Home1 posts={posts} />`
- `src/PageViews/Home1/Home1.jsx` — accepts `posts` prop, passes to `<Blog posts={posts} />`
- `app/api/revalidate/route.js` — webhook handler, `revalidateTag("posts")` when `_type === "post"`

### Pending user action
- Enter the existing blog post ("How to Move Heavy Furniture Without Damage") into Sanity Studio
- After content is live in Studio, delete the old hardcoded folder: `app/(main)/blog/how-to-move-heavy-furniture-without-damage/`
- Set up Sanity webhook in `sanity.io/manage → API → Webhooks → POST /api/revalidate`

### Key files created/modified
- `sanity/schemaTypes/post.ts` (new)
- `sanity/schemaTypes/index.ts` (updated — registered post)
- `lib/queries/posts.js` (new)
- `app/(main)/blog/[slug]/page.jsx` (new dynamic route)
- `app/(main)/blog/page.jsx` (new listing page)
- `app/(main)/page.jsx` (server component)
- `src/Componant1/Blog/Blog.jsx` (props refactor)
- `src/Componant1/Blog/BlogCard.jsx` (Sanity image + URL fix)
- `src/PageViews/Home1/Home1.jsx` (posts prop)
- `app/api/revalidate/route.js` (new)

---

## ✅ Phase 3 — Homepage Sections CMS (COMPLETE)

### What was done
- `review`, `faq`, and `homepage` Sanity schemas created and registered
- GROQ queries created: `HOMEPAGE_QUERY`, `ALL_REVIEWS_QUERY`, `ALL_FAQS_QUERY`
- `app/(main)/page.jsx` — 4 parallel fetches via `Promise.all`, passes `homepage`, `reviews`, `faqs` + `posts` to `<Home1>`
- `app/(main)/layout.jsx` — made `async`, now fetches reviews + FAQs from Sanity for schema.org JSON-LD; `homepageContent.js` import removed
- `src/PageViews/Home1/Home1.jsx` — accepts and passes all 4 props down to section components
- All 10 homepage section components refactored to accept CMS props with hardcoded fallbacks (site renders existing content until Sanity data is entered)
- `app/api/revalidate/route.js` — extended to revalidate `"homepage"`, `"reviews"`, `"faqs"` tags
- `src/data/homepageContent.js` — deleted (no remaining imports)
- **Pricing skipped** — placeholder data not suitable for CMS yet; left fully hardcoded

### Icon handling decision
Icons in Feature, Process (Working Process), and WhyChoose are **permanently hardcoded** as React icons (`react-icons`). The `homepage` schema has no icon fields for these sections. When CMS data is present, only `title` and `description` are pulled from Sanity — icons are always the original hardcoded ones, matched by array index position.

### Fallback behaviour
Every section component uses this pattern:
```js
const data = cmsData && cmsData.length > 0 ? cmsData : fallbackData;
```
The site renders the original hardcoded content until you publish data in Sanity Studio. No downtime, no blank sections.

### Pending user actions
1. Open `http://localhost:3000/studio`
2. Create one **Homepage** document and fill in all sections (hero, about, features titles/descs, process step titles/descs, whyChoose titles/descs, serviceAreas, movingCost items, portfolio items)
3. Create 3 **Review** documents (copy from old `homeReviews` data)
4. Create 5 **FAQ** documents (copy from old `homeFaqs` data)
5. Set up Sanity webhook in `sanity.io/manage → API → Webhooks → POST /api/revalidate` (if not already done in Phase 2)

### Key files created/modified
- `sanity/schemaTypes/review.ts` (new)
- `sanity/schemaTypes/faq.ts` (new)
- `sanity/schemaTypes/homepage.ts` (new)
- `sanity/schemaTypes/index.ts` (registered review, faq, homepage)
- `lib/queries/homepage.js` (new)
- `app/(main)/page.jsx` (4 parallel fetches, 4 props)
- `app/(main)/layout.jsx` (async, Sanity fetch, removed homepageContent import)
- `src/PageViews/Home1/Home1.jsx` (passes all props to section components)
- `src/Componant1/Banner/Banner.jsx` (accepts `hero` prop)
- `src/Componant1/About/About.jsx` (accepts `about` prop)
- `src/Componant1/Feature/Feature.jsx` (accepts `features[]` prop — icons hardcoded)
- `src/Componant1/Process/Process.jsx` (accepts `processSteps[]` prop — icons hardcoded)
- `src/Componant1/WhyChoose/WhyChoose.jsx` (accepts `whyChooseItems[]` prop — icons hardcoded)
- `src/Componant1/ServiceAreas/ServiceAreas.jsx` (accepts `serviceAreas[]` prop)
- `src/Componant1/MovingCost/MovingCost.jsx` (accepts `movingCost` prop)
- `src/Componant1/Portfolio/Portfolio.jsx` (accepts `portfolio[]` prop)
- `src/Componant1/Testimonial/Testimonial.jsx` (accepts `reviews[]` prop, removed homepageContent import)
- `src/Componant1/Faq/HomeFaq.jsx` (accepts `faqs[]` prop, removed homepageContent import)
- `app/api/revalidate/route.js` (added homepage, reviews, faqs tags)
- `src/data/homepageContent.js` (deleted)

---

## 🔲 Phase 4 — Services CMS (TODO)

### Goal
Move the 6 service cards (title, description, thumbnail, icon, feature list) and services page metadata into Sanity.

### Sanity schema to create

**`service` document** (`sanity/schemaTypes/service.ts`):
```
fields: title, slug(slug), shortDescription(text), thumbnail(image+hotspot), icon(image),
        features[](string), order(number), seo: { metaTitle, metaDescription }
```

### GROQ queries (`lib/queries/services.js`)
```js
export const ALL_SERVICES_QUERY = `*[_type == "service"] | order(order asc) { ... }`
```

### Files to touch
- `sanity/schemaTypes/service.ts` (new)
- `sanity/schemaTypes/index.ts` (register service)
- `lib/queries/services.js` (new)
- `app/(main)/services/page.jsx` — async server component, fetch services, pass to `<ServicesPage>`
- `src/Componant1/Service/ServiceMain.jsx` — accept `services[]` prop, replace hardcoded `serviceData` array, use `urlFor()` for images
- `src/PageViews/Services/ServicesPage.jsx` — accept `services` prop, pass to ServiceMain
- `app/(main)/page.jsx` — also fetch services here, pass to `<Home1>` → `<Service>`
- `app/api/revalidate/route.js` — add `revalidateTag("services")`

---

## 🔲 Phase 5 — Site Settings & Page Metadata CMS (TODO)

### Goal
Move global company info (phone, email, address, social links, logo) and per-page SEO metadata into Sanity. Navbar and Footer become CMS-driven.

### Sanity schemas to create

**`siteSettings` singleton** (`sanity/schemaTypes/siteSettings.ts`):
```
fields: companyName, tagline, phone, email, abn,
        address: { street, suburb, state, postcode, country },
        logo(image), favicon(image),
        social: { facebook, instagram, tiktok, twitter, linkedin },
        googleMapsEmbedUrl(text), copyrightYear(number)
```

**`pageMeta` document** (`sanity/schemaTypes/pageMeta.ts`):
```
fields: pageKey(string — "home", "services", "privacy-policy", etc.),
        title, description, ogImage(image), canonical(string)
```

### GROQ queries (`lib/queries/siteSettings.js`)
```js
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] { ... }`
export const PAGE_META_QUERY = `*[_type == "pageMeta" && pageKey == $pageKey][0] { ... }`
```

### Files to touch
- `sanity/schemaTypes/siteSettings.ts` (new)
- `sanity/schemaTypes/pageMeta.ts` (new)
- `sanity/schemaTypes/index.ts` (register both)
- `lib/queries/siteSettings.js` (new)
- `app/layout.jsx` — fetch siteSettings, build metadata + schema.org LocalBusiness from CMS
- `app/(main)/services/page.jsx` — fall back to CMS pageMeta for metadata
- `src/Shared/Navbar/Navbar.jsx` — accept `settings` prop (phone, email, address, socials)
- `src/Shared/Footer/Footer.jsx` — accept `settings` prop (all contact + social + copyright)
- `src/Layouts/MainShell.jsx` — pass settings prop through to Navbar + Footer
- `app/api/revalidate/route.js` — add `revalidateTag("siteSettings")`
- Caching: `siteSettings` fetches use `next: { revalidate: 3600 }` (1 hour)

---

## Cross-Phase Notes

### Image handling pattern
```js
// Always use urlFor for Sanity images:
urlFor(source).width(N).auto("format").url()

// In Next.js <Image>:
<Image src={urlFor(image).width(800).auto("format").url()} alt={image.alt} ... />
```

### Cache tag pattern
```js
// Fetching with cache tags:
await client.fetch(QUERY, params, { next: { tags: ["tagname"] } })

// Revalidating in webhook:
revalidateTag("tagname")
```

### Singleton documents (homepage, siteSettings)
Sanity doesn't have a built-in singleton type. Convention: create a document of that type and only ever have one. In `sanity/structure.ts`, hide the "create new" button for singleton types using the structure builder.

### Vercel env vars needed (add in Vercel dashboard)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=m2nn2d0k
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-12
SANITY_READ_TOKEN=<from sanity.io/manage>
SANITY_WEBHOOK_SECRET=<generate a random string>
```
