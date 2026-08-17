import { Comparison, ThemePathwayGroup } from "@/types/content";
import { comparisonPath } from "@/lib/routes";
import { NextStepCard } from "@/components/compare/NextStepCard";
import { CompareIcon, CompassIcon } from "@/components/common/icons";

export const ThemeComparisonList = ({ items, groups }: { items: Comparison[]; groups?: Array<ThemePathwayGroup & { items: Comparison[] }> }) => (
  <section className="mb-8">
    <h3 className="mb-4 flex items-center gap-2 text-xl font-black"><CompareIcon className="h-5 w-5 text-noema-blue" /><span>関連比較</span></h3>
    {groups?.length ? (
      <div className="space-y-4">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`theme-group-${group.id}`} className="rounded-2xl border border-noema-line bg-white p-4 shadow-sm">
            <h4 id={`theme-group-${group.id}`} className="flex items-center gap-2 text-lg font-bold">
              <CompassIcon className="h-4 w-4 text-noema-blue" />
              <span>{group.title}</span>
            </h4>
            {group.description ? <p className="mb-2 mt-1 text-sm text-noema-muted">{group.description}</p> : null}
            {group.items.map((item) => (
              <NextStepCard key={item.slug} title={item.titleJa} subtitle={item.subtitle} href={comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug)} />
            ))}
          </section>
        ))}
      </div>
    ) : null}
    {items.length ? (
      <div className={groups?.length ? "mt-4" : undefined}>
        {items.map((item) => (
          <NextStepCard key={item.slug} title={item.titleJa} subtitle={item.subtitle} href={comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug)} />
        ))}
      </div>
    ) : null}
  </section>
);
