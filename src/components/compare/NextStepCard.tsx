import Link from "next/link";

export const NextStepCard = ({ title, href, subtitle }: { title: string; href: string; subtitle?: string }) => (
  <Link href={href} className="mb-2 block rounded-card border border-noema-line bg-gradient-to-b from-[#13163a] to-[#0d102f] p-3 text-noema-muted">
    <p>{title}</p>
    {subtitle ? <p className="mt-1 text-xs text-[#aebbe5]">{subtitle}</p> : null}
  </Link>
);
