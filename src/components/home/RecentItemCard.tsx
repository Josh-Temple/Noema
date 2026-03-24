import Link from "next/link";
import { ReactNode } from "react";

export const RecentItemCard = ({ title, subtitle, href, icon }: { title: string; subtitle: string; href: string; icon?: ReactNode }) => (
  <Link href={href} className="mb-2 block rounded-card border border-noema-line/45 bg-[#101631]/70 p-3.5">
    <h4 className="flex items-center gap-2 text-base font-semibold">
      {icon ? <span className="text-noema-accent/80">{icon}</span> : null}
      <span>{title}</span>
    </h4>
    <p className="text-sm text-noema-muted">{subtitle}</p>
  </Link>
);
