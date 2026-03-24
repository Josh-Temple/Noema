# Noema Wave 4 Handoff

## Current product state

Noema remains a single root-level Next.js App Router application focused on calm, comparison-first philosophy learning. Sprint 10 did not add another large content pack; instead it re-edited the existing 20th-century bridge corridor and East Asian corridor so they are easier to enter through themes, home, search, and recommendation ordering.

## What Sprint 10 changed

### 1. Re-edited four theme gateways

The following themes now act more clearly as entry pages rather than flat labels:

- `人間とは何か`
- `国家はなぜ正当なのか`
- `自由とは何か`
- `社会と権力はどう成り立つか`

Each of these theme pages now has:

- a compact starter pathway block near the top
- 2–4 curated starter comparisons
- compact pathway groups instead of one undifferentiated list
- stronger visibility for both 20th-century bridge routes and East Asian routes

### 2. 20th-century bridge pathways now surfaced more explicitly

The sprint made these routes easier to notice from theme/home/search flows:

- `Husserl vs Heidegger`
- `Heidegger vs Sartre`
- `Sartre vs Beauvoir`
- `Arendt vs Marx`
- `Foucault vs Arendt`
- `Nietzsche vs Sartre` as a freedom-entry bridge into the 20th-century corridor

### 3. East Asian pathways now surfaced more explicitly

The sprint made these routes easier to notice from theme/home/search flows:

- `Confucius vs Laozi`
- `Confucius vs Mencius`
- `Laozi vs Zhuangzi`
- `Mencius vs Xunzi`
- `Confucius vs Mozi`
- `Xunzi vs Han Feizi`
- `Mozi vs Mencius`
- `Han Feizi vs Hobbes`

### 4. Home curation changes

Home keeps recommended comparisons as the primary surface, but now also includes:

- a compact `テーマから入る` section for the four priority themes
- a `20世紀への入口` rail
- a `東洋思想への入口` rail

These additions are intentionally compact and comparison-led, so they support the main recommendation surface instead of replacing it.

### 5. Search changes

Search is still local and deterministic, but now does more pathway work:

- empty search shows `テーマから入る` suggestions for the four priority themes
- related searches can show a compact `この検索から入りやすい比較` highlight rail
- alias coverage was expanded for freedom/state/power/human-nature related entry terms, including East Asian and 20th-century terms
- grouping still stays simple: thinker / comparison / theme

### 6. Thinker / compare pathway tuning

- thinker pages now prioritize gateway themes more aggressively in related themes ordering
- thinker-related comparisons are sorted more strongly toward priority theme corridors
- compare next-step labels now use calmer pathway-aware language such as `このテーマの次の一歩`, `20世紀から見る`, and `東洋思想から見る` when that route is editorially clear

## Validation run in Sprint 10

Executed successfully during the session:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

Test coverage was expanded around:

- priority theme starter ordering
- thinker-theme ordering toward gateway themes
- search theme-entry suggestions
- search pathway highlight behavior
- theme page pathway rendering

## Product/editorial notes for the next session

Important editorial rule preserved in Sprint 10:

- Noema should stay comparison-first.
- Themes should function as launch pads, not mini essays.
- East Asian and 20th-century bridges should be surfaced through supported comparisons, not forced spectacle.

The new pathway metadata is intentionally lightweight. Continue extending it in small editorial steps rather than converting it into a large CMS-like system.

## Likely Sprint 11 options

Two strong next steps now remain:

1. **Theme-by-theme reading-order guidance**
   - add very light `読む順` hints within the four priority themes
   - keep it calm, optional, and comparison-first
   - avoid turning the product into a syllabus dashboard

2. **Saved-based thematic revisit guidance**
   - make `/saved` better at resurfacing a saved theme as a compact pathway
   - cluster revisit suggestions by theme corridors rather than only by item kind
   - reuse the current deterministic local recommendation layer

If only one is chosen, the reading-order guidance route is probably the most natural immediate continuation, because Sprint 10 already clarified where to enter and Sprint 11 can clarify how to continue from there.

---

## Sprint 11 (UI cleanup pass) update

This session implemented a **surface cleanup** on the home screen (not a redesign), preserving Noema's dark premium/comparison-first identity while reducing visual boundary noise.

### What changed

1. **Recommended comparisons kept as primary hero**
   - recommendation cards remain the strongest surface
   - border emphasis was softened slightly for non-primary cards to reduce edge noise

2. **`1分で振り返る` converted to a unified shelf**
   - rebuilt as one parent surface
   - internal items now render as lightweight list rows with subtle dividers
   - removed repeated nested mini-card feel

3. **`テーマから入る` lightened**
   - lowered badge/border strength
   - shortened supporting helper copy
   - preserved clear interactivity and scanability

4. **Theme chips visually weakened**
   - chips now recede via softer fill-first styling and reduced spacing
   - keeps discoverability while reducing dominance

5. **Lower-priority sections softened**
   - pathway rails, daily picks, and discovery card reduced in border/heading weight
   - section headers use slightly smaller, quieter icon treatment

### Validation run in this session

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

All passed in the session environment.

---

## Sprint 12 (home hierarchy simplification pass) update

This session continued the same UI direction and made the home screen feel less card-heavy without redesigning the product.

### What changed

1. **Kept `おすすめ比較` as the primary visual block**
   - recommendation cards remain card-based
   - border strength on non-primary recommendations was softened so the first recommendation still reads as the visual anchor

2. **Further simplified `1分で振り返る`**
   - section now behaves as one light grouped surface
   - saved/recent groups are separated by a subtle divider, not nested framed boxes
   - row dividers are lighter and row spacing is cleaner

3. **Lightened `テーマから入る` into route rows**
   - replaced repeated item-card treatment with grouped tappable rows
   - kept icon-assisted orientation and clear tap affordance
   - supporting line remains but with reduced visual density

4. **Made chips and lower rails more supportive**
   - theme chips now sit in a quiet grouped area and use softer fill-first styling
   - lower editorial rails (`20世紀への入口`, `東洋思想への入口`, daily picks) now use softer grouped rows and lower border emphasis

5. **Adjusted section rhythm**
   - increased spacing between major sections to rely more on vertical rhythm than borders
   - preserved dark premium mood and comparison-first structure

### Validation run in this session

- `npm run lint`
- `npm run typecheck`
