import { ReactNode } from "react";

export const EmptyState = ({ title, body, icon }: { title: string; body: string; icon?: ReactNode }) => (
  <div className="border-y border-dashed border-[#32477f] bg-[#101633]/35 p-5 text-center">
    {icon ? <div className="mb-2 inline-flex text-noema-accent">{icon}</div> : null}
    <h3 className="mb-2 text-xl font-bold">{title}</h3>
    <p className="leading-relaxed text-noema-muted">{body}</p>
  </div>
);
