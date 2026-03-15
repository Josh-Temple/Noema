import { Comparison } from "@/types/content";
import { comparisonPath } from "@/lib/routes";
import { NextStepCard } from "@/components/compare/NextStepCard";

export const RelatedComparisonStrip = ({ items }: { items: Comparison[] }) => (
  <section className="mb-5" aria-labelledby="related-comparison-heading">
    <div className="mb-2 flex items-end justify-between gap-2">
      <h3 id="related-comparison-heading" className="text-2xl font-bold">
        関連比較
      </h3>
      <p className="text-xs text-noema-muted">まずは上から読むのがおすすめです</p>
    </div>
    {items.map((item, index) => (
      <div key={item.slug} className="relative">
        {index < 2 ? (
          <span className="pointer-events-none absolute right-2 top-2 z-10 rounded-full bg-[#3142a8] px-2 py-0.5 text-[10px] font-bold text-[#eef1ff]">推奨</span>
        ) : null}
        <NextStepCard title={item.titleJa} href={comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug)} />
      </div>
    ))}
  </section>
);
