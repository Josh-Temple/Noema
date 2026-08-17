import Link from "next/link";
import { Comparison } from "@/types/content";
import { comparisonPath } from "@/lib/routes";
import { InfoCard } from "@/components/common/InfoCard";

export const RecommendedComparisonCard = ({ item, primary = false }: { item: Comparison; primary?: boolean }) => (
  <Link href={comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug)}>
    <InfoCard className={primary ? "border-noema-accent/60 shadow-card" : ""}>
      <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-noema-accent">COMPARISON · {primary ? "01" : "NEXT"}</p>
      <p className="mt-2 text-xl font-black text-noema-text">{item.titleJa}</p>
      <p className="mt-1 text-noema-muted">{item.subtitle}</p>
      <p className="mt-4 text-sm leading-7 text-slate-600">なぜ重要？ {item.whyThisComparisonMatters}</p>
      <p className="mt-5 text-xs font-black uppercase tracking-widest text-noema-blue">比較を読む →</p>
    </InfoCard>
  </Link>
);
