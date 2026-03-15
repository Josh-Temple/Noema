import { comparisons, thinkers, themes } from "@/lib/content";

const daySeed = () => {
  const now = new Date();
  return Number(`${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`);
};

const pick = <T,>(items: T[], offset = 0): T => {
  const index = (daySeed() + offset) % items.length;
  return items[index];
};

export const getTodayPick = () => ({
  thinker: pick(thinkers, 0),
  comparison: pick(comparisons, 3),
  theme: pick(themes, 5),
});

export const getRecentRecommendations = (recent: string[]) => {
  const fallback = comparisons.slice(0, 3);
  const matched = comparisons.filter((item) => recent.includes(item.slug));
  return [...matched, ...fallback].slice(0, 3);
};
