# Noema (Wave 3)

Noema is a **comparison-first philosophy learning app** designed to help users quickly grasp differences between thinkers and positions, then branch into themes and thinker pages.

Wave 3 keeps the existing product direction and visual identity while migrating to a maintainable, Vercel-friendly architecture.

## Project purpose

- Preserve the current dark premium mobile-first experience.
- Keep comparison as the primary entry mode.
- Improve maintainability through typed local content and reusable components.
- Remain fully local-data driven (no backend, no auth, no CMS).

## Architecture overview

- **Framework**: Next.js App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS design tokens
- **Data**: local typed content modules in `src/content`
- **State/storage**: localStorage wrappers and hooks in `src/lib/storage.ts` + `src/hooks`

### Key directories

```text
app/
  layout.tsx
  page.tsx
  compare/[left]/[right]/page.tsx
  thinkers/[slug]/page.tsx
  themes/[slug]/page.tsx
  search/page.tsx
  saved/page.tsx
  not-found.tsx

src/
  components/
    layout/
    common/
    home/
    compare/
    thinker/
    theme/
    search/
    saved/
  content/
    thinkers.ts
    comparisons.ts
    themes.ts
  lib/
    content.ts
    search.ts
    recommendations.ts
    storage.ts
    routes.ts
  hooks/
    useSavedItems.ts
    useRecentItems.ts
  types/
    content.ts
```

## Route structure

- `/` Home (recommended comparisons, themes, daily picks)
- `/compare/[left]/[right]` Comparison detail
- `/thinkers/[slug]` Thinker detail/hub
- `/themes/[slug]` Theme detail/entry point
- `/search` Grouped local search
- `/saved` Saved items from local storage

## Data/content structure

All major content is typed and centralized:

- `src/types/content.ts`: `Thinker`, `Comparison`, `Theme` models
- `src/content/thinkers.ts`: seeded thinker data (12 core thinkers)
- `src/content/comparisons.ts`: flagship comparisons
- `src/content/themes.ts`: key themes

Derivation/query helpers live in `src/lib/content.ts` and include:

- `getThinkerBySlug`
- `getComparisonByThinkerPair`
- `getComparisonsForThinker`
- `getThemesForThinker`
- `getThemeBySlug`
- `getComparisonsForTheme`
- `getThinkersForTheme`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For production build check:

```bash
npm run build
npm run start
```

## Vercel deployment notes

- This project is App Router-compatible and deploys directly to Vercel.
- No environment variables are required for core functionality.
- Build command: `npm run build`
- Output: Next.js default

## How to add a new thinker

1. Open `src/content/thinkers.ts`.
2. Add a new object matching `Thinker` in `src/types/content.ts`.
3. Add valid related slugs (`relatedThemeSlugs`, `relatedComparisonSlugs`, etc.).
4. Confirm the slug resolves at `/thinkers/[slug]`.
5. Optionally connect from theme/comparison records.

## How to add a new comparison

1. Open `src/content/comparisons.ts`.
2. Add a `Comparison` object with:
   - `leftThinkerSlug` and `rightThinkerSlug`
   - `sections`, `whatToWatch`, next-step slugs
3. Verify route behavior at `/compare/[left]/[right]`.
4. Optionally reference it from thinker/theme relations.

## How to add a new theme

1. Open `src/content/themes.ts`.
2. Add a `Theme` object with related thinkers/comparisons.
3. Verify `/themes/[slug]` renders expected lists.
4. Ensure discoverability from home chips/search.

## Legacy static prototype

Wave 2 static files (`index.html`, `styles.css`, `script.js`) are intentionally retained in this repository during migration for parity/reference.
