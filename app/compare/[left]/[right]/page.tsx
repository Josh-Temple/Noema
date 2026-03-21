import { notFound } from "next/navigation";
import { ComparisonHero } from "@/components/compare/ComparisonHero";
import { ComparisonFocusPoints } from "@/components/compare/ComparisonFocusPoints";
import { ComparisonSummary } from "@/components/compare/ComparisonSummary";
import { CommonGroundCard } from "@/components/compare/CommonGroundCard";
import { ComparisonSectionCard } from "@/components/compare/ComparisonSectionCard";
import { NextStepCard } from "@/components/compare/NextStepCard";
import { ComparisonReviewCard } from "@/components/compare/ComparisonReviewCard";
import { RecentTracker } from "@/components/common/RecentTracker";
import { getComparisonByThinkerPair, getThinkerBySlug } from "@/lib/content";
import { getComparisonReview, getCompareNextStepSuggestions } from "@/lib/recommendations";

export default function ComparePage({ params }: { params: { left: string; right: string } }) {
  const comparison = getComparisonByThinkerPair(params.left, params.right);
  if (!comparison) return notFound();
  const left = getThinkerBySlug(comparison.leftThinkerSlug);
  const right = getThinkerBySlug(comparison.rightThinkerSlug);
  if (!left || !right) return notFound();

  const review = getComparisonReview(comparison.slug);

  return (
    <div>
      <RecentTracker kind="comparison" slug={comparison.slug} />
      <ComparisonHero comparison={comparison} left={left} right={right} />
      <ComparisonFocusPoints items={comparison.whatToWatch} />
      <ComparisonSummary text={comparison.summaryDifference} />
      <CommonGroundCard text={comparison.commonGround} />
      <section className="mb-5" aria-label="比較の論点セクション">
        {comparison.sections.map((section) => (
          <ComparisonSectionCard key={section.title} section={section} />
        ))}
      </section>
      {review ? <ComparisonReviewCard review={review} /> : null}
      <section className="mb-6" aria-labelledby="next-step-heading">
        <h3 id="next-step-heading" className="mb-2 text-2xl font-bold">
          次の一歩
        </h3>
        {getCompareNextStepSuggestions(comparison.slug).map((item) => (
          <NextStepCard key={item.href} title={item.title} subtitle={item.reason} href={item.href} />
        ))}
      </section>
    </div>
  );
}
