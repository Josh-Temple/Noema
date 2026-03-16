import { comparisons, themes, thinkers } from "@/lib/content";
import { comparisonPath, themePath, thinkerPath } from "@/lib/routes";
import { SearchEntry } from "@/types/content";

const searchAliases: Record<string, string[]> = {
  功利主義: ["bentham", "mill", "kant-bentham", "bentham-mill", "幸福", "正義"],
  経験論: ["locke", "hume", "berkeley", "locke-hume", "knowledge", "知識"],
  合理論: ["descartes", "spinoza", "leibniz", "descartes-locke", "真理"],
  自由: ["freedom", "自由", "sartre", "rousseau", "mill"],
  国家: ["hobbes", "locke", "rousseau", "rawls", "marx", "state-legitimacy", "社会と権力はどう成り立つか"],
  実存: ["sartre", "heidegger", "beauvoir", "nietzsche-sartre"],
  現象学: ["husserl", "heidegger", "husserl-heidegger"],
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

export const getSearchStarterSuggestions = () =>
  getSearchIndex().filter((entry) => ["comparison-stoicism-epicureanism", "comparison-descartes-locke", "theme-freedom", "theme-human-nature"].includes(entry.id));
