export const InfoCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <article className={`mb-3 border-y border-noema-line/35 bg-[#0f142d]/35 px-1 py-4 sm:px-2 ${className}`}>{children}</article>
);
