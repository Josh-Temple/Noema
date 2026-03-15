# Noema

Wave 2 refinement of a comparison-first philosophy / history-of-thought MVP.

## Product focus

- Primary: **comparison** (思想家・立場の差を短く把握)
- Secondary: curated discovery, thinker hubs, and theme entry points
- Out of scope: backend, auth, CMS, sync, and AI chat mode

## Stack in this repository

This repository currently delivers a static front-end prototype:

- `index.html`: page structure and content
- `styles.css`: dark navy visual system and component styling
- `script.js`: local deterministic daily picks, grouped search results, and local saved state

## Wave 2 highlights

- Home hierarchy revised to make `おすすめ比較` the strongest block.
- Compare page strengthened with common ground, clearer left/right distinction, and stronger next-step cards.
- Thinker page refined into a navigation hub with concise summary and outbound links.
- Theme page now pushes users into comparison earlier.
- Bottom nav unified across screens: `ホーム / 検索 / 比較 / 保存済み`.
- Search results grouped by type and connected to local save actions.

## Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.
