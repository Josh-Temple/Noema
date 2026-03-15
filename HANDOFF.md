# Noema Wave 3 Handoff

## What changed structurally in Wave 3

1. **Migrated from static prototype to Next.js App Router + TypeScript + Tailwind**.
   - Added route-based pages under `app/`.
   - Added global layout shell and unified bottom navigation.

2. **Separated content from rendering**.
   - Moved thinker/comparison/theme data into typed local modules:
     - `src/content/thinkers.ts`
     - `src/content/comparisons.ts`
     - `src/content/themes.ts`
   - Added models in `src/types/content.ts`.

3. **Introduced derivation utilities and route helpers**.
   - Content querying now centralized in `src/lib/content.ts`.
   - Route builders in `src/lib/routes.ts`.
   - Search index and filtering in `src/lib/search.ts`.
   - Daily picks/recommendation helpers in `src/lib/recommendations.ts`.

4. **Centralized local state/storage logic**.
   - Added reusable local storage wrappers in `src/lib/storage.ts`.
   - Added hooks:
     - `src/hooks/useSavedItems.ts`
     - `src/hooks/useRecentItems.ts`

5. **Componentized page sections for maintainability**.
   - Added reusable components across `src/components/*` for home/compare/thinker/theme/search/saved/common/layout.

6. **Added baseline error/empty handling**.
   - Added `app/not-found.tsx`.
   - Added reusable `EmptyState` and empty result rendering for saved/search.

## What was intentionally not changed

- Core visual language (dark navy + blue-violet accent) was preserved.
- Comparison-first experience remains the product center.
- No backend, auth, CMS, sync, graph view, timeline-first mode, quiz expansion, or AI chat features were introduced.

## Remaining technical debt

1. **Saved actions UI coverage is partial**
   - Hook infrastructure exists, but save buttons should be surfaced consistently on thinker/theme/compare cards.

2. **Potentially missing relation slugs in seed data**
   - A few thinker relation links may reference non-seeded thinkers; currently handled safely by filtered derivation helpers.

3. **Content scale and editorial consistency**
   - Seed content is suitable for MVP architecture but still needs editorial QA for tone consistency and cross-link depth.

4. **Tests**
   - No dedicated unit/integration test suite yet for content utilities, search behavior, and hooks.

## Recommended Wave 4 priorities

1. Add lightweight automated tests for:
   - content derivation helpers
   - search grouping/filtering
   - storage hooks behavior
2. Expand comparison coverage while preserving concise reading density.
3. Improve save UX consistency across all cards and detail pages.
4. Add optional redirect route support (comparison slug -> pair route) if editorial workflow benefits.
5. Perform accessibility pass (focus order, keyboard nav, landmarks, contrast checks).
