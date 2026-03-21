import { Comparison, Theme, Thinker } from "@/types/content";
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
  "mencius-xunzi",
  "hanfeizi-hobbes",
  "sartre-beauvoir",
  "arendt-marx",
  "heidegger-sartre",
  "foucault-arendt",
  "rawls-marx",
  "stoicism-epicureanism",
  "confucius-laozi",
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

const asComparison = (slug: string) => getComparisonBySlug(slug);
const asThinker = (slug: string) => getThinkerBySlug(slug);
const asTheme = (slug: string) => getThemeBySlug(slug);

const buildComparisonSuggestion = (comparison: Comparison, reason: string, label = "比較") => ({
  slug: comparison.slug,
  title: `${label}: ${comparison.titleJa}`,
  href: comparisonPath(comparison.leftThinkerSlug, comparison.rightThinkerSlug),
  reason,
});

const buildThinkerSuggestion = (thinker: Thinker, reason: string, label = "思想家") => ({
  slug: thinker.slug,
  title: `${label}: ${thinker.nameJa}`,
  href: thinkerPath(thinker.slug),
  reason,
});

const buildThemeSuggestion = (theme: Theme, reason: string, label = "テーマ") => ({
  slug: theme.slug,
  title: `${label}: ${theme.titleJa}`,
  href: themePath(theme.slug),
  reason,
});

const dedupeSuggestions = <T extends { href: string }>(items: T[]) =>
  items.filter((item, index, self) => self.findIndex((candidate) => candidate.href === item.href) === index);

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

  return uniqBySlug([...pinned, ...scored]).slice(0, limit);
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
  slug: string;
  title: string;
  href: string;
  reason: string;
};

export type ComparisonReview = {
  title: string;
  summary: string;
  reviewPoints: string[];
  prompts: string[];
  nextStep?: NextStepSuggestion;
};

export type SavedStudyGroup = {
  title: string;
  description: string;
  emptyMessage: string;
  items: Array<{
    slug: string;
    title: string;
    href: string;
    kindLabel: string;
    note?: string;
    nextStep?: NextStepSuggestion;
  }>;
};

export const getCompareNextStepSuggestions = (comparisonSlug: string, limit = 8): NextStepSuggestion[] => {
  const comparison = getComparisonBySlug(comparisonSlug);
  if (!comparison) return [];

  const suggestions: NextStepSuggestion[] = [];

  comparison.nextComparisonSlugs.forEach((slug, index) => {
    const next = getComparisonBySlug(slug);
    if (!next) return;
    suggestions.push(buildComparisonSuggestion(next, index === 0 ? "流れをつかむ次の一歩" : "同じテーマの別ルート"));
  });

  comparison.nextThinkerSlugs.forEach((slug, index) => {
    const thinker = getThinkerBySlug(slug);
    if (!thinker) return;
    suggestions.push(buildThinkerSuggestion(thinker, index === 0 ? "先に見ると分かりやすい" : "背景を押さえて戻る"));
  });

  comparison.nextThemeSlugs.forEach((slug) => {
    const theme = getThemeBySlug(slug);
    if (!theme) return;
    suggestions.push(buildThemeSuggestion(theme, "対立を深める比較の入口"));
  });

  return dedupeSuggestions(suggestions).slice(0, limit);
};

export const getComparisonReview = (comparisonSlug: string): ComparisonReview | null => {
  const comparison = getComparisonBySlug(comparisonSlug);
  if (!comparison) return null;

  const reviewPoints = [comparison.summaryDifference, comparison.commonGround, ...comparison.sections.map((section) => section.takeaway)].slice(0, 3);
  const prompts = [
    `${comparison.whatToWatch[0] ?? "出発点"}が違うと、結論はどう変わるか。`,
    `${comparison.leftThinkerSlug === comparison.rightThinkerSlug ? "立場" : "左右の立場"}の差を一文で言い直せるか。`,
  ];

  return {
    title: `${comparison.titleJa}の振り返り`,
    summary: comparison.whyThisComparisonMatters,
    reviewPoints,
    prompts,
    nextStep: getCompareNextStepSuggestions(comparisonSlug, 1)[0],
  };
};

export const getRecentContinuationSuggestions = (recent: StoredItem[], saved: StoredItem[] = [], limit = 3): NextStepSuggestion[] => {
  const suggestions: NextStepSuggestion[] = [];
  const context = collectContextSignals([...recent, ...saved]);

  recent.forEach((item) => {
    if (item.kind === "comparison") {
      const comparison = asComparison(item.slug);
      if (!comparison) return;
      comparison.nextComparisonSlugs.forEach((slug, index) => {
        const next = asComparison(slug);
        if (!next) return;
        suggestions.push(buildComparisonSuggestion(next, index === 0 ? "前回の続きから" : "対立を深める比較"));
      });
      return;
    }

    if (item.kind === "thinker") {
      const thinker = asThinker(item.slug);
      if (!thinker) return;
      getThinkerRecommendations(thinker.slug, 2).forEach((comparison, index) => {
        suggestions.push(buildComparisonSuggestion(comparison, index === 0 ? "この人物から入る比較" : "近くの論点を見直す"));
      });
      return;
    }

    const theme = asTheme(item.slug);
    if (!theme) return;
    getOrderedThemeComparisons(theme.slug)
      .slice(0, 2)
      .forEach((comparison, index) => {
        suggestions.push(buildComparisonSuggestion(comparison, index === 0 ? "同じテーマの別ルート" : "あとで戻ると効く比較"));
      });
  });

  const fallback = comparisons
    .map((comparison) => ({ comparison, score: scoreComparison(comparison.slug, context) }))
    .sort((a, b) => b.score - a.score || a.comparison.slug.localeCompare(b.comparison.slug))
    .map(({ comparison }) => buildComparisonSuggestion(comparison, "保存や最近見た項目に近い比較"));

  return dedupeSuggestions([...suggestions, ...fallback]).slice(0, limit);
};

export const getSavedRevisitSuggestions = (saved: StoredItem[], recent: StoredItem[] = [], limit = 3): NextStepSuggestion[] => {
  const suggestions: NextStepSuggestion[] = [];

  saved.forEach((item) => {
    if (item.kind === "comparison") {
      const comparison = asComparison(item.slug);
      if (!comparison) return;
      suggestions.push(buildComparisonSuggestion(comparison, "保存から再開", "見直す比較"));
      const next = getCompareNextStepSuggestions(comparison.slug, 1)[0];
      if (next) suggestions.push({ ...next, reason: "あとで戻ると効く比較" });
      return;
    }

    if (item.kind === "thinker") {
      const thinker = asThinker(item.slug);
      if (!thinker) return;
      const starter = getThinkerRecommendations(thinker.slug, 1)[0];
      if (starter) suggestions.push(buildComparisonSuggestion(starter, "この人物から再開", "まずはこの1本"));
      return;
    }

    const theme = asTheme(item.slug);
    if (!theme) return;
    getOrderedThemeComparisons(theme.slug)
      .slice(0, 2)
      .forEach((comparison, index) => {
        suggestions.push(buildComparisonSuggestion(comparison, index === 0 ? "保存テーマの入口" : "同じテーマの別ルート", index === 0 ? "まずはこの1本" : "比較"));
      });
  });

  return dedupeSuggestions([...suggestions, ...getRecentContinuationSuggestions(recent, saved, limit + 2)]).slice(0, limit);
};

export const getThinkerLearningSuggestions = (thinkerSlug: string, recent: StoredItem[] = [], saved: StoredItem[] = []) => {
  const thinker = getThinkerBySlug(thinkerSlug);
  if (!thinker) return [];

  const suggestions: NextStepSuggestion[] = [];
  const primary = getThinkerRecommendations(thinker.slug, 1)[0];
  if (primary) suggestions.push(buildComparisonSuggestion(primary, "この人物から学ぶなら"));

  const adjacent = getNextThinkerRecommendations(thinker.slug, 1)[0];
  if (adjacent) suggestions.push(buildThinkerSuggestion(adjacent, "隣の思想家へ広げる"));

  const revisit = getSavedRevisitSuggestions(
    saved.filter((item) => item.slug === thinkerSlug || item.kind !== "thinker"),
    recent.filter((item) => item.slug === thinkerSlug || item.kind !== "thinker"),
    1,
  )[0];
  if (revisit) suggestions.push({ ...revisit, reason: "前回の流れに戻る" });

  return dedupeSuggestions(suggestions).slice(0, 3);
};

export const getSavedStudyGroups = (saved: StoredItem[], recent: StoredItem[] = []): SavedStudyGroup[] => {
  const savedComparisons = saved
    .filter((item) => item.kind === "comparison")
    .map((item) => asComparison(item.slug))
    .filter((item): item is Comparison => Boolean(item))
    .map((comparison) => ({
      slug: comparison.slug,
      title: comparison.titleJa,
      href: comparisonPath(comparison.leftThinkerSlug, comparison.rightThinkerSlug),
      kindLabel: "比較",
      note: comparison.subtitle,
      nextStep: getCompareNextStepSuggestions(comparison.slug, 1)[0],
    }));

  const savedThinkers = saved
    .filter((item) => item.kind === "thinker")
    .map((item) => asThinker(item.slug))
    .filter((item): item is Thinker => Boolean(item))
    .map((thinker) => ({
      slug: thinker.slug,
      title: thinker.nameJa,
      href: thinkerPath(thinker.slug),
      kindLabel: "思想家",
      note: thinker.oneLiner,
      nextStep: (() => {
        const starter = getThinkerRecommendations(thinker.slug, 1)[0];
        return starter ? buildComparisonSuggestion(starter, "この人物から入る比較") : undefined;
      })(),
    }));

  const savedThemes = saved
    .filter((item) => item.kind === "theme")
    .map((item) => asTheme(item.slug))
    .filter((item): item is Theme => Boolean(item))
    .map((theme) => ({
      slug: theme.slug,
      title: theme.titleJa,
      href: themePath(theme.slug),
      kindLabel: "テーマ",
      note: theme.shortDescription,
      nextStep: (() => {
        const starter = getOrderedThemeComparisons(theme.slug)[0];
        return starter ? buildComparisonSuggestion(starter, "まずはこの1本") : undefined;
      })(),
    }));

  const recentHint = getRecentContinuationSuggestions(recent, saved, 1)[0];

  return [
    {
      title: "保存した比較",
      description: "見直した比較から、次の一歩へつなげます。",
      emptyMessage: "比較を保存すると、ここから再開できます。",
      items: savedComparisons.map((item, index) => ({
        ...item,
        nextStep: index === 0 ? item.nextStep ?? recentHint : item.nextStep,
      })),
    },
    {
      title: "保存した思想家",
      description: "人物から入り直せる比較を静かに並べます。",
      emptyMessage: "思想家を保存すると、最初の比較入口を案内します。",
      items: savedThinkers,
    },
    {
      title: "保存したテーマ",
      description: "テーマごとの入口比較を、学習棚のように整理します。",
      emptyMessage: "テーマを保存すると、次に見る比較をここに出します。",
      items: savedThemes,
    },
  ];
};
