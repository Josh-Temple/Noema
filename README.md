# Noema (Wave 4)

Noema is a **comparison-first philosophy learning app** built with Next.js App Router.

## Single active implementation and deploy target

This repository has one active product path:

- ✅ **Active app (and deployment target):** root Next.js app (`app/` + `src/`)
- 📦 **Archived prototype:** `legacy/wave2-static/` (reference only, not deployed)

There are no competing root-level static entrypoints. Vercel should deploy the repository root as a Next.js project.

## Route map (active app)

- `/` home
- `/compare/[left]/[right]` comparison detail
- `/thinkers/[slug]` thinker page
- `/themes/[slug]` theme page
- `/search` grouped local search
- `/saved` saved items

## Tech stack

- Next.js 14 App Router + TypeScript + Tailwind CSS
- Local typed content modules in `src/content`
- Shared storage helpers in `src/lib/storage.ts` + hooks in `src/hooks`

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
