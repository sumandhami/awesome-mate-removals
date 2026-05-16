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

## ✅ Phase 4 — Services CMS (COMPLETE)

### What was done
- `service` Sanity schema created — fields: `title`, `slug`, `shortDescription`, `thumbnail` (image+hotspot), `order`, `seo` (metaTitle, metaDescription)
- GROQ query: `ALL_SERVICES_QUERY` — ordered by `order asc`
- `src/Componant1/Service/ServiceMain.jsx` — accepts `services[]` prop; icons stay hardcoded by array index (same pattern as Feature/Process/WhyChoose); `urlFor()` imported directly from `@/sanity/lib/image` (NOT `@/lib/sanity`) to avoid pulling server-only `SanityLive` into the client component tree
- `src/Componant1/Service/ServiceCard.jsx` — URL normalizer updated to accept `/services/*` sub-paths
- Props threaded: `Service.jsx` → `ServicesPage.jsx` → `app/(main)/services/page.jsx` (async fetch)
- `app/(main)/page.jsx` — 5-way `Promise.all` now includes services
- `src/PageViews/Home1/Home1.jsx` — accepts and forwards `services` prop
- `app/api/revalidate/route.js` — added `service` → `revalidateTag("services")`

### Icon handling decision
Icons are permanently hardcoded in `ServiceMain.jsx` as a `serviceIcons` array (FiHome, FiTruck, FiBriefcase, FiMap, FiTrash2, FiPackage). When CMS data is present, `serviceIcons[index]` provides the icon; CMS provides title/description/image.

### Pending user actions
1. Open `http://localhost:3000/studio`
2. Create 6 **Service** documents — fill title, shortDescription, thumbnail, order (1–6)
3. Publish all 6

### Key files created/modified
- `sanity/schemaTypes/service.ts` (new)
- `sanity/schemaTypes/index.ts` (registered service)
- `lib/queries/services.js` (new)
- `app/(main)/services/page.jsx` (async fetch)
- `src/Componant1/Service/ServiceMain.jsx` (props + fallback)
- `src/Componant1/Service/ServiceCard.jsx` (/services/* URL fix)
- `src/Componant1/Service/Service.jsx` (props thread)
- `src/PageViews/Services/ServicesPage.jsx` (props thread)
- `src/PageViews/Home1/Home1.jsx` (services prop)
- `app/(main)/page.jsx` (5-way Promise.all)
- `app/api/revalidate/route.js` (services tag)

---

## ✅ Phase 5 — Site Settings CMS (COMPLETE)

### What was done
- `siteSettings` singleton schema created — fields: `phone`, `email`, `abn`, `address` (object: street/suburb/state/postcode), `social` (object: facebook/instagram/tiktok), `googleMapsEmbedUrl`, `companyDescription`, `copyrightYear`
- GROQ query: `SITE_SETTINGS_QUERY` with `tags: ["siteSettings"]`
- `app/(main)/layout.jsx` — 3-way `Promise.all` (reviews, faqs, settings); `LocalBusiness` schema.org JSON-LD now uses CMS values with hardcoded fallbacks; passes `settings` to `<MainShell>`
- `src/Layouts/MainShell.jsx` — forwards `settings` to `<Navbar>` and `<Footer>`
- `src/Shared/Navbar/Navbar.jsx` — address, email, phone, all 3 social hrefs CMS-driven; also fixed pre-existing bug (email `<Link href="/">` → `<a href="mailto:...">`)
- `src/Shared/Footer/Footer.jsx` — phone, email, address, Facebook href, company description, ABN, copyright year, maps iframe src all CMS-driven
- `app/api/revalidate/route.js` — added `siteSettings` → `revalidateTag("siteSettings")`

### Scope decisions
- Logo/favicon: left as static assets (no CMS needed)
- Footer `quickLinks` and `serviceLinks` nav arrays: left hardcoded (structural, not editorial)
- X/LinkedIn/Pinterest social links: remain `"#"` (client hasn't provided URLs; not in schema)
- `pageMeta` document type: skipped — handled via `siteSettings` object fields instead

### Pending user actions
1. Open `http://localhost:3000/studio` → Site Settings document
2. Fill in phone, email, ABN, address, social links, Google Maps embed URL
3. Publish

### Key files created/modified
- `sanity/schemaTypes/siteSettings.ts` (new)
- `sanity/schemaTypes/index.ts` (registered siteSettings)
- `lib/queries/siteSettings.js` (new)
- `app/(main)/layout.jsx` (3-way Promise.all, LocalBusiness schema.org, settings prop)
- `src/Layouts/MainShell.jsx` (settings prop thread)
- `src/Shared/Navbar/Navbar.jsx` (CMS-driven + mailto fix)
- `src/Shared/Footer/Footer.jsx` (CMS-driven)
- `app/api/revalidate/route.js` (siteSettings tag)

---

## ✅ Phase 6 — Page SEO Metadata CMS (COMPLETE)

### What was done
- `homeSeo` and `servicesSeo` object fields added to existing `siteSettings` schema — each has: `metaTitle` (string), `metaDescription` (text), `ogImage` (image)
- `SITE_SETTINGS_QUERY` extended to fetch both SEO objects including `ogImage { asset->{ url } }`
- `app/(main)/page.jsx` — added `generateMetadata()` export; reads `settings.homeSeo.*` with hardcoded fallbacks; OG image included when present
- `app/(main)/services/page.jsx` — replaced static `export const metadata` with `generateMetadata()`; reads `settings.servicesSeo.*` with hardcoded fallbacks
- `app/(main)/layout.jsx` — removed redundant `metadata` export (was conflicting with page-level `generateMetadata`)
- Blog posts already had per-post SEO from Phase 2; blog listing, privacy policy, terms left hardcoded (not in scope)

### Recommended SEO values (enter these in Studio)
| Page | Meta Title (chars) | Meta Description (chars) |
|------|--------------------|--------------------------|
| Home | `Awesome Mate Removals \| Perth Removalists You Can Trust` (57) | `Trusted Perth removalists for home, office, furniture & interstate moves. Fully insured, locally owned. Get a free quote from Awesome Mate Removals today.` (153) |
| Services | `Our Removal Services \| Awesome Mate Removals Perth WA` (58) | `Explore our full range of removal services in Perth — residential, furniture, commercial, interstate & specialty item moves. Reliable, insured & affordable.` (152) |

### Pending user actions
1. Open `http://localhost:3000/studio` → Site Settings document
2. Fill in **Home Page SEO** and **Services Page SEO** sections
3. Publish

### Key files modified
- `sanity/schemaTypes/siteSettings.ts` (homeSeo + servicesSeo fields)
- `lib/queries/siteSettings.js` (extended query)
- `app/(main)/page.jsx` (generateMetadata)
- `app/(main)/services/page.jsx` (generateMetadata)
- `app/(main)/layout.jsx` (removed redundant metadata export)

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
