import { InfoCard } from "@/components/common/InfoCard";

export const ThemeStarterCard = ({ text }: { text: string }) => (
  <InfoCard>
    <h3 className="text-xl font-bold">はじめの一歩</h3>
    <p className="text-noema-muted">{text}</p>
  </InfoCard>
);
