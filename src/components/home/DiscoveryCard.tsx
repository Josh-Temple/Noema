import Link from "next/link";
import { ChevronRightIcon, CompassIcon } from "@/components/common/icons";

export const DiscoveryCard = ({ title, body, href }: { title: string; body: string; href: string }) => (
  <Link href={href} className="group block rounded-2xl border border-noema-line bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-noema-yellow">
    <p className="mb-2 flex items-center gap-1 text-[0.65rem] font-black uppercase tracking-widest text-noema-yellow">
      <CompassIcon className="h-3.5 w-3.5" />
      <span>次の比較</span>
    </p>
    <h3 className="text-lg font-black">{title}</h3>
    <p className="text-sm text-noema-muted">{body}</p>
    <p className="mt-4 flex items-center gap-1 text-xs font-black uppercase tracking-widest text-noema-blue">
      <span>開く</span>
      <ChevronRightIcon className="h-3 w-3" />
    </p>
  </Link>
);
