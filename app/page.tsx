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

export default function HomePage() {
  const today = getTodayPick();
  const { recentItems } = useRecentItems();
  const recentCompares = getRecentRecommendations(recentItems);
  const recommendedComparisons = getFeaturedComparisons().slice(0, 4);

  return (
    <div>
      <SearchBar />
      <section className="mb-6">
        <SectionTitle title="おすすめ比較" description="まずはここから。短時間で軸の違いをつかめる比較を並べています。" />
        {recommendedComparisons.map((item, index) => (
          <RecommendedComparisonCard key={item.slug} item={item} primary={index === 0} />
        ))}
      </section>

      <section className="mb-6">
        <SectionTitle title="テーマ" description="テーマは比較に入る入口です。" />
        <ThemeChipGrid items={themes} />
      </section>

      <section className="mb-6">
        <SectionTitle title="任せる" description="日付ベースで毎日同じ提案を表示します。" />
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
