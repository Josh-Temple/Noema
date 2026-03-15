import { notFound } from "next/navigation";
import { ThinkerHero } from "@/components/thinker/ThinkerHero";
import { ThinkerSummaryCard } from "@/components/thinker/ThinkerSummaryCard";
import { RelatedComparisonStrip } from "@/components/thinker/RelatedComparisonStrip";
import { RelatedThemeStrip } from "@/components/thinker/RelatedThemeStrip";
import { NextThinkerStrip } from "@/components/thinker/NextThinkerStrip";
import { getComparisonsForThinker, getRelatedThinkers, getThemesForThinker, getThinkerBySlug } from "@/lib/content";

export default function ThinkerPage({ params }: { params: { slug: string } }) {
  const thinker = getThinkerBySlug(params.slug);
  if (!thinker) return notFound();

  return (
    <div>
      <ThinkerHero thinker={thinker} />
      <ThinkerSummaryCard title="核心の問い" body={thinker.coreQuestion} />
      <ThinkerSummaryCard title="基本回答" body={thinker.basicAnswer} />
      <RelatedComparisonStrip items={getComparisonsForThinker(thinker.slug)} />
      <RelatedThemeStrip items={getThemesForThinker(thinker.slug)} />
      <NextThinkerStrip items={getRelatedThinkers(thinker.slug)} />
    </div>
  );
}
