import { ReactNode } from "react";

export const TagChip = ({ label, icon }: { label: string; icon?: ReactNode }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-noema-line bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600 transition duration-300 hover:border-noema-blue hover:text-noema-blue">
    {icon ? <span className="text-noema-blue">{icon}</span> : null}
    <span>{label}</span>
  </span>
);
