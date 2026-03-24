import Link from "next/link";
import { Comparison } from "@/types/content";
import { comparisonPath } from "@/lib/routes";
import { InfoCard } from "@/components/common/InfoCard";

export const RecommendedComparisonCard = ({ item, primary = false }: { item: Comparison; primary?: boolean }) => (
  <Link href={comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug)}>
    <InfoCard className={primary ? "border-noema-line/55 bg-[#131a38]/55" : "border-noema-line/25 bg-[#0f142d]/25"}>
      <p className="font-bold text-[#d4daf0]">{item.titleJa}</p>
      <p className="mt-1 text-noema-muted">{item.subtitle}</p>
      <p className="mt-2 text-sm text-[#c8d0eb]">なぜ重要？ {item.whyThisComparisonMatters}</p>
    </InfoCard>
  </Link>
);
