import { Comparison, Theme } from "@/types/content";
import { NextStepCard } from "@/components/compare/NextStepCard";
import { comparisonPath, themePath } from "@/lib/routes";
import { CompassIcon, ThemeIcon } from "@/components/common/icons";
import Link from "next/link";

export const ThemeEntryRail = ({ items }: { items: Theme[] }) => (
  <div className="rounded-2xl border border-noema-line bg-white p-2 shadow-sm">
    {items.map((item) => (
      <Link key={item.slug} href={themePath(item.slug)} className="group block rounded-xl border-b border-noema-line px-3 py-4 transition duration-300 hover:bg-slate-50 last:border-b-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1 inline-flex items-center gap-1 text-[0.65rem] font-black uppercase tracking-widest text-noema-yellow">
            <ThemeIcon className="h-3 w-3 text-noema-yellow" />
            <span>テーマ入口</span>
          </p>
            <p className="font-black text-noema-text">{item.titleJa}</p>
            <p className="mt-0.5 text-sm text-noema-muted line-clamp-1">{item.shortDescription}</p>
          </div>
          <span className="pt-4 text-xs font-black text-noema-blue">→</span>
        </div>
      </Link>
    ))}
  </div>
);

export const ComparisonPathwayRail = ({ title, description, items }: { title: string; description: string; items: Comparison[] }) => (
  <section className="rounded-2xl border border-noema-line bg-white px-4 py-5 shadow-sm">
    <h3 className="flex items-center gap-2 text-base font-semibold">
      <CompassIcon className="h-3.5 w-3.5 text-noema-blue" />
      <span>{title}</span>
    </h3>
    <p className="mb-1 mt-1 text-xs text-noema-muted">{description}</p>
    <div className="divide-y divide-noema-line">
      {items.map((item) => (
        <NextStepCard key={item.slug} title={item.titleJa} subtitle={item.subtitle} href={comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug)} variant="row" />
      ))}
    </div>
  </section>
);
