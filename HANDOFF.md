# Noema Wave 4 Handoff

## Session objective

Implemented Sprint 3 content expansion: **Ancient Ethics Pack / 古代倫理パック**.

This sprint stayed tightly scoped to content + linking (no UI redesign, no platform features).

## What Sprint 3 added

### New thinkers

- Epicurus (`epicurus`)
- Zeno of Citium (`zeno`)
- Epictetus (`epictetus`)
- Marcus Aurelius (`marcus-aurelius`)

### New comparisons

- `stoicism-epicureanism` (ストア派 vs エピクロス派)
- `aristotle-stoicism` (アリストテレス vs ストア派)
- `plato-epicurus` (プラトン vs エピクロス)
- `epictetus-epicurus` (エピクテトス vs エピクロス)
- `marcus-epictetus` (マルクス・アウレリウス vs エピクテトス)

## Pathway and relation integration

- Updated ancient core links so users can move naturally from:
  - Plato → Aristotle → Stoicism / Epicureanism
- Updated existing thinker relations (especially Plato/Aristotle and newly added Stoic/Epicurean entries) so new content is not isolated.
- Added practical stepping links across all new comparison pages (`nextThinkerSlugs`, `nextComparisonSlugs`, `nextThemeSlugs`).

## Theme integration

- Strengthened `happiness` and `freedom` pathways with multiple ancient ethics comparisons.
- Added lightweight secondary theme: `human-nature` (人間とは何か).
- Updated starter guidance to improve beginner entry paths.

## Home/discovery integration

- Updated featured comparison curation to surface ancient ethics comparisons on home.
- Recent recommendation fallback now includes ancient ethics entries so Sprint 3 content does not get buried.

## Validation and tests

Updated tests for:
- new thinker lookup (`epicurus`, `marcus-aurelius`)
- new comparison lookup (`stoicism-epicureanism`, `epictetus-epicurus`, `marcus-epictetus`)
- theme relation resolution (`human-nature`, `happiness` routes)
- home recommendation visibility for ancient ethics

Checks run and passing:
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

## Suggested Sprint 4

Likely next: **20th Century Bridge Pack / 20世紀橋渡しパック**.

Candidate focus:
- Heidegger
- Husserl
- Beauvoir
- Arendt

Goal:
- thicken the bridge toward modern/existential/political 20th-century comparisons,
- connect naturally from existing Sartre/Nietzsche and political pathways,
- preserve Noema’s concise comparison-first reading flow.
