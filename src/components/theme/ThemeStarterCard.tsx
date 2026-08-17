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
    <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-noema-yellow">{eyebrow}</p>
    <h3 className="flex items-center gap-2 text-xl font-black">
      <CompassIcon className="h-5 w-5 text-noema-yellow" />
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
