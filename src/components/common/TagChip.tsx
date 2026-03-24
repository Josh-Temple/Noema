import { ReactNode } from "react";

export const TagChip = ({ label, icon }: { label: string; icon?: ReactNode }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-[#172240]/65 px-2.5 py-1.5 text-xs text-[#cad7fb] transition hover:bg-[#1c2a4f]">
    {icon ? <span className="text-[#aebde8]">{icon}</span> : null}
    <span>{label}</span>
  </span>
);
