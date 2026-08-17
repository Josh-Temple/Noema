import { InfoCard } from "@/components/common/InfoCard";

export const ComparisonSummary = ({ text }: { text: string }) => (
  <InfoCard>
    <p className="mb-2 text-[0.65rem] font-black uppercase tracking-widest text-noema-blue">SUMMARY</p>
    <h3 className="mb-2 text-2xl font-black">要約</h3>
    <p className="text-noema-muted">{text}</p>
  </InfoCard>
);
