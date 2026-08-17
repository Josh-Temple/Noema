"use client";

import { SectionTitle } from "@/components/common/SectionTitle";
import { SearchBar } from "@/components/home/SearchBar";
import { RecommendedComparisonCard } from "@/components/home/RecommendedComparisonCard";
import { ThemeChipGrid } from "@/components/home/ThemeChipGrid";
import { DiscoveryCard } from "@/components/home/DiscoveryCard";
import { RecentItemCard } from "@/components/home/RecentItemCard";
import { LearningLoopSection } from "@/components/home/LearningLoopSection";
import { ComparisonPathwayRail, ThemeEntryRail } from "@/components/home/PathwayRail";
import { comparisons, themes } from "@/lib/content";
import { comparisonPath, thinkerPath } from "@/lib/routes";
import { getFeaturedComparisons, getRecentContinuationSuggestions, getSavedRevisitSuggestions, getTodayPick } from "@/lib/recommendations";
import { useRecentItems } from "@/hooks/useRecentItems";
import { useSavedItems } from "@/hooks/useSavedItems";
import { CompassIcon, SparkIcon, ThemeIcon, ThinkerIcon } from "@/components/common/icons";
import { getComparisonBySlugs, HOME_PATHWAY_RAILS, HOME_THEME_ENTRY_THEMES } from "@/lib/pathways";
import { NoemaBrandHeader } from "@/components/home/NoemaBrandHeader";

export default function HomePage() {
  const { recentItems } = useRecentItems();
  const { savedItems } = useSavedItems();
  const today = getTodayPick({ recent: recentItems, saved: savedItems });
  const recommendedComparisons = getFeaturedComparisons({ recent: recentItems, saved: savedItems, limit: 4 });
  const savedRevisitItems = getSavedRevisitSuggestions(savedItems, recentItems, 2);
  const recentContinuationItems = getRecentContinuationSuggestions(recentItems, savedItems, 3);

  return (
    <div className="space-y-16">
      <NoemaBrandHeader />
      <SearchBar />

      <section>
        <SectionTitle icon={<CompassIcon className="h-4 w-4" />} title="任せる" description="日替わり提案。" />
        <div className="rounded-2xl border border-noema-line bg-white p-2 shadow-sm">
          <div className="divide-y divide-noema-line">
            <RecentItemCard icon={<ThinkerIcon className="h-4 w-4" />} title={`今日の思想家: ${today.thinker.nameJa}`} subtitle={today.thinker.oneLiner} href={thinkerPath(today.thinker.slug)} />
            <RecentItemCard icon={<SparkIcon className="h-4 w-4" />} title={`今日の比較: ${today.comparison.titleJa}`} subtitle={today.comparison.subtitle} href={comparisonPath(today.comparison.leftThinkerSlug, today.comparison.rightThinkerSlug)} />
            <RecentItemCard icon={<ThemeIcon className="h-4 w-4" />} title={`今日のテーマ: ${today.theme.titleJa}`} subtitle={today.theme.shortDescription} href={`/themes/${today.theme.slug}`} />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle icon={<SparkIcon className="h-5 w-5" />} title="おすすめ比較" description="まずはここから。保存・最近見た流れをもとに、読みやすい比較を並べています。" />
        {recommendedComparisons.map((item, index) => (
          <RecommendedComparisonCard key={item.slug} item={item} primary={index === 0} />
        ))}
      </section>

      <LearningLoopSection savedItems={savedRevisitItems} recentItems={recentContinuationItems} />

      <section>
        <SectionTitle icon={<CompassIcon className="h-5 w-5" />} title="テーマから入る" description="主要テーマごとの入口を短くまとめています。" />
        <ThemeEntryRail items={HOME_THEME_ENTRY_THEMES} />
      </section>

      <section>
        <SectionTitle icon={<ThemeIcon className="h-4 w-4" />} title="テーマ" description="比較に入るための入口。" />
        <ThemeChipGrid items={themes} />
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        {HOME_PATHWAY_RAILS.map((rail) => (
          <ComparisonPathwayRail key={rail.id} title={rail.title} description={rail.description} items={getComparisonBySlugs(rail.comparisonSlugs)} />
        ))}
      </section>

      <section>
        <SectionTitle icon={<CompassIcon className="h-4 w-4" />} title="最近見た項目の近く" />
        <DiscoveryCard title={recentContinuationItems[0]?.title ?? comparisons[2].titleJa} body={recentContinuationItems[0]?.reason ?? comparisons[2].subtitle} href={recentContinuationItems[0]?.href ?? comparisonPath(comparisons[2].leftThinkerSlug, comparisons[2].rightThinkerSlug)} />
      </section>
    </div>
  );
}
