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
        <InfoCard className="h-full">
          <p className="mb-1 inline-flex items-center gap-1 rounded-full border border-[#33457c] bg-[#131c37] px-2 py-0.5 text-[11px] text-[#dce6ff]">
            <ThemeIcon className="h-3 w-3" />
            <span>テーマ入口</span>
          </p>
          <p className="font-bold text-[#d4daf0]">{item.titleJa}</p>
          <p className="mt-1 text-sm text-noema-muted">{item.shortDescription}</p>
          <p className="mt-2 text-xs text-[#c8d0eb]">比較から入りやすいルートを整理しました。</p>
        </InfoCard>
      </Link>
    ))}
  </div>
);

export const ComparisonPathwayRail = ({ title, description, items }: { title: string; description: string; items: Comparison[] }) => (
  <section className="rounded-card border border-noema-line/80 bg-[#101531]/70 p-3">
    <h3 className="flex items-center gap-2 text-lg font-bold">
      <CompassIcon className="h-4 w-4 text-noema-accent" />
      <span>{title}</span>
    </h3>
    <p className="mb-2 mt-1 text-sm text-noema-muted">{description}</p>
    {items.map((item) => (
      <NextStepCard key={item.slug} title={item.titleJa} subtitle={item.subtitle} href={comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug)} />
    ))}
  </section>
);
