import { comparisons, getComparisonBySlug, getThemeBySlug, getThinkerBySlug, thinkers, themes } from "@/lib/content";
import { comparisonPath, themePath, thinkerPath } from "@/lib/routes";
import { StoredItem } from "@/lib/storage";

const daySeed = () => {
  const now = new Date();
  return Number(`${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`);
};

const pick = <T,>(items: T[], offset = 0): T => {
  const index = (daySeed() + offset) % items.length;
  return items[index];
};

const editorialPinnedComparisonSlugs = [
  "husserl-heidegger",
  "sartre-beauvoir",
  "arendt-marx",
  "heidegger-sartre",
  "foucault-arendt",
  "rawls-marx",
  "stoicism-epicureanism",
];

const getEditorialPinnedComparisons = () => {
  const featured = editorialPinnedComparisonSlugs
    .map((slug) => comparisons.find((comparison) => comparison.slug === slug))
    .filter((comparison): comparison is NonNullable<typeof comparison> => Boolean(comparison));

  return featured.length > 0 ? featured : comparisons.slice(0, 4);
};

const collectContextSignals = (items: StoredItem[]) => {
  const comparisonSlugs = new Set<string>();
  const thinkerSlugs = new Set<string>();
  const themeSlugs = new Set<string>();

  for (const item of items) {
    if (item.kind === "comparison") {
      comparisonSlugs.add(item.slug);
      const comparison = getComparisonBySlug(item.slug);
      if (comparison) {
        thinkerSlugs.add(comparison.leftThinkerSlug);
        thinkerSlugs.add(comparison.rightThinkerSlug);
        comparison.themeSlugs.forEach((slug) => themeSlugs.add(slug));
      }
      continue;
    }

    if (item.kind === "thinker") {
      thinkerSlugs.add(item.slug);
      const thinker = getThinkerBySlug(item.slug);
      thinker?.relatedThemeSlugs.forEach((slug) => themeSlugs.add(slug));
      continue;
    }

    if (item.kind === "theme") {
      themeSlugs.add(item.slug);
    }
  }

  return { comparisonSlugs, thinkerSlugs, themeSlugs };
};

const scoreComparison = (
  slug: string,
  contextSignals: ReturnType<typeof collectContextSignals>,
  pinnedBoost = 0,
) => {
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return -1;

  let score = pinnedBoost;

  if (contextSignals.comparisonSlugs.has(slug)) score += 7;
  if (contextSignals.thinkerSlugs.has(comparison.leftThinkerSlug)) score += 4;
  if (contextSignals.thinkerSlugs.has(comparison.rightThinkerSlug)) score += 4;
  score += comparison.themeSlugs.filter((themeSlug) => contextSignals.themeSlugs.has(themeSlug)).length * 3;

  return score;
};

const uniqBySlug = <T extends { slug: string }>(items: T[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
};

export const getFeaturedComparisons = ({ recent = [], saved = [], limit = 4 }: { recent?: StoredItem[]; saved?: StoredItem[]; limit?: number } = {}) => {
  const pinned = getEditorialPinnedComparisons();
  const contextSignals = collectContextSignals([...recent, ...saved]);
  const scored = comparisons
    .map((item) => ({
      item,
      score:
        scoreComparison(item.slug, contextSignals, pinned.some((p) => p.slug === item.slug) ? 2 : 0) +
        ((daySeed() + item.slug.length) % 3),
    }))
    .sort((a, b) => b.score - a.score || a.item.slug.localeCompare(b.item.slug))
    .map((entry) => entry.item);

  return uniqBySlug([...scored, ...pinned]).slice(0, limit);
};

export const getTodayPick = ({ recent = [], saved = [] }: { recent?: StoredItem[]; saved?: StoredItem[] } = {}) => {
  const blended = getFeaturedComparisons({ recent, saved, limit: 6 });
  return {
    thinker: pick(thinkers, 0),
    comparison: blended[(daySeed() + 2) % blended.length] ?? pick(comparisons, 3),
    theme: pick(themes, 5),
  };
};

export const getRecentRecommendations = (recent: StoredItem[], saved: StoredItem[] = []) =>
  getFeaturedComparisons({ recent, saved, limit: 3 });

export const getThinkerRecommendations = (thinkerSlug: string, limit = 6) => {
  const thinker = getThinkerBySlug(thinkerSlug);
  if (!thinker) return [];

  const preferred = thinker.relatedComparisonSlugs.map((slug) => getComparisonBySlug(slug)).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const fallback = comparisons
    .filter((item) => item.leftThinkerSlug === thinkerSlug || item.rightThinkerSlug === thinkerSlug)
    .sort((a, b) => {
      const aShared = a.themeSlugs.filter((slug) => thinker.relatedThemeSlugs.includes(slug)).length;
      const bShared = b.themeSlugs.filter((slug) => thinker.relatedThemeSlugs.includes(slug)).length;
      return bShared - aShared;
    });

  return uniqBySlug([...preferred, ...fallback]).slice(0, limit);
};

export const getNextThinkerRecommendations = (thinkerSlug: string, limit = 6) => {
  const thinker = getThinkerBySlug(thinkerSlug);
  if (!thinker) return [];

  const preferred = thinker.relatedThinkerSlugs
    .map((slug) => getThinkerBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const fallback = thinkers
    .filter((candidate) => candidate.slug !== thinkerSlug)
    .map((candidate) => ({
      candidate,
      score:
        candidate.relatedThemeSlugs.filter((slug) => thinker.relatedThemeSlugs.includes(slug)).length * 2 +
        candidate.relatedComparisonSlugs.filter((slug) => thinker.relatedComparisonSlugs.includes(slug)).length,
    }))
    .sort((a, b) => b.score - a.score || a.candidate.slug.localeCompare(b.candidate.slug))
    .map((entry) => entry.candidate);

  return uniqBySlug([...preferred, ...fallback]).slice(0, limit);
};

export const getOrderedThemeComparisons = (themeSlug: string) => {
  const theme = getThemeBySlug(themeSlug);
  if (!theme) return [];

  const pinned = theme.relatedComparisonSlugs.map((slug) => getComparisonBySlug(slug)).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const fallback = comparisons
    .filter((comparison) => comparison.themeSlugs.includes(themeSlug))
    .sort((a, b) => {
      const aStarter = Number(a.nextThemeSlugs.includes(themeSlug));
      const bStarter = Number(b.nextThemeSlugs.includes(themeSlug));
      return bStarter - aStarter;
    });

  return uniqBySlug([...pinned, ...fallback]);
};

export type NextStepSuggestion = {
  title: string;
  href: string;
  reason: string;
};

export const getCompareNextStepSuggestions = (comparisonSlug: string, limit = 8): NextStepSuggestion[] => {
  const comparison = getComparisonBySlug(comparisonSlug);
  if (!comparison) return [];

  const suggestions: NextStepSuggestion[] = [];

  comparison.nextComparisonSlugs.forEach((slug, index) => {
    const next = getComparisonBySlug(slug);
    if (!next) return;
    suggestions.push({
      title: `比較: ${next.titleJa}`,
      href: comparisonPath(next.leftThinkerSlug, next.rightThinkerSlug),
      reason: index === 0 ? "次に見ると流れがつかみやすい" : "同じテーマの別ルート",
    });
  });

  comparison.nextThinkerSlugs.forEach((slug, index) => {
    const thinker = getThinkerBySlug(slug);
    if (!thinker) return;
    suggestions.push({
      title: `思想家: ${thinker.nameJa}`,
      href: thinkerPath(slug),
      reason: index === 0 ? "立場の背景を押さえる" : "反対側の立場から見る",
    });
  });

  comparison.nextThemeSlugs.forEach((slug) => {
    const theme = getThemeBySlug(slug);
    if (!theme) return;
    suggestions.push({
      title: `テーマ: ${theme.titleJa}`,
      href: themePath(slug),
      reason: "テーマ全体で比較を深める",
    });
  });

  return suggestions.filter((item, index, self) => self.findIndex((candidate) => candidate.href === item.href) === index).slice(0, limit);
};
