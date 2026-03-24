export const InfoCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <article className={`mb-3 rounded-card border border-noema-line/70 bg-gradient-to-b from-[#13163a] to-[#0d102f] p-4 ${className}`}>{children}</article>
);
