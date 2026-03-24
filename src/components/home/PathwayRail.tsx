import { Comparison, Theme } from "@/types/content";
import { InfoCard } from "@/components/common/InfoCard";
import { NextStepCard } from "@/components/compare/NextStepCard";
import { comparisonPath, themePath } from "@/lib/routes";
import { CompassIcon, ThemeIcon } from "@/components/common/icons";
import Link from "next/link";

export const ThemeEntryRail = ({ items }: { items: Theme[] }) => (
  <div className="grid gap-3 md:grid-cols-2">
    {items.map((item) => (
      <Link key={item.slug} href={themePath(item.slug)}>
        <InfoCard className="h-full border-noema-line/45 bg-[#101833]/75">
          <p className="mb-1 inline-flex items-center gap-1 text-[11px] text-[#bfcbec]">
            <ThemeIcon className="h-3 w-3 text-[#a6b4df]" />
            <span>テーマ入口</span>
          </p>
          <p className="font-bold text-[#d4daf0]">{item.titleJa}</p>
          <p className="mt-1 text-sm text-noema-muted">{item.shortDescription}</p>
          <p className="mt-2 text-xs text-[#b9c5e9]">比較から入りやすいルート。</p>
        </InfoCard>
      </Link>
    ))}
  </div>
);

export const ComparisonPathwayRail = ({ title, description, items }: { title: string; description: string; items: Comparison[] }) => (
  <section className="rounded-card border border-noema-line/40 bg-[#0e142d]/60 p-3">
    <h3 className="flex items-center gap-2 text-base font-semibold">
      <CompassIcon className="h-3.5 w-3.5 text-noema-accent/80" />
      <span>{title}</span>
    </h3>
    <p className="mb-1 mt-1 text-xs text-noema-muted">{description}</p>
    <div className="divide-y divide-noema-line/30">
      {items.map((item) => (
        <NextStepCard key={item.slug} title={item.titleJa} subtitle={item.subtitle} href={comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug)} variant="row" />
      ))}
    </div>
  </section>
);
