import { InfoCard } from "@/components/common/InfoCard";

export const ThinkerSummaryCard = ({ title, body }: { title: string; body: string }) => (
  <InfoCard>
    <h3 className="text-xl font-black">{title}</h3>
    <p className="text-noema-muted">{body}</p>
  </InfoCard>
);
