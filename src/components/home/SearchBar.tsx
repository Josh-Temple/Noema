import Link from "next/link";
import { SearchIcon } from "@/components/common/icons";

export const SearchBar = () => (
  <Link href="/search" className="group mb-2 flex items-center gap-4 rounded-2xl border border-noema-line bg-white p-5 text-noema-text outline-none shadow-sm transition duration-300 hover:-translate-y-1 hover:border-noema-blue focus-visible:ring-2 focus-visible:ring-noema-accent">
    <span className="rounded-xl bg-noema-blue/10 p-3 text-noema-blue transition duration-300 group-hover:bg-noema-blue/15">
      <SearchIcon className="h-4 w-4" />
    </span>
    <span>
      <span className="block font-black">思想家・テーマ・比較を検索</span>
      <span className="text-sm text-noema-muted">気になる名前や問いからすぐに探せます</span>
    </span>
  </Link>
);
