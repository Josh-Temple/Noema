import Link from "next/link";

export const RecentItemCard = ({ title, subtitle, href }: { title: string; subtitle: string; href: string }) => (
  <Link href={href} className="mb-3 block rounded-card border border-noema-line bg-gradient-to-b from-[#13163a] to-[#0d102f] p-4">
    <h4 className="text-lg font-bold">{title}</h4>
    <p className="text-noema-muted">{subtitle}</p>
  </Link>
);
