import { CheckIcon, ClockIcon } from "@/components/common/icons";
import { ComparisonReview } from "@/lib/recommendations";
import { NextStepCard } from "@/components/compare/NextStepCard";

export const ComparisonReviewCard = ({ review }: { review: ComparisonReview }) => (
  <section className="mb-6 rounded-card border border-noema-line bg-[#111431] p-4" aria-labelledby="comparison-review-heading">
    <div className="mb-3 flex items-start justify-between gap-3">
      <div>
        <h3 id="comparison-review-heading" className="flex items-center gap-2 text-2xl font-bold text-noema-text">
          <CheckIcon className="h-5 w-5 text-noema-accent" />
          <span>理解確認</span>
        </h3>
        <p className="mt-1 text-sm text-noema-muted">{review.summary}</p>
      </div>
      <span className="inline-flex items-center gap-1 rounded-full border border-[#33457c] bg-[#131c37] px-2 py-0.5 text-[11px] text-[#dce6ff]">
        <ClockIcon className="h-3 w-3" />
        <span>1分で振り返る</span>
      </span>
    </div>

    <div className="mb-4 grid gap-4 md:grid-cols-2">
      <div>
        <h4 className="mb-2 text-sm font-bold text-[#dfe6ff]">この比較の要点</h4>
        <ul className="space-y-2 text-sm text-noema-muted">
          {review.reviewPoints.map((point) => (
            <li key={point} className="rounded-card border border-noema-line bg-[#0d1028] px-3 py-2">
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-bold text-[#dfe6ff]">短く確認する問い</h4>
        <ul className="space-y-2 text-sm text-noema-muted">
          {review.prompts.map((prompt) => (
            <li key={prompt} className="rounded-card border border-noema-line bg-[#0d1028] px-3 py-2">
              {prompt}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {review.nextStep ? <NextStepCard title={review.nextStep.title} href={review.nextStep.href} subtitle={review.nextStep.reason} /> : null}
  </section>
);
