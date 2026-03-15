import Link from "next/link";

export const SearchResultCard = ({ title, subtitle, href }: { title: string; subtitle: string; href: string }) => (
  <Link href={href} className="flex items-center justify-between border-b border-[#253257] py-3">
    <div>
      <p className="font-bold">{title}</p>
      <p className="text-sm text-noema-muted">{subtitle}</p>
    </div>
    <span className="rounded-full border border-[#33457c] bg-[#131c37] px-3 py-1 text-xs text-[#dee6ff]">開く</span>
  </Link>
);
