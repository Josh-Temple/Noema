import { notFound } from "next/navigation";
import { ComparisonHero } from "@/components/compare/ComparisonHero";
import { ComparisonFocusPoints } from "@/components/compare/ComparisonFocusPoints";
import { ComparisonSummary } from "@/components/compare/ComparisonSummary";
import { CommonGroundCard } from "@/components/compare/CommonGroundCard";
import { ComparisonSectionCard } from "@/components/compare/ComparisonSectionCard";
import { NextStepCard } from "@/components/compare/NextStepCard";
import { RecentTracker } from "@/components/common/RecentTracker";
import { getComparisonBySlug, getComparisonByThinkerPair, getThemeBySlug, getThinkerBySlug } from "@/lib/content";
import { comparisonPath, themePath, thinkerPath } from "@/lib/routes";

export default function ComparePage({ params }: { params: { left: string; right: string } }) {
  const comparison = getComparisonByThinkerPair(params.left, params.right);
  if (!comparison) return notFound();
  const left = getThinkerBySlug(comparison.leftThinkerSlug);
  const right = getThinkerBySlug(comparison.rightThinkerSlug);
  if (!left || !right) return notFound();

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
      <section className="mb-6" aria-labelledby="next-step-heading">
        <h3 id="next-step-heading" className="mb-2 text-2xl font-bold">
          次の一歩
        </h3>
        {comparison.nextThinkerSlugs.map((slug) => {
          const thinker = getThinkerBySlug(slug);
          if (!thinker) return null;
          return <NextStepCard key={slug} title={`思想家: ${thinker.nameJa}`} href={thinkerPath(slug)} />;
        })}
        {comparison.nextComparisonSlugs.map((slug) => {
          const next = getComparisonBySlug(slug);
          if (!next) return null;
          return <NextStepCard key={slug} title={`比較: ${next.titleJa}`} href={comparisonPath(next.leftThinkerSlug, next.rightThinkerSlug)} />;
        })}
        {comparison.nextThemeSlugs.map((slug) => {
          const theme = getThemeBySlug(slug);
          if (!theme) return null;
          return <NextStepCard key={slug} title={`テーマ: ${theme.titleJa}`} href={themePath(slug)} />;
        })}
      </section>
    </div>
  );
}
