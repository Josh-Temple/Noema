import { Comparison } from "@/types/content";
import { comparisonPath } from "@/lib/routes";
import { NextStepCard } from "@/components/compare/NextStepCard";
import { CompareIcon } from "@/components/common/icons";

export const ThemeComparisonList = ({ items }: { items: Comparison[] }) => (
  <section className="mb-4">
    <h3 className="mb-2 flex items-center gap-2 text-2xl font-bold"><CompareIcon className="h-5 w-5 text-noema-accent" /><span>関連比較</span></h3>
    {items.map((item) => (
      <NextStepCard key={item.slug} title={item.titleJa} href={comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug)} />
    ))}
  </section>
);
