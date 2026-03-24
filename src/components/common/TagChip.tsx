import { ReactNode } from "react";

export const TagChip = ({ label, icon }: { label: string; icon?: ReactNode }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-[#16203b]/55 px-2.5 py-1 text-xs text-[#b9c6ea] transition hover:bg-[#1a2644]">
    {icon ? <span className="text-[#aebde8]">{icon}</span> : null}
    <span>{label}</span>
  </span>
);
