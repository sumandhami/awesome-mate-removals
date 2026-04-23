# Product Requirements Document (PRD)

## Document Control
- **Title:** Next.js 16 Migration Stabilization, Security Hardening, and Performance/SEO Remediation
- **Author:** [Author Name]
- **Date:** 23 April 2026
- **Version:** 1.0

## Executive Summary
This document defines the product and engineering requirements to stabilize and complete the repository's migration to Next.js 16 App Router while preserving business continuity. The current system has partially migrated routing and rendering responsibilities, with legacy components in src still powering major page content. This has introduced routing inconsistencies, elevated security exposure, and measurable performance and SEO deficits.

The owner requirement is to execute work in a controlled, context-first sequence. Therefore, this PRD mandates an initial baseline and discovery phase before remediation and requires all pull requests to be narrowly scoped, test-backed, and free from unrelated refactors.

## Problem Statement
The application currently operates in a hybrid state where Next.js App Router is the platform entry point, but legacy react-router-dom patterns remain active in shared and feature components. This creates navigation mismatch, inconsistent route behavior, and maintainability risk. In parallel, API and security controls are below production-grade standards, performance is constrained by heavy image and JavaScript payloads, and SEO metadata/sitemap integrity is not fully aligned with implemented routes.

Without structured remediation, the project risks increased security incidents, reduced conversion and discoverability due to page speed and SEO gaps, and higher engineering overhead caused by architectural drift.

## Goals
1. Establish full and verifiable baseline context across architecture, security, performance, and SEO before implementation.
2. Eliminate routing mismatch between App Router and legacy react-router-dom usage.
3. Implement security hardening for API endpoints and runtime/browser policy.
4. Improve Core Web Vitals and reduce page payload through image and JavaScript optimization.
5. Align sitemap and metadata with actual implemented and indexable routes.
6. Deliver all changes through narrow, controlled remediation PRs with no unrelated code changes.

## Non-Goals
1. Full redesign of UI/UX or content strategy.
2. Broad refactor of all legacy components unrelated to migration correctness.
3. Introduction of new business features not required for stabilization.
4. Platform migration away from Next.js 16.
5. Re-architecture to a new backend service model in this initiative.

## Current State Assessment

### Architecture
- Next.js 16 App Router is active under app.
- Implemented routes are currently:
  - /
  - /services
  - /blog/how-to-move-heavy-furniture-without-damage
- Legacy component trees under src/Shared and src/Componant1 still drive large portions of rendered page composition.
- react-router-dom usage in legacy components conflicts with Next routing expectations and can produce broken or inconsistent navigation transitions.

Key repository paths:
- app/(main)/page.jsx
- app/(main)/services/page.jsx
- app/(main)/blog/how-to-move-heavy-furniture-without-damage
- src/Shared
- src/Componant1
- src/lib/react-router-dom-compat.js

### Security
Identified concerns requiring immediate remediation:
- Exposed secret in environment template.
- Weak input sanitization and insufficient server-side canonical validation.
- Open redirect risk from referer handling in app/api/forms/route.js.
- Optional reCAPTCHA enforcement where strong verification should be mandatory by policy.
- In-memory rate limiting (non-distributed, restart-sensitive).
- Weakened CSP posture including unsafe-inline and unsafe-eval allowances.
- Need robust output escaping in email template composition.

Key repository paths:
- app/api/contact/route.js
- app/api/forms/route.js
- .env.example
- next.config.mjs

### Performance
- Heavy and unoptimized image assets.
- Widespread img tag usage where next/image should be applied.
- High LCP and unused JavaScript overhead.
- Large homepage composition with synchronous imports reducing interactivity readiness.

Key repository paths:
- app/(main)/page.jsx
- src/Componant1
- public/images

### SEO
- app/sitemap.js includes hardcoded routes that may not match implemented pages.
- Metadata patterns are not fully consistent across routes and templates.

Key repository paths:
- app/sitemap.js
- app/layout.jsx
- app/(main)/layout.jsx

### Operations
- Owner requires controlled remediation sequence with context establishment first.
- Delivery governance must enforce narrow PR boundaries and avoid unrelated code movement.

## Scope

### In Scope
1. Baseline discovery and gap register for architecture, security, performance, and SEO.
2. Routing correctness and navigation consistency in App Router and legacy bridge points.
3. API hardening and input/output safety improvements.
4. Core performance optimization for images, JS payload, and render strategy.
5. Sitemap and metadata correction for implemented routes.
6. Governance controls for remediation PR scope, review quality, and rollback safety.

### Out of Scope
1. Complete rewrite of all src legacy modules.
2. New marketing feature set unrelated to current stabilization goals.
3. Infrastructure platform migration beyond requirements stated in this PRD.

## Functional Requirements
- **FR-001:** System shall produce a documented baseline inventory of implemented routes, navigation sources, and legacy-to-App-Router dependency points before code remediation starts.
- **FR-002:** System shall ensure all user-visible navigation in production routes resolves through Next.js-compatible routing behavior.
- **FR-003:** System shall remove or neutralize react-router-dom navigation mismatch in legacy paths that influence active routes.
- **FR-004:** System shall enforce strict request validation and sanitization for API form/contact handlers.
- **FR-005:** System shall prevent redirect abuse by validating referer/origin handling against explicit allowlists.
- **FR-006:** System shall enforce anti-automation verification per policy for applicable submission endpoints.
- **FR-007:** System shall implement robust outbound content escaping for templated email composition.
- **FR-008:** System shall update sitemap generation to include only implemented, indexable, canonical routes.
- **FR-009:** System shall provide route-level metadata consistency for title, description, and canonical semantics.
- **FR-010:** Remediation PRs shall be narrow, single-purpose, and explicitly exclude unrelated refactors.

## Non-Functional Requirements
- **NFR-001 (Availability):** Public pages and API endpoints shall maintain at least 99.9% successful request handling during remediation releases.
- **NFR-002 (Reliability):** No regression in route availability for the three currently implemented routes.
- **NFR-003 (Maintainability):** Every remediation PR shall include problem statement, scope boundary, tests, and rollback notes.
- **NFR-004 (Observability):** Security and performance changes shall include measurable before/after evidence from defined test runs.
- **NFR-005 (Delivery Governance):** Unrelated code changes are prohibited in remediation PRs unless approved as a separate task.

## Security Requirements
- **SR-001:** Secrets shall not be present in repository-tracked templates beyond explicit placeholders.
- **SR-002:** API input validation shall reject malformed payloads and sanitize accepted content by schema and allowlist rules.
- **SR-003:** Redirect and referer-driven flows shall use strict origin/URL validation and deny-by-default behavior.
- **SR-004:** reCAPTCHA (or approved anti-bot control) shall be required for protected form submissions in production mode.
- **SR-005:** Rate limiting shall be durable and environment-appropriate; in-memory-only controls shall not be the sole protection in production.
- **SR-006:** CSP policy shall remove unsafe-inline and unsafe-eval unless formally exempted with documented compensating controls and expiration.
- **SR-007:** Output in email templates shall be escaped/encoded to prevent injection and malicious content propagation.
- **SR-008:** Security controls shall be covered by automated tests for acceptance and failure cases.

## Performance Requirements
- **PR-001:** Replace non-decorative critical-path img usage with next/image on active routes where technically feasible.
- **PR-002:** Reduce mobile LCP to <= 2.5s for homepage under agreed Lighthouse profile.
- **PR-003:** Achieve mobile Lighthouse Performance score >= 85 for implemented routes.
- **PR-004:** Reduce total client-side JavaScript transferred on homepage by at least 20% from baseline.
- **PR-005:** Introduce code-splitting/lazy loading for non-critical homepage sections currently synchronously imported.
- **PR-006:** Ensure image delivery strategy uses responsive sizing and modern formats where possible.

## SEO and Content Requirements
1. Sitemap shall represent only implemented, canonical, indexable routes.
2. Route metadata shall be complete and consistent across implemented pages.
3. Canonical URL strategy shall avoid duplicate indexing signals.
4. Structured internal linking shall align with actual route availability.
5. Content rendering shall preserve crawlability and semantic HTML hierarchy.

## Implementation Plan by Phase

### Phase 0: Immediate Security Hardening
Objectives:
- Eliminate high-risk exposure and enforce baseline API/browser security controls.

Workstreams:
- Remove sensitive values from templates and enforce placeholder-only env patterns.
- Implement strict validation/sanitization in app/api/contact/route.js and app/api/forms/route.js.
- Mitigate open redirect risk in referer/origin processing.
- Enforce anti-bot control policy.
- Strengthen CSP policy in next.config.mjs.
- Harden output escaping in email template composition.

Governance:
- PRs must be narrow and security-scoped only.

### Phase 1: Routing Correctness
Objectives:
- Resolve App Router and legacy react-router-dom mismatch affecting implemented routes.

Workstreams:
- Map and correct navigation entry points from src/Shared and src/Componant1 that impact active pages.
- Replace incompatible navigation behavior with Next-compatible routing.
- Validate route transitions, internal links, and fallback behavior.

Governance:
- PRs must target one routing concern at a time and avoid unrelated component redesign.

### Phase 2: Performance Optimization
Objectives:
- Improve Core Web Vitals and reduce render/payload bottlenecks.

Workstreams:
- Image optimization migration (next/image and responsive assets).
- Lazy loading of non-critical homepage modules.
- Removal or deferment of unused JavaScript and synchronous-heavy composition.
- Route-level performance verification against baseline.

Governance:
- PRs must include before/after evidence and isolate one optimization class per PR.

### Phase 3: Scalability and Governance
Objectives:
- Institutionalize standards for future migration and release safety.

Workstreams:
- Finalize sitemap/metadata governance and parity checks.
- Add release guardrails, PR templates, and acceptance checklists.
- Define ongoing monitoring and KPI reporting cadence.

Governance:
- PRs must be compliance and operations scoped; no functional expansion unless separately approved.

## Acceptance Criteria per Phase

### Phase 0 Acceptance Criteria
1. No exposed secrets in tracked templates.
2. API validation/sanitization and output escaping implemented and tested for positive/negative cases.
3. Open redirect vector from referer handling removed or blocked.
4. reCAPTCHA policy enforced for applicable production submissions.
5. CSP policy no longer depends on unsafe-inline/unsafe-eval without approved exemption.

### Phase 1 Acceptance Criteria
1. Implemented routes exhibit consistent navigation under Next routing.
2. No blocking react-router-dom mismatch remains on active route flows.
3. Internal links to implemented pages resolve correctly without unexpected client routing behavior.

### Phase 2 Acceptance Criteria
1. Mobile LCP <= 2.5s for homepage baseline scenario.
2. Mobile Lighthouse Performance >= 85 on implemented routes.
3. Documented reduction in homepage JS payload and render blocking behavior.

### Phase 3 Acceptance Criteria
1. Sitemap includes only implemented/indexable canonical routes.
2. Metadata consistency checks pass for implemented routes.
3. Governance controls and PR scope enforcement are active in release workflow.

## Prioritized Remediation Backlog

| ID | Item | Severity | Owner Role | Estimate | Target Phase |
|---|---|---|---|---|---|
| RB-001 | Remove sensitive value patterns from .env.example and enforce placeholder policy | Critical | Security Engineer | 0.5 day | Phase 0 |
| RB-002 | Harden validation and sanitization in app/api/contact/route.js | Critical | Backend Engineer | 1 day | Phase 0 |
| RB-003 | Remove open redirect risk in referer/origin logic in app/api/forms/route.js | Critical | Backend Engineer | 1 day | Phase 0 |
| RB-004 | Enforce mandatory anti-bot verification for protected form submissions | High | Backend Engineer | 1 day | Phase 0 |
| RB-005 | Replace in-memory-only rate limiting with production-grade strategy | High | Platform Engineer | 1.5 days | Phase 0 |
| RB-006 | Tighten CSP directives in next.config.mjs and remove unsafe-inline/unsafe-eval dependencies | High | Security Engineer | 1 day | Phase 0 |
| RB-007 | Ensure robust output escaping for email template composition in API handlers | High | Backend Engineer | 1 day | Phase 0 |
| RB-008 | Inventory and remediate react-router-dom navigation mismatch in src/Shared and src/Componant1 | High | Frontend Engineer | 2 days | Phase 1 |
| RB-009 | Normalize navigation behavior for implemented routes in App Router context | High | Frontend Engineer | 2 days | Phase 1 |
| RB-010 | Replace critical-path img usage with next/image on active route components | Medium | Frontend Engineer | 2 days | Phase 2 |
| RB-011 | Reduce homepage synchronous imports using lazy loading/splitting in app/(main)/page.jsx composition chain | Medium | Frontend Engineer | 2 days | Phase 2 |
| RB-012 | Audit and remove unused JS from primary route payloads | Medium | Frontend Engineer | 1.5 days | Phase 2 |
| RB-013 | Correct app/sitemap.js to represent implemented, canonical routes only | Medium | SEO Engineer | 0.5 day | Phase 3 |
| RB-014 | Standardize route metadata and canonical semantics across implemented pages | Medium | Frontend Engineer | 1 day | Phase 3 |
| RB-015 | Implement PR governance checklist enforcing narrow remediation-only scope | Medium | Engineering Manager | 0.5 day | Phase 3 |

## Risks and Mitigations
1. **Risk:** Security hardening introduces false-positive request rejection.  
   **Mitigation:** Stage validation rules with test fixtures and controlled rollout.
2. **Risk:** Routing fixes break legacy component interactions.  
   **Mitigation:** Route-flow regression suite for implemented pages before merge.
3. **Risk:** Performance changes alter visual behavior.  
   **Mitigation:** Visual regression checks and targeted QA sign-off.
4. **Risk:** Broad PRs increase rollback complexity.  
   **Mitigation:** Enforce narrow PR policy and single-purpose changes.
5. **Risk:** SEO corrections remove expected URLs unintentionally.  
   **Mitigation:** Route inventory approval before sitemap publication.

## Dependency and Assumptions
1. Current implemented route list is authoritative unless explicitly updated by product/engineering leadership.
2. Required credentials and anti-bot service keys are available in deployment environments.
3. Team capacity exists across Security, Frontend, Backend, and Platform roles.
4. Baseline Lighthouse and security test environments are reproducible.
5. Migration work remains constrained to repository-defined scope.

## Testing and Validation Strategy
1. Security tests:
- Input validation/sanitization pass/fail scenarios.
- Redirect abuse prevention tests.
- CSP verification and security header checks.
- Email output escaping tests.
2. Routing tests:
- End-to-end route transition tests for /, /services, and /blog/how-to-move-heavy-furniture-without-damage.
- Link integrity tests for navigation components sourced from legacy modules.
3. Performance tests:
- Lighthouse mobile profiles for implemented routes.
- Bundle and transfer size comparison against baseline.
- LCP and render path verification.
4. SEO tests:
- Sitemap route parity check against implemented routes.
- Metadata consistency checks.
5. Release gating:
- Phase acceptance criteria must pass before advancing to next phase.

## Release and Rollback Strategy
1. Deliver remediation in phase-aligned, narrow PR increments.
2. Tag each phase baseline before production deployment.
3. Use canary or controlled rollout for high-impact security/routing changes where possible.
4. Rollback at PR granularity; avoid bundling unrelated changes that complicate reversal.
5. Maintain a release log with change intent, validation artifacts, and rollback trigger conditions.

## Success Metrics and KPIs
1. Security:
- Zero critical known vulnerabilities from identified current-state list remaining open after Phase 0.
- 100% protected form endpoints enforcing required anti-bot verification in production.
2. Routing:
- 0 high-severity navigation mismatch defects on implemented routes after Phase 1.
3. Performance:
- Mobile LCP <= 2.5s on homepage.
- Mobile Lighthouse Performance >= 85 on implemented routes.
- >= 20% reduction in homepage client-side JS payload.
4. SEO:
- 100% sitemap entries correspond to implemented canonical routes.
- 100% implemented routes have complete metadata set.
5. Delivery Governance:
- 100% remediation PRs pass narrow-scope checklist and contain no unrelated refactors.

## Open Questions
1. Which anti-bot provider and verification policy should be treated as authoritative for production enforcement?
2. What is the approved production-grade rate limiting mechanism for distributed deployments?
3. Which CSP exemptions, if any, are acceptable and for what expiration period?
4. Is there an approved canonical URL domain policy for metadata and sitemap generation?
5. Should additional routes be considered in-scope for this remediation cycle beyond the currently implemented three?
6. What exact PR template fields and review gates are mandatory for narrow-scope enforcement?

## Delivery Governance Requirement
All remediation pull requests under this PRD must be narrow in scope, mapped to a specific backlog item and phase, and must not include unrelated refactors, stylistic rewrites, or opportunistic changes outside the declared objective. Any unrelated change must be proposed separately under a new, independently reviewed task.