import Link from "next/link";
import { ChevronRightIcon, CompassIcon } from "@/components/common/icons";

export const DiscoveryCard = ({ title, body, href }: { title: string; body: string; href: string }) => (
  <Link href={href} className="mb-3 block rounded-card border border-noema-line bg-gradient-to-b from-[#13163a] to-[#0d102f] p-4">
    <p className="mb-1 flex items-center gap-1 text-sm text-[#7f8cff]">
      <CompassIcon className="h-4 w-4" />
      <span>次の比較</span>
    </p>
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-noema-muted">{body}</p>
    <p className="mt-2 flex items-center gap-1 text-xs text-[#b8c5ec]">
      <span>開く</span>
      <ChevronRightIcon className="h-3 w-3" />
    </p>
  </Link>
);
