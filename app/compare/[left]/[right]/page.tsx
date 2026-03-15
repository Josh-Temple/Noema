import { notFound } from "next/navigation";
import { ComparisonHero } from "@/components/compare/ComparisonHero";
import { ComparisonFocusPoints } from "@/components/compare/ComparisonFocusPoints";
import { ComparisonSummary } from "@/components/compare/ComparisonSummary";
import { CommonGroundCard } from "@/components/compare/CommonGroundCard";
import { ComparisonSectionCard } from "@/components/compare/ComparisonSectionCard";
import { NextStepCard } from "@/components/compare/NextStepCard";
import { RecentTracker } from "@/components/common/RecentTracker";
import { getComparisonByThinkerPair, getThinkerBySlug } from "@/lib/content";
import { comparisonPath, themePath, thinkerPath } from "@/lib/routes";

export default function ComparePage({ params }: { params: { left: string; right: string } }) {
  const comparison = getComparisonByThinkerPair(params.left, params.right);
  if (!comparison) return notFound();
  const left = getThinkerBySlug(comparison.leftThinkerSlug);
  const right = getThinkerBySlug(comparison.rightThinkerSlug);
  if (!left || !right) return notFound();

  return (
    <div>
      <RecentTracker slug={comparison.slug} />
      <ComparisonHero comparison={comparison} left={left} right={right} />
      <ComparisonFocusPoints items={comparison.whatToWatch} />
      <ComparisonSummary text={comparison.summaryDifference} />
      <CommonGroundCard text={comparison.commonGround} />
      <section className="mb-5">
        {comparison.sections.map((section) => <ComparisonSectionCard key={section.title} section={section} />)}
      </section>
      <section className="mb-6">
        <h3 className="mb-2 text-2xl font-bold">次の一歩</h3>
        {comparison.nextThinkerSlugs.map((slug) => <NextStepCard key={slug} title={`思想家: ${slug}`} href={thinkerPath(slug)} />)}
        {comparison.nextComparisonSlugs.map((slug) => {
          const next = slug.split("-");
          return <NextStepCard key={slug} title={`比較: ${slug}`} href={comparisonPath(next[0], next[1])} />;
        })}
        {comparison.nextThemeSlugs.map((slug) => <NextStepCard key={slug} title={`テーマ: ${slug}`} href={themePath(slug)} />)}
      </section>
    </div>
  );
}
