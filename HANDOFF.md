# Handoff Notes

## Wave 2 changes completed

1. Shifted product center to **comparison-first**.
   - Home now emphasizes recommended comparison cards with "why it matters" lines.
   - Compare page has stronger section structure and larger narrative weight.

2. Unified navigation.
   - Bottom navigation is now consistent across app states: `ホーム / 検索 / 比較 / 保存済み`.

3. Revised page roles.
   - Thinker page is now hub-like with compact intro and stronger outbound navigation.
   - Theme page now surfaces related comparisons before related thinkers.
   - Search page groups results by type (comparisons, thinkers, themes).

4. Added lightweight deterministic/local behavior.
   - Daily picks (`今日の思想家 / 今日の比較 / 今日の問い`) are date-based and deterministic.
   - Saved items use localStorage only.

## Intentionally deferred

- Backend and API integration
- Authentication and user profiles
- Timeline/network visualizations
- AI chat-style interactive mode
- Sync across devices

## Suggested Wave 3 priorities

1. Convert static prototype into the intended Next.js App Router + TypeScript + Tailwind implementation while preserving this hierarchy.
2. Componentize UI primitives and core modules:
   - `ComparisonHero`, `ComparisonSection`, `CommonGroundCard`, `NextStepCard`, `ThemeChip`, `BottomNav`
3. Add a small seeded data module and stronger route/state model.
4. Expand compare coverage (more pairs) while keeping concise, scannable copy.
5. Improve accessibility:
   - focus states, semantic landmarks, color contrast verification, and keyboard flow.
