# Lighthouse Delta Summary (Task-405)

Date: 2026-04-24

## Scope
- Production-only audits were executed via `npm run lighthouse:prod:desktop` and `npm run lighthouse:prod:mobile`.
- Updated artifacts:
  - `lighthouse-report-desktop.json`
  - `lighthouse-report-mobile.json`

## Comparison Inputs
- Previous good baseline (user-provided report set): `lh-home-current.json`
- Recent bad reports (pre-fix snapshots captured before overwrite):
  - Desktop bad snapshot: previous `lighthouse-report-desktop.json`
  - Mobile bad snapshot: previous `lighthouse-report-mobile.json`
- New post-fix reports:
  - `lighthouse-report-desktop.json`
  - `lighthouse-report-mobile.json`

## Desktop Delta
| State | Perf | A11y | Best | SEO | FCP (ms) | LCP (ms) | TBT (ms) | TTI (ms) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Previous good baseline (user-provided) | 70 | 88 | 96 | 100 | 1681.0 | 12245.7 | 232.0 | 12673.2 |
| Recent bad report | 73 | 95 | 92 | 100 | 345.9 | 1355.7 | 588.5 | 13025.7 |
| New post-fix report | 77 | 95 | 93 | 100 | 396.1 | 2836.2 | 58.0 | 2912.2 |

## Mobile Delta
| State | Perf | A11y | Best | SEO | FCP (ms) | LCP (ms) | TBT (ms) | TTI (ms) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Previous good baseline (user-provided) | 70 | 88 | 96 | 100 | 1681.0 | 12245.7 | 232.0 | 12673.2 |
| Recent bad report | 45 | 89 | 92 | 100 | 1921.7 | 9462.2 | 2479.0 | 78906.5 |
| New post-fix report | 69 | 88 | 93 | 100 | 1778.3 | 13175.6 | 254.0 | 13573.1 |

## Concise Readout
- Desktop post-fix improved strongly versus recent bad on `TBT` (588.5 -> 58.0) and `TTI` (13025.7 -> 2912.2), with Performance score up from 73 to 77.
- Mobile post-fix recovered substantially versus recent bad on `TBT` (2479.0 -> 254.0), `TTI` (78906.5 -> 13573.1), and Performance score (45 -> 69).
- Mobile `LCP` in the new post-fix run (13175.6) remains above both the recent bad run (9462.2) and user baseline (12245.7), so this is the primary remaining gap.
