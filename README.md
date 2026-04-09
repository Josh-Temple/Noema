# Noema (Wave 4)

Noema is a **comparison-first philosophy learning app** built with Next.js App Router.

## Current public navigation (aligned with production)

The app is organized around comparison-led reading paths and direct entrypoints:

- `/` home (search, recommended comparisons, theme-entry rails, daily picks)
- `/compare/[left]/[right]` comparison detail
- `/thinkers/[slug]` thinker detail
- `/themes/[slug]` theme detail
- `/search` grouped local search (thinkers / comparisons / themes)
- `/saved` saved items / study shelf with next-step suggestions

## Single active implementation and deploy target

This repository has one active product path:

- ✅ **Active app (and deployment target):** root Next.js app (`app/` + `src/`)
- 📦 **Archived prototype:** `legacy/wave2-static/` (reference only, not deployed)

There are no competing root-level static entrypoints. Vercel should deploy the repository root as a Next.js project.

## Tech stack

- Next.js 14 App Router + TypeScript + Tailwind CSS
- Local typed content modules in `src/content`
- Shared storage helpers in `src/lib/storage.ts` + hooks in `src/hooks`
- UI clarity layer (Sprint 8): lightweight inline SVG icon system for nav/search/saved/recommendation scanability
- Lightweight learning-loop layer (Sprint 9): saved/recent revisit surfaces, compare-page review cards, and study-shelf style saved grouping
- Home hierarchy cleanup layer (Sprint 12): further reduced nested-card weight by converting secondary home sections to grouped row lists with subtle dividers, while keeping recommended comparisons as the strongest visual surface
- Cross-screen minimal surface pass (Sprint 13): reduced card usage beyond home by shifting comparison/theme/search/saved surfaces toward divider-led grouped rows and lighter panel treatments, while preserving card emphasis only where hierarchy clarity benefits from it
- Learning continuity pass (Sprint 14): added compact reading-order guidance for priority theme pages and a new top-level resume-learning layer on `/saved`, both powered by deterministic local pathway/recommendation metadata

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Build and deployment

- Deploy root Next.js app on Vercel.
- Build command: `npm run build`
- Start command: `npm run start`
- Required environment variables: none

## PWA support

- The app now ships with a Web App Manifest (`app/manifest.ts`), a text-based SVG app icon in `public/icon.svg`, and a client-registered service worker (`public/sw.js`).
- The service worker caches the app shell and same-origin GET requests to provide installability plus basic offline revisit support for previously visited pages.
- PWA metadata is configured in `app/layout.tsx` for installability without committing binary assets to the repository.



## Lightweight learning loop (Sprint 9)

- Home now includes a compact revisit section built from saved items and recent reading context.
- Comparison pages now include a short optional review block (`理解確認`) plus calmer educational next-step labels.
- Thinker pages can surface a compact “この人物から学ぶなら” path based on local recent/saved state.
- Saved items are grouped as a local-only study shelf (comparisons / thinkers / themes), each with a deterministic next study step when available.
- This is intentionally **not** a full quiz system, SRS dashboard, or gamified layer.

## Current content focus

- Modern Epistemology Pack (近代認識論パック):
  - Added corridor links around Descartes → Locke → Hume → Kant
  - Added Spinoza / Leibniz / Berkeley comparisons to strengthen branching around knowledge and truth
- Ethics and Politics Pack (倫理・政治パック):
  - Added norm/political corridor links around Kant → Bentham → Mill and Hobbes → Locke → Rousseau
  - Added Rawls / Marx entry comparisons to strengthen justice and state-legitimacy pathways
- Ancient Ethics Pack (古代倫理パック):
  - Added ancient ethics corridor links around Plato / Aristotle / Stoicism / Epicureanism
  - Added practical pathways for “善く生きるとは何か” and “自由とは何か” through Stoic and Epicurean comparisons
- 20th-Century Bridge Pack (20世紀橋渡しパック):
  - Added Husserl / Heidegger / Beauvoir / Arendt and bridge comparisons from Nietzsche / Sartre / Marx / Foucault routes
  - Strengthened curation and discovery so phenomenology / existentialism / political-thought pathways are visible from home, themes, and recommendations
- Search & Recommendation Upgrade (検索・推薦の賢化):
  - Upgraded local search relevance with alias support and better matching across thinker/theme/comparison metadata
  - Made recommendations more context-aware using local recent/saved signals while keeping deterministic local-only behavior
- Theme Pathway Refresh (テーマ入口の再編集):
  - Re-edited the four main entry themes — human nature, state legitimacy, freedom, and society/power — into stronger comparison-first gateways
  - Made 20th-century bridge comparisons and East Asian corridors more visible on theme pages, home, and search without changing the product structure
- East Asian Starter Pack (東洋思想スターターパック):
  - Strengthened East Asian corridor around Confucius / Laozi and added Mencius / Zhuangzi with relation-rich pathways
  - Added focused comparisons for East Asian entry and one bridge comparison (Confucius vs Aristotle) into the existing network
  - Integrated entrypoints into happiness / state legitimacy / human nature themes and recommendation/search visibility
- East Asian Thought Pack II (東洋思想パック第二弾):
  - Added Xunzi / Mozi / Han Feizi to deepen contrasts around human nature, order, and statecraft
  - Added second-layer comparison corridor (Mencius vs Xunzi, Confucius vs Mozi, Xunzi vs Han Feizi, Mozi vs Mencius)
  - Added one careful bridge comparison (Han Feizi vs Hobbes) to connect East Asian statecraft debates into existing politics pathways

## Content model

- `src/types/content.ts`: `Thinker`, `Comparison`, `Theme`, `SearchEntry`
- `src/content/thinkers.ts`: thinker seeds
- `src/content/comparisons.ts`: comparison seeds
- `src/content/themes.ts`: theme seeds
- `src/lib/content.ts`: lookup/derivation helpers
- `src/lib/contentValidation.ts`: relation integrity validation

## Legacy reference

Wave 2 static prototype files are archived for historical parity/reference only:

- `legacy/wave2-static/index.html`
- `legacy/wave2-static/styles.css`
- `legacy/wave2-static/script.js`
