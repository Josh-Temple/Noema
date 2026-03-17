import Link from "next/link";
import { ReactNode } from "react";

export const RecentItemCard = ({ title, subtitle, href, icon }: { title: string; subtitle: string; href: string; icon?: ReactNode }) => (
  <Link href={href} className="mb-3 block rounded-card border border-noema-line bg-gradient-to-b from-[#13163a] to-[#0d102f] p-4">
    <h4 className="flex items-center gap-2 text-lg font-bold">
      {icon ? <span className="text-noema-accent">{icon}</span> : null}
      <span>{title}</span>
    </h4>
    <p className="text-noema-muted">{subtitle}</p>
  </Link>
);
