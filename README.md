# Cleeny Next.js Template

This project is migrated to Next.js App Router and prepared for Vercel-style deployment.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

Lint and quality checks:

```bash
npm run lint:strict
npm run ci
```

## Environment Variables

Use these environment file rules to avoid deployment and security issues:

- `.env.local`: local development only, never committed.
- `.env.example`: committed, shows required variable shape with placeholders only.
- `.env.test`: local/CI test environment only, never committed.
- Staging variables: set in hosting provider UI, never in files.
- Production secrets: set in hosting provider UI, never in files.

Current required variables are documented in `.env.example`.

## Security Notes

- Do not hardcode secrets in source files.
- Form handling is implemented in `app/api/forms/route.js` with validation and rate limiting.
- No middleware/proxy file is currently configured; access control is route-based.
- Keep `.env`, `.env.local`, and `.env.test` out of version control.

## Known Limitations

- This project uses a compatibility layer for legacy `react-router-dom` imports.
- If you remove or refactor the compatibility layer, re-test all navigation and dropdown links.
- Swiper loop behavior depends on slide counts and `slidesPerView` settings; keep these aligned when editing carousel data.
