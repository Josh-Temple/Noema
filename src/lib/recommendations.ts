import { comparisons, thinkers, themes } from "@/lib/content";
import { StoredItem } from "@/lib/storage";

const daySeed = () => {
  const now = new Date();
  return Number(`${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`);
};

const pick = <T,>(items: T[], offset = 0): T => {
  const index = (daySeed() + offset) % items.length;
  return items[index];
};

const featuredComparisonSlugs = [
  "stoicism-epicureanism",
  "aristotle-stoicism",
  "epictetus-epicurus",
  "kant-bentham",
  "hobbes-locke",
  "rawls-marx",
];

export const getFeaturedComparisons = () => {
  const featured = featuredComparisonSlugs
    .map((slug) => comparisons.find((comparison) => comparison.slug === slug))
    .filter((comparison): comparison is NonNullable<typeof comparison> => Boolean(comparison));

  return featured.length > 0 ? featured : comparisons.slice(0, 4);
};

export const getTodayPick = () => ({
  thinker: pick(thinkers, 0),
  comparison: pick(comparisons, 3),
  theme: pick(themes, 5),
});

export const getRecentRecommendations = (recent: StoredItem[]) => {
  const recentComparisonSlugs = new Set(recent.filter((item) => item.kind === "comparison").map((item) => item.slug));
  const fallback = getFeaturedComparisons().slice(0, 3);
  const matched = comparisons.filter((item) => recentComparisonSlugs.has(item.slug));
  return [...matched, ...fallback].slice(0, 3);
};
