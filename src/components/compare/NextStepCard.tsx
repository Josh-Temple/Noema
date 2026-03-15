import Link from "next/link";

export const NextStepCard = ({ title, href }: { title: string; href: string }) => (
  <Link href={href} className="mb-2 block rounded-card border border-noema-line bg-gradient-to-b from-[#13163a] to-[#0d102f] p-3 text-noema-muted">
    {title}
  </Link>
);
