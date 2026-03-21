# Noema Wave 4 Handoff

## Current product state

Noema is now a single root-level Next.js App Router application focused on comparison-first philosophy learning. The current product already includes the major content expansion waves described in `README.md` (modern epistemology, ethics/politics, ancient ethics, 20th-century bridges, search/recommendation upgrades, and East Asian Thought Pack II) plus baseline PWA support.

Sprint 9 shifted the product emphasis from adding another large content pack to improving lightweight revisit behavior. The app should now feel more like a calm place to return to for a one-minute philosophical refresher.

## What Sprint 9 added

### 1. Lightweight learning loops

- Added a home-page revisit section that uses saved items first and recent activity second.
- The surface is intentionally compact and editorial rather than dashboard-like.
- Saved comparisons can be resumed directly, while saved thinkers/themes can suggest an appropriate comparison entrypoint.

### 2. Recent-item continuation logic

- Added deterministic “continue from here” suggestion logic based on recent items.
- Comparison views prefer corridor continuation (`nextComparisonSlugs`).
- Thinker/theme recents resolve into related comparison entrypoints rather than generic recommendations.
- Reason labels were updated to feel more educational, e.g. “流れをつかむ次の一歩”, “対立を深める比較”, “あとで戻ると効く比較”.

### 3. Mini review mode on compare pages

- Comparison pages now include a small `理解確認` block.
- The review block is intentionally lightweight: three short review points, two gentle self-check prompts, and one suggested next step.
- There is no scoring, streak, XP, or heavy quiz state.

### 4. Thinker-page learning entry

- Thinker pages can now surface a compact “この人物から学ぶなら” module.
- This module uses local recent/saved state on the client and points users toward a first comparison, an adjacent thinker, or a revisit route.

### 5. Saved page as a study shelf

- `/saved` is now organized as a study shelf instead of a flat archive.
- Saved items are grouped into: saved comparisons, saved thinkers, and saved themes.
- Each group can attach one deterministic “next study step” based on existing relation fields and recommendation helpers.

## How the lightweight learning loop works

The learning loop is still fully local and deterministic. There is no backend, auth, ML, or remote personalization. The main logic is centralized in `src/lib/recommendations.ts`.

Core behavior:

- `saved` items create a reason to come back.
- `recent` items create the continuation path.
- Compare pages summarize and gently reinforce distinctions already seen.
- Saved thinkers/themes are converted into the best comparison entrypoint instead of remaining passive bookmarks.

This keeps Noema aligned with the product identity: calm, comparison-first, intellectually serious, and optional.

## What was intentionally not built

Sprint 9 intentionally did **not** add:

- full spaced repetition / SRS infrastructure
- heavy quiz mode
- streaks, XP, badges, or gamification
- backend/auth/CMS work
- AI chat
- graph view
- timeline-first navigation

## Validation run in Sprint 9

Executed successfully during the session:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

Test coverage was expanded around:

- revisit recommendation helper behavior
- saved/recent-based continuation selection
- saved study-shelf grouping
- compare-page review block rendering
- deterministic next-step logic

## Implementation notes for the next session

- Recommendation and learning-loop logic is intentionally centralized in `src/lib/recommendations.ts`; continue extending that file rather than scattering logic into many components.
- Home / compare / thinker / saved surfaces now all depend on the same deterministic helper layer, so changes to recommendation copy or ordering should be validated across all four surfaces.
- Thinker-page learning suggestions are client-driven because they depend on local recent/saved state.

## Likely Sprint 10 options

Two natural continuations now look strongest:

1. **Editorial operating rules / curation discipline**
   - formalize content-writing and corridor-linking rules
   - define comparison quality thresholds
   - document how theme starter guidance and bridge comparisons should be added

2. **Theme-led re-editing of East Asian + 20th-century bridges**
   - reorganize existing content into cleaner thematic corridors
   - improve cross-pack discoverability without turning the product into a content sprawl

If only one path is chosen next, the editorial-rules route is probably the better immediate complement to Sprint 9, because the app now has stronger revisit behavior and would benefit from clearer curation standards.
