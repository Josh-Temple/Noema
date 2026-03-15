# Noema Wave 4 Handoff

## Current mainline decision

The active mainline is the **Next.js App Router implementation at repository root**.

- Active runtime path: `app/` + `src/`
- Active deploy target: repository root (Vercel Next.js)
- Archived only: `legacy/wave2-static/`

This handoff intentionally removes ambiguity between old static Wave 2 files and the active app.

## What was done in this pass

1. Confirmed repo/public mainline is the structured Next.js app, not static Wave 2.
2. Confirmed legacy static files are isolated under `legacy/wave2-static/`.
3. Updated README to explicitly describe:
   - one active implementation path
   - one deployment target
   - route map for direct navigation
4. Added dynamic route smoke tests for:
   - `/compare/[left]/[right]`
   - `/thinkers/[slug]`
   - `/themes/[slug]`
5. Added explicit `vercel.json` so deployment intent is visible in-repo.

## Required direct routes (verified by tests/build)

- `/compare/[left]/[right]`
- `/thinkers/[slug]`
- `/themes/[slug]`

## Operational commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Notes for next session

- Keep `legacy/wave2-static/` as archive-only unless intentionally restored.
- If deployment settings change, keep README + HANDOFF + `vercel.json` aligned.
- Prioritize editorial/content expansion over structural rewrites unless mainline clarity regresses.
