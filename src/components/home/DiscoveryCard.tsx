import Link from "next/link";
import { ChevronRightIcon, CompassIcon } from "@/components/common/icons";

export const DiscoveryCard = ({ title, body, href }: { title: string; body: string; href: string }) => (
  <Link href={href} className="mb-2 block rounded-card border border-noema-line/45 bg-[#101631]/70 p-3.5">
    <p className="mb-1 flex items-center gap-1 text-xs text-[#8f9acd]">
      <CompassIcon className="h-3.5 w-3.5" />
      <span>次の比較</span>
    </p>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-sm text-noema-muted">{body}</p>
    <p className="mt-2 flex items-center gap-1 text-xs text-[#b8c5ec]">
      <span>開く</span>
      <ChevronRightIcon className="h-3 w-3" />
    </p>
  </Link>
);
