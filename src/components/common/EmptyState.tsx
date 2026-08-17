import { ReactNode } from "react";

export const EmptyState = ({ title, body, icon }: { title: string; body: string; icon?: ReactNode }) => (
  <div className="rounded-2xl border border-dashed border-noema-line bg-slate-50 p-6 text-center">
    {icon ? <div className="mb-2 inline-flex text-noema-accent">{icon}</div> : null}
    <h3 className="mb-2 text-xl font-bold">{title}</h3>
    <p className="leading-relaxed text-noema-muted">{body}</p>
  </div>
);
