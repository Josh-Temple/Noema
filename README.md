# Noema (Wave 4)

Noema is a **comparison-first philosophy learning app** built with Next.js App Router.
Wave 4 consolidates the repository to a single active implementation path and adds baseline quality gates.

## Active architecture (single mainline)

- **Active product**: Next.js app in `app/` + `src/`
- **Legacy prototype**: archived under `legacy/wave2-static/`
- **Framework**: Next.js 14 App Router + TypeScript + Tailwind CSS
- **Data model**: local typed content modules in `src/content`
- **Local state**: centralized storage helpers in `src/lib/storage.ts` and hooks in `src/hooks`

## Route map

- `/` home
- `/compare/[left]/[right]` comparison detail
- `/thinkers/[slug]` thinker page
- `/themes/[slug]` theme page
- `/search` grouped local search
- `/saved` saved items

## Content model

- `src/types/content.ts`: `Thinker`, `Comparison`, `Theme`, `SearchEntry`
- `src/content/thinkers.ts`: thinker seeds
- `src/content/comparisons.ts`: comparison seeds
- `src/content/themes.ts`: theme seeds
- `src/lib/content.ts`: lookup/derivation helpers
- `src/lib/contentValidation.ts`: relation integrity validation

## Development workflow

```bash
npm install
npm run dev
```

## Quality gates

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Validation workflow

- Content relation validation lives in `src/lib/contentValidation.ts`.
- Tests fail when thinker/theme/comparison references are broken.

## Build and deploy flow

- Deployment target is the root Next.js app (Vercel default for this repository).
- Build command: `npm run build`
- Start command: `npm run start`
- No required environment variables.

## How to add content safely

### Add a thinker
1. Add thinker object in `src/content/thinkers.ts`.
2. Add valid relation slugs (`relatedThemeSlugs`, `relatedComparisonSlugs`, etc.).
3. Run `npm run test` to verify relation integrity.

### Add a comparison
1. Add comparison object in `src/content/comparisons.ts`.
2. Ensure left/right thinker slugs and next-step references exist.
3. Run `npm run test`.

### Add a theme
1. Add theme object in `src/content/themes.ts`.
2. Ensure related thinker/comparison slugs exist.
3. Run `npm run test`.

## Legacy reference

Wave 2 static prototype files are archived for parity/reference in:

- `legacy/wave2-static/index.html`
- `legacy/wave2-static/styles.css`
- `legacy/wave2-static/script.js`
