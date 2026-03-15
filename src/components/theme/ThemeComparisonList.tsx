import { Comparison } from "@/types/content";
import { comparisonPath } from "@/lib/routes";
import { NextStepCard } from "@/components/compare/NextStepCard";

export const ThemeComparisonList = ({ items }: { items: Comparison[] }) => (
  <section className="mb-4">
    <h3 className="mb-2 text-2xl font-bold">関連比較</h3>
    {items.map((item) => (
      <NextStepCard key={item.slug} title={item.titleJa} href={comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug)} />
    ))}
  </section>
);
