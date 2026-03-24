import { Comparison, Theme } from "@/types/content";
import { NextStepCard } from "@/components/compare/NextStepCard";
import { comparisonPath, themePath } from "@/lib/routes";
import { CompassIcon, ThemeIcon } from "@/components/common/icons";
import Link from "next/link";

export const ThemeEntryRail = ({ items }: { items: Theme[] }) => (
  <div className="rounded-card bg-[#0f1630]/45 p-1.5">
    {items.map((item) => (
      <Link key={item.slug} href={themePath(item.slug)} className="group block rounded-md px-2.5 py-2.5 transition hover:bg-white/[0.02]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1 inline-flex items-center gap-1 text-[11px] text-[#aebce3]">
            <ThemeIcon className="h-3 w-3 text-[#a6b4df]" />
            <span>テーマ入口</span>
          </p>
            <p className="font-semibold text-[#d4daf0]">{item.titleJa}</p>
            <p className="mt-0.5 text-sm text-noema-muted line-clamp-1">{item.shortDescription}</p>
          </div>
          <span className="pt-4 text-xs text-[#9dacdb] group-hover:text-[#c2d0f5]">→</span>
        </div>
      </Link>
    ))}
  </div>
);

export const ComparisonPathwayRail = ({ title, description, items }: { title: string; description: string; items: Comparison[] }) => (
  <section className="rounded-card bg-[#0f152f]/45 p-3">
    <h3 className="flex items-center gap-2 text-base font-semibold">
      <CompassIcon className="h-3.5 w-3.5 text-noema-accent/70" />
      <span>{title}</span>
    </h3>
    <p className="mb-1 mt-1 text-xs text-noema-muted">{description}</p>
    <div className="divide-y divide-noema-line/25">
      {items.map((item) => (
        <NextStepCard key={item.slug} title={item.titleJa} subtitle={item.subtitle} href={comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug)} variant="row" />
      ))}
    </div>
  </section>
);
