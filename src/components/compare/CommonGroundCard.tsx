import { InfoCard } from "@/components/common/InfoCard";

export const CommonGroundCard = ({ text }: { text: string }) => (
  <InfoCard className="border-noema-blue/50 border-l-4 border-l-noema-blue">
    <p className="mb-2 text-[0.65rem] font-black uppercase tracking-widest text-noema-blue">COMMON GROUND</p>
    <h3 className="mb-2 text-2xl font-black">共通点</h3>
    <p className="text-noema-muted">{text}</p>
  </InfoCard>
);
