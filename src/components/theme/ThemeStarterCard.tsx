import { InfoCard } from "@/components/common/InfoCard";
import { CompassIcon } from "@/components/common/icons";
import { NextStepCard } from "@/components/compare/NextStepCard";
import { Comparison } from "@/types/content";
import { comparisonPath } from "@/lib/routes";

export const ThemeStarterCard = ({
  eyebrow,
  title,
  text,
  items,
}: {
  eyebrow: string;
  title: string;
  text: string;
  items: Comparison[];
}) => (
  <InfoCard>
    <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#8ea3e6]">{eyebrow}</p>
    <h3 className="flex items-center gap-2 text-xl font-bold">
      <CompassIcon className="h-5 w-5 text-noema-accent" />
      <span>{title}</span>
    </h3>
    <p className="mb-3 text-noema-muted">{text}</p>
    <div>
      {items.map((item) => (
        <NextStepCard key={item.slug} title={item.titleJa} subtitle={item.subtitle} href={comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug)} />
      ))}
    </div>
  </InfoCard>
);
