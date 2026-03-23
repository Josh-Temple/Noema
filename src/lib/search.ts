import { comparisons, themes, thinkers } from "@/lib/content";
import { comparisonPath, themePath, thinkerPath } from "@/lib/routes";
import { SearchEntry } from "@/types/content";
import { getComparisonBySlugs, HOME_PATHWAY_RAILS, HOME_THEME_ENTRY_THEMES, PATHWAY_SEARCH_TERMS, PRIORITY_THEME_PATHWAYS, isEastAsianComparison, isTwentiethCenturyComparison } from "@/lib/pathways";

const searchAliases: Record<string, string[]> = {
  功利主義: ["bentham", "mill", "kant-bentham", "bentham-mill", "幸福", "正義"],
  経験論: ["locke", "hume", "berkeley", "locke-hume", "knowledge", "知識"],
  合理論: ["descartes", "spinoza", "leibniz", "descartes-locke", "真理"],
  自由: ["freedom", "自由", "sartre", "rousseau", "mill", "laozi-zhuangzi", "sartre-beauvoir"],
  国家: ["hobbes", "locke", "rousseau", "rawls", "marx", "state-legitimacy", "社会と権力はどう成り立つか", "hanfeizi-hobbes"],
  実存: ["sartre", "heidegger", "beauvoir", "nietzsche-sartre", "heidegger-sartre"],
  現象学: ["husserl", "heidegger", "husserl-heidegger", "heidegger-sartre"],
  儒家: ["confucius", "mencius", "confucius-mencius", "state-legitimacy", "human-nature"],
  道家: ["laozi", "zhuangzi", "confucius-laozi", "laozi-zhuangzi", "自由"],
  東洋思想: ["confucius", "laozi", "mencius", "zhuangzi", "xunzi", "mozi", "hanfeizi", "mencius-xunzi", "happiness", "human-nature"],
  法家: ["hanfeizi", "xunzi-hanfeizi", "hanfeizi-hobbes", "state-legitimacy", "society-power"],
  墨家: ["mozi", "confucius-mozi", "mozi-mencius", "justice", "state-legitimacy"],
  性善説: ["mencius", "mencius-xunzi", "human-nature"],
  性悪説: ["xunzi", "mencius-xunzi", "xunzi-hanfeizi", "human-nature"],
  human: ["human-nature", "人間とは何か", "mencius-xunzi", "heidegger-sartre"],
  freedom: ["freedom", "自由とは何か", "nietzsche-sartre", "laozi-zhuangzi"],
  state: ["state-legitimacy", "国家はなぜ正当なのか", "xunzi-hanfeizi", "hanfeizi-hobbes"],
  power: ["society-power", "社会と権力はどう成り立つか", "foucault-arendt", "arendt-marx"],
};

const normalize = (value: string) => value.toLowerCase().trim();

const expandQuery = (query: string) => {
  const normalized = normalize(query);
  const expanded = new Set<string>([normalized]);
  Object.entries(searchAliases).forEach(([alias, terms]) => {
    if (normalized.includes(alias.toLowerCase())) {
      terms.forEach((term) => expanded.add(normalize(term)));
    }
  });
  return [...expanded].filter(Boolean);
};

export const getSearchIndex = (): SearchEntry[] => {
  const thinkerEntries = thinkers.map((item) => ({
    id: `thinker-${item.slug}`,
    kind: "thinker" as const,
    title: item.nameJa,
    subtitle: item.oneLiner,
    keywords: [item.nameEn, item.coreQuestion, ...item.keyConcepts, ...item.keyWorks, ...item.relatedThemeSlugs],
    href: thinkerPath(item.slug),
  }));

  const comparisonEntries = comparisons.map((item) => {
    const left = thinkers.find((thinker) => thinker.slug === item.leftThinkerSlug);
    const right = thinkers.find((thinker) => thinker.slug === item.rightThinkerSlug);

    return {
      id: `comparison-${item.slug}`,
      kind: "comparison" as const,
      title: item.titleJa,
      subtitle: item.subtitle,
      keywords: [
        item.slug,
        item.whyThisComparisonMatters,
        ...item.whatToWatch,
        ...item.themeSlugs,
        left?.nameJa ?? "",
        left?.nameEn ?? "",
        right?.nameJa ?? "",
        right?.nameEn ?? "",
      ],
      href: comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug),
    };
  });

  const themeEntries = themes.map((item) => ({
    id: `theme-${item.slug}`,
    kind: "theme" as const,
    title: item.titleJa,
    subtitle: item.shortDescription,
    keywords: [item.slug, item.titleEn ?? "", item.starterGuidance, ...item.relatedThinkerSlugs, ...item.relatedComparisonSlugs],
    href: themePath(item.slug),
  }));

  return [...comparisonEntries, ...thinkerEntries, ...themeEntries];
};

const entryText = (entry: SearchEntry) => ({
  title: normalize(entry.title),
  subtitle: normalize(entry.subtitle),
  keywords: entry.keywords.map((keyword) => normalize(keyword)).join(" "),
});

const scoreEntry = (entry: SearchEntry, terms: string[]) => {
  const text = entryText(entry);
  let score = 0;

  terms.forEach((term) => {
    if (!term) return;
    if (text.title.startsWith(term)) score += 14;
    if (text.title.includes(term)) score += 9;
    if (text.subtitle.includes(term)) score += 4;
    if (text.keywords.includes(term)) score += 6;
    if (entry.id.includes(term)) score += 8;
  });

  if (entry.kind === "theme" && PRIORITY_THEME_PATHWAYS.some((item) => `theme-${item.slug}` === entry.id)) score += 2;
  if (entry.kind === "comparison" && (isEastAsianComparison(entry.id.replace("comparison-", "")) || isTwentiethCenturyComparison(entry.id.replace("comparison-", "")))) score += 1;

  return score;
};

export const searchEntries = (query: string) => {
  const normalized = normalize(query);
  if (!normalized) return getSearchIndex();

  const terms = expandQuery(normalized);
  return getSearchIndex()
    .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .map((item) => item.entry);
};

export const getSearchStarterSuggestions = () => [
  ...HOME_THEME_ENTRY_THEMES.map((theme) => ({ id: `theme-${theme.slug}`, kind: "theme" as const, title: theme.titleJa, subtitle: theme.shortDescription, keywords: [], href: themePath(theme.slug) })),
  ...getComparisonBySlugs(HOME_PATHWAY_RAILS.flatMap((rail) => rail.comparisonSlugs).slice(0, 4)).map((comparison) => ({
    id: `comparison-${comparison.slug}`,
    kind: "comparison" as const,
    title: comparison.titleJa,
    subtitle: comparison.subtitle,
    keywords: [],
    href: comparisonPath(comparison.leftThinkerSlug, comparison.rightThinkerSlug),
  })),
];

export const getSearchThemeEntrySuggestions = () =>
  PRIORITY_THEME_PATHWAYS.map((pathway) => ({
    slug: pathway.slug,
    title: themes.find((theme) => theme.slug === pathway.slug)?.titleJa ?? pathway.slug,
    description: pathway.starterDescription,
    href: themePath(pathway.slug),
  }));

export const getSearchPathwayHighlights = (query: string) => {
  const normalized = normalize(query);
  const matchedKeys = Object.entries(PATHWAY_SEARCH_TERMS)
    .filter(([, terms]) => terms.some((term) => normalized.includes(normalize(term))))
    .map(([key]) => key);

  if (matchedKeys.length === 0) return [];

  const slugs = new Set<string>();
  if (matchedKeys.includes("human")) ["mencius-xunzi", "heidegger-sartre", "confucius-laozi"].forEach((slug) => slugs.add(slug));
  if (matchedKeys.includes("freedom")) ["nietzsche-sartre", "sartre-beauvoir", "laozi-zhuangzi"].forEach((slug) => slugs.add(slug));
  if (matchedKeys.includes("state")) ["xunzi-hanfeizi", "hanfeizi-hobbes", "hobbes-locke"].forEach((slug) => slugs.add(slug));
  if (matchedKeys.includes("power")) ["foucault-arendt", "arendt-marx", "xunzi-hanfeizi"].forEach((slug) => slugs.add(slug));
  if (matchedKeys.includes("east")) ["confucius-laozi", "mencius-xunzi", "confucius-mozi"].forEach((slug) => slugs.add(slug));
  if (matchedKeys.includes("twentieth")) ["husserl-heidegger", "heidegger-sartre", "foucault-arendt"].forEach((slug) => slugs.add(slug));

  return getComparisonBySlugs([...slugs]).map((comparison) => ({
    slug: comparison.slug,
    title: comparison.titleJa,
    subtitle: comparison.subtitle,
    href: comparisonPath(comparison.leftThinkerSlug, comparison.rightThinkerSlug),
  }));
};
