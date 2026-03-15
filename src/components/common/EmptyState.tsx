export const EmptyState = ({ title, body }: { title: string; body: string }) => (
  <div className="rounded-card border border-dashed border-[#32477f] bg-[#101633] p-5 text-center">
    <h3 className="mb-2 text-xl font-bold">{title}</h3>
    <p className="leading-relaxed text-noema-muted">{body}</p>
  </div>
);
