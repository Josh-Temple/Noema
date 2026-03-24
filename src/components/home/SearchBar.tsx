import Link from "next/link";
import { SearchIcon } from "@/components/common/icons";

export const SearchBar = () => (
  <Link href="/search" className="mb-7 flex items-center gap-3 rounded-card border border-noema-line/35 bg-[#141c37]/82 p-4 text-noema-text outline-none transition hover:bg-[#182247] focus-visible:ring-2 focus-visible:ring-noema-accent">
    <span className="rounded-full bg-[#111b37]/90 p-2 text-[#d9e2ff]">
      <SearchIcon className="h-4 w-4" />
    </span>
    <span>
      <span className="block font-semibold">思想家・テーマ・比較を検索</span>
      <span className="text-sm text-noema-muted">気になる名前や問いからすぐに探せます</span>
    </span>
  </Link>
);
