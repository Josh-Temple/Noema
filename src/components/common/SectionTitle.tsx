import { ReactNode } from "react";

export const SectionTitle = ({
  title,
  description,
  icon,
  className = "",
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}) => (
  <div className={`mb-3 ${className}`}>
    <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
      {icon ? <span className="text-noema-accent/80">{icon}</span> : null}
      <span>{title}</span>
    </h2>
    {description ? <p className="mt-1 text-sm leading-relaxed text-noema-muted/90">{description}</p> : null}
  </div>
);
