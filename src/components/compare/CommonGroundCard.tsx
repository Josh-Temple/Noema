import { InfoCard } from "@/components/common/InfoCard";

export const CommonGroundCard = ({ text }: { text: string }) => (
  <InfoCard className="border-[#3a49a1] bg-gradient-to-b from-[#171f46] to-[#101538]">
    <h3 className="mb-2 text-2xl font-bold">共通点</h3>
    <p className="text-noema-muted">{text}</p>
  </InfoCard>
);
