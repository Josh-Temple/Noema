export const SectionTitle = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-3">
    <h2 className="text-3xl font-bold">{title}</h2>
    {description ? <p className="mt-1 leading-relaxed text-noema-muted">{description}</p> : null}
  </div>
);
