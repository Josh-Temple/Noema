"use client";

import { SectionTitle } from "@/components/common/SectionTitle";
import { SearchBar } from "@/components/home/SearchBar";
import { RecommendedComparisonCard } from "@/components/home/RecommendedComparisonCard";
import { ThemeChipGrid } from "@/components/home/ThemeChipGrid";
import { DiscoveryCard } from "@/components/home/DiscoveryCard";
import { RecentItemCard } from "@/components/home/RecentItemCard";
import { comparisons, themes } from "@/lib/content";
import { comparisonPath, thinkerPath } from "@/lib/routes";
import { getFeaturedComparisons, getTodayPick, getRecentRecommendations } from "@/lib/recommendations";
import { useRecentItems } from "@/hooks/useRecentItems";
import { useSavedItems } from "@/hooks/useSavedItems";

export default function HomePage() {
  const { recentItems } = useRecentItems();
  const { savedItems } = useSavedItems();
  const today = getTodayPick({ recent: recentItems, saved: savedItems });
  const recentCompares = getRecentRecommendations(recentItems, savedItems);
  const recommendedComparisons = getFeaturedComparisons({ recent: recentItems, saved: savedItems, limit: 4 });

  return (
    <div>
      <SearchBar />
      <section className="mb-6">
        <SectionTitle title="おすすめ比較" description="まずはここから。保存・最近見た項目をもとに、読みやすい比較を並べています。" />
        {recommendedComparisons.map((item, index) => (
          <RecommendedComparisonCard key={item.slug} item={item} primary={index === 0} />
        ))}
      </section>

      <section className="mb-6">
        <SectionTitle title="テーマ" description="テーマは比較に入る入口です。" />
        <ThemeChipGrid items={themes} />
      </section>

      <section className="mb-6">
        <SectionTitle title="任せる" description="日替わり提案に、最近見た流れを少し反映します。" />
        <RecentItemCard title={`今日の思想家: ${today.thinker.nameJa}`} subtitle={today.thinker.oneLiner} href={thinkerPath(today.thinker.slug)} />
        <RecentItemCard title={`今日の比較: ${today.comparison.titleJa}`} subtitle={today.comparison.subtitle} href={comparisonPath(today.comparison.leftThinkerSlug, today.comparison.rightThinkerSlug)} />
        <RecentItemCard title={`今日のテーマ: ${today.theme.titleJa}`} subtitle={today.theme.shortDescription} href={`/themes/${today.theme.slug}`} />
      </section>

      <section className="mb-6">
        <SectionTitle title="最近見た項目の近く" />
        <DiscoveryCard title={recentCompares[0]?.titleJa ?? comparisons[2].titleJa} body={recentCompares[0]?.subtitle ?? comparisons[2].subtitle} href={comparisonPath((recentCompares[0] ?? comparisons[2]).leftThinkerSlug, (recentCompares[0] ?? comparisons[2]).rightThinkerSlug)} />
      </section>
    </div>
  );
}
