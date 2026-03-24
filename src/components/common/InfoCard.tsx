export const InfoCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <article className={`mb-3 rounded-card border border-noema-line/55 bg-gradient-to-b from-[#121736] to-[#0d122c] p-4 ${className}`}>{children}</article>
);
