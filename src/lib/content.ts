import { comparisons } from "@/content/comparisons";
import { themes } from "@/content/themes";
import { thinkers } from "@/content/thinkers";

export const getThinkerBySlug = (slug: string) => thinkers.find((item) => item.slug === slug);
export const getThemeBySlug = (slug: string) => themes.find((item) => item.slug === slug);

export const getComparisonByThinkerPair = (left: string, right: string) =>
  comparisons.find(
    (item) =>
      (item.leftThinkerSlug === left && item.rightThinkerSlug === right) ||
      (item.leftThinkerSlug === right && item.rightThinkerSlug === left),
  );

export const getComparisonBySlug = (slug: string) => comparisons.find((item) => item.slug === slug);

export const getComparisonsForThinker = (slug: string) =>
  comparisons.filter((item) => item.leftThinkerSlug === slug || item.rightThinkerSlug === slug);

export const getThemesForThinker = (slug: string) =>
  themes.filter((theme) => theme.relatedThinkerSlugs.includes(slug));

export const getRelatedThinkers = (slug: string) => {
  const thinker = getThinkerBySlug(slug);
  if (!thinker) return [];
  return thinker.relatedThinkerSlugs
    .map((key) => getThinkerBySlug(key))
    .filter((value): value is NonNullable<typeof value> => Boolean(value));
};

export const getComparisonsForTheme = (slug: string) =>
  comparisons.filter((item) => item.themeSlugs.includes(slug));

export const getThinkersForTheme = (slug: string) =>
  thinkers.filter((item) => item.relatedThemeSlugs.includes(slug));

export { comparisons, themes, thinkers };
