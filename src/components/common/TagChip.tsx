import { ReactNode } from "react";

export const TagChip = ({ label, icon }: { label: string; icon?: ReactNode }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-[#2b3a68] bg-[#1b2744] px-3 py-2 text-sm text-[#dce5fd]">
    {icon ? <span className="text-[#b8c7f0]">{icon}</span> : null}
    <span>{label}</span>
  </span>
);
