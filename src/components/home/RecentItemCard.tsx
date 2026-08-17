import Link from "next/link";
import { ReactNode } from "react";

export const RecentItemCard = ({ title, subtitle, href, icon }: { title: string; subtitle: string; href: string; icon?: ReactNode }) => (
  <Link href={href} className="group block rounded-xl px-3 py-4 transition duration-300 hover:bg-slate-50">
    <h4 className="flex items-center gap-2 text-base font-black">
      {icon ? <span className="text-noema-accent">{icon}</span> : null}
      <span>{title}</span>
    </h4>
    <p className="text-sm text-noema-muted">{subtitle}</p>
  </Link>
);
