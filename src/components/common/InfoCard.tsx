export const InfoCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <article className={`mb-5 rounded-2xl border border-noema-line bg-white p-5 shadow-sm ${className}`}>{children}</article>
);
