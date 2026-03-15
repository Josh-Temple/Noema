import { InfoCard } from "@/components/common/InfoCard";

export const ComparisonSummary = ({ text }: { text: string }) => (
  <InfoCard>
    <h3 className="mb-2 text-2xl font-bold">要約</h3>
    <p className="text-noema-muted">{text}</p>
  </InfoCard>
);
