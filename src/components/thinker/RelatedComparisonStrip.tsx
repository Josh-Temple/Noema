import { Comparison } from "@/types/content";
import { comparisonPath } from "@/lib/routes";
import { NextStepCard } from "@/components/compare/NextStepCard";
import { CompareIcon } from "@/components/common/icons";

export const RelatedComparisonStrip = ({ items }: { items: Comparison[] }) => (
  <section className="mb-5" aria-labelledby="related-comparison-heading">
    <div className="mb-2 flex items-end justify-between gap-2">
      <h3 id="related-comparison-heading" className="flex items-center gap-2 text-xl font-black">
        <CompareIcon className="h-5 w-5 text-noema-accent" />
        <span>関連比較</span>
      </h3>
      <p className="text-xs text-noema-muted">優先テーマに近いものから上に並びます</p>
    </div>
    {items.map((item, index) => (
      <div key={item.slug} className="relative">
        {index < 2 ? (
          <span className="pointer-events-none absolute right-2 top-2 z-10 rounded-full bg-noema-accentSoft px-2 py-1 text-[0.65rem] font-black text-noema-accent">入口</span>
        ) : null}
        <NextStepCard title={item.titleJa} subtitle={item.subtitle} href={comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug)} />
      </div>
    ))}
  </section>
);
