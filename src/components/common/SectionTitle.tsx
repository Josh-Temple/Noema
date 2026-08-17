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
  <div className={`mb-6 border-l-4 border-noema-accent pl-4 ${className}`}>
    <h2 className="flex items-center gap-2 text-xl font-black tracking-tight text-noema-text">
      <span>{title}</span>
      {icon ? <span className="text-noema-accent" aria-hidden="true">{icon}</span> : null}
    </h2>
    {description ? <p className="mt-2 text-sm leading-relaxed text-noema-muted">{description}</p> : null}
  </div>
);
