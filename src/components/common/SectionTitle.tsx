import { ReactNode } from "react";

export const SectionTitle = ({ title, description, icon }: { title: string; description?: string; icon?: ReactNode }) => (
  <div className="mb-3">
    <h2 className="flex items-center gap-2 text-3xl font-bold">
      {icon ? <span className="text-noema-accent">{icon}</span> : null}
      <span>{title}</span>
    </h2>
    {description ? <p className="mt-1 leading-relaxed text-noema-muted">{description}</p> : null}
  </div>
);
