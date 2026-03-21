import { notFound } from "next/navigation";
import { ThinkerHero } from "@/components/thinker/ThinkerHero";
import { ThinkerSummaryCard } from "@/components/thinker/ThinkerSummaryCard";
import { RelatedComparisonStrip } from "@/components/thinker/RelatedComparisonStrip";
import { RelatedThemeStrip } from "@/components/thinker/RelatedThemeStrip";
import { NextThinkerStrip } from "@/components/thinker/NextThinkerStrip";
import { ThinkerLearningPanel } from "@/components/thinker/ThinkerLearningPanel";
import { getThemesForThinker, getThinkerBySlug } from "@/lib/content";
import { getNextThinkerRecommendations, getThinkerRecommendations } from "@/lib/recommendations";
import { RecentTracker } from "@/components/common/RecentTracker";

export default function ThinkerPage({ params }: { params: { slug: string } }) {
  const thinker = getThinkerBySlug(params.slug);
  if (!thinker) return notFound();

  return (
    <div>
      <RecentTracker kind="thinker" slug={thinker.slug} />
      <ThinkerHero thinker={thinker} />
      <ThinkerSummaryCard title="核心の問い" body={thinker.coreQuestion} />
      <ThinkerSummaryCard title="基本回答" body={thinker.basicAnswer} />
      <ThinkerLearningPanel thinkerSlug={thinker.slug} />
      <RelatedComparisonStrip items={getThinkerRecommendations(thinker.slug)} />
      <RelatedThemeStrip items={getThemesForThinker(thinker.slug)} />
      <NextThinkerStrip items={getNextThinkerRecommendations(thinker.slug)} />
    </div>
  );
}
