import { NextStepCard } from "@/components/compare/NextStepCard";
import { CompassIcon } from "@/components/common/icons";
import { Comparison, ThemeReadingOrder } from "@/types/content";
import { comparisonPath } from "@/lib/routes";

type ReadingOrderItem = {
  label: string;
  description?: string;
  items: Comparison[];
};

export const ThemeReadingOrderCard = ({ readingOrder, sections }: { readingOrder: ThemeReadingOrder; sections: ReadingOrderItem[] }) => (
  <section className="mb-8 rounded-2xl border border-noema-line bg-white p-5 shadow-sm" aria-labelledby="theme-reading-order-heading">
    <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-noema-blue">{readingOrder.eyebrow ?? "読み順ガイド"}</p>
    <h3 id="theme-reading-order-heading" className="mt-2 flex items-center gap-2 text-lg font-black">
      <CompassIcon className="h-4 w-4 text-noema-blue" />
      <span>{readingOrder.title}</span>
    </h3>
    <div className="mt-4 divide-y divide-noema-line">
      {sections
        .filter((section) => section.items.length > 0)
        .map((section) => (
          <div key={section.label} className="py-2 first:pt-0 last:pb-0">
            <p className="text-sm font-semibold text-noema-text">{section.label}</p>
            {section.description ? <p className="mb-1 text-xs text-noema-muted">{section.description}</p> : null}
            {section.items.map((item) => (
              <NextStepCard
                key={`reading-order-${section.label}-${item.slug}`}
                title={item.titleJa}
                subtitle={item.subtitle}
                href={comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug)}
                variant="row"
              />
            ))}
          </div>
        ))}
    </div>
  </section>
);
