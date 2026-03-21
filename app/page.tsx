"use client";

import { SectionTitle } from "@/components/common/SectionTitle";
import { SearchBar } from "@/components/home/SearchBar";
import { RecommendedComparisonCard } from "@/components/home/RecommendedComparisonCard";
import { ThemeChipGrid } from "@/components/home/ThemeChipGrid";
import { DiscoveryCard } from "@/components/home/DiscoveryCard";
import { RecentItemCard } from "@/components/home/RecentItemCard";
import { LearningLoopSection } from "@/components/home/LearningLoopSection";
import { comparisons, themes } from "@/lib/content";
import { comparisonPath, thinkerPath } from "@/lib/routes";
import { getFeaturedComparisons, getRecentContinuationSuggestions, getSavedRevisitSuggestions, getTodayPick } from "@/lib/recommendations";
import { useRecentItems } from "@/hooks/useRecentItems";
import { useSavedItems } from "@/hooks/useSavedItems";
import { CompassIcon, SparkIcon, ThemeIcon, ThinkerIcon } from "@/components/common/icons";

export default function HomePage() {
  const { recentItems } = useRecentItems();
  const { savedItems } = useSavedItems();
  const today = getTodayPick({ recent: recentItems, saved: savedItems });
  const recommendedComparisons = getFeaturedComparisons({ recent: recentItems, saved: savedItems, limit: 4 });
  const savedRevisitItems = getSavedRevisitSuggestions(savedItems, recentItems, 2);
  const recentContinuationItems = getRecentContinuationSuggestions(recentItems, savedItems, 3);

  return (
    <div>
      <SearchBar />
      <section className="mb-6">
        <SectionTitle icon={<SparkIcon className="h-6 w-6" />} title="おすすめ比較" description="まずはここから。保存・最近見た項目をもとに、読みやすい比較を並べています。" />
        {recommendedComparisons.map((item, index) => (
          <RecommendedComparisonCard key={item.slug} item={item} primary={index === 0} />
        ))}
      </section>

      <LearningLoopSection savedItems={savedRevisitItems} recentItems={recentContinuationItems} />

      <section className="mb-6">
        <SectionTitle icon={<ThemeIcon className="h-6 w-6" />} title="テーマ" description="テーマは比較に入る入口です。" />
        <ThemeChipGrid items={themes} />
      </section>

      <section className="mb-6">
        <SectionTitle icon={<CompassIcon className="h-6 w-6" />} title="任せる" description="日替わり提案に、最近見た流れを少し反映します。" />
        <RecentItemCard icon={<ThinkerIcon className="h-4 w-4" />} title={`今日の思想家: ${today.thinker.nameJa}`} subtitle={today.thinker.oneLiner} href={thinkerPath(today.thinker.slug)} />
        <RecentItemCard icon={<SparkIcon className="h-4 w-4" />} title={`今日の比較: ${today.comparison.titleJa}`} subtitle={today.comparison.subtitle} href={comparisonPath(today.comparison.leftThinkerSlug, today.comparison.rightThinkerSlug)} />
        <RecentItemCard icon={<ThemeIcon className="h-4 w-4" />} title={`今日のテーマ: ${today.theme.titleJa}`} subtitle={today.theme.shortDescription} href={`/themes/${today.theme.slug}`} />
      </section>

      <section className="mb-6">
        <SectionTitle icon={<CompassIcon className="h-6 w-6" />} title="最近見た項目の近く" />
        <DiscoveryCard title={recentContinuationItems[0]?.title ?? comparisons[2].titleJa} body={recentContinuationItems[0]?.reason ?? comparisons[2].subtitle} href={recentContinuationItems[0]?.href ?? comparisonPath(comparisons[2].leftThinkerSlug, comparisons[2].rightThinkerSlug)} />
      </section>
    </div>
  );
}
