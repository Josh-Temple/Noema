import Link from "next/link";
import { ReactNode } from "react";

export const RecentItemCard = ({ title, subtitle, href, icon }: { title: string; subtitle: string; href: string; icon?: ReactNode }) => (
  <Link href={href} className="group block rounded-md px-1.5 py-2.5 transition hover:bg-white/[0.02]">
    <h4 className="flex items-center gap-2 text-base font-semibold">
      {icon ? <span className="text-noema-accent/70">{icon}</span> : null}
      <span>{title}</span>
    </h4>
    <p className="text-sm text-noema-muted">{subtitle}</p>
  </Link>
);
