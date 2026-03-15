import { comparisons, themes, thinkers } from "@/lib/content";
import { comparisonPath, themePath, thinkerPath } from "@/lib/routes";
import { SearchEntry } from "@/types/content";

export const getSearchIndex = (): SearchEntry[] => {
  const thinkerEntries = thinkers.map((item) => ({
    id: `thinker-${item.slug}`,
    kind: "thinker" as const,
    title: item.nameJa,
    subtitle: item.oneLiner,
    keywords: [item.nameEn, item.coreQuestion, ...item.keyConcepts],
    href: thinkerPath(item.slug),
  }));

  const comparisonEntries = comparisons.map((item) => ({
    id: `comparison-${item.slug}`,
    kind: "comparison" as const,
    title: item.titleJa,
    subtitle: item.subtitle,
    keywords: [item.whyThisComparisonMatters, ...item.whatToWatch],
    href: comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug),
  }));

  const themeEntries = themes.map((item) => ({
    id: `theme-${item.slug}`,
    kind: "theme" as const,
    title: item.titleJa,
    subtitle: item.shortDescription,
    keywords: [item.titleEn ?? "", item.starterGuidance],
    href: themePath(item.slug),
  }));

  return [...comparisonEntries, ...thinkerEntries, ...themeEntries];
};

export const searchEntries = (query: string) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return getSearchIndex();
  return getSearchIndex().filter((entry) =>
    [entry.title, entry.subtitle, ...entry.keywords].join(" ").toLowerCase().includes(normalized),
  );
};
