import { InfoCard } from "@/components/common/InfoCard";
import { CompassIcon } from "@/components/common/icons";

export const ThemeStarterCard = ({ text }: { text: string }) => (
  <InfoCard>
    <h3 className="flex items-center gap-2 text-xl font-bold"><CompassIcon className="h-5 w-5 text-noema-accent" /><span>はじめの一歩</span></h3>
    <p className="text-noema-muted">{text}</p>
  </InfoCard>
);
