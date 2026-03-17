"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookmarkIcon, CompareIcon, HomeIcon, SearchIcon } from "@/components/common/icons";

const navItems = [
  { href: "/", label: "ホーム", icon: HomeIcon },
  { href: "/search", label: "検索", icon: SearchIcon },
  { href: "/compare/descartes/hume", label: "比較", icon: CompareIcon },
  { href: "/saved", label: "保存済み", icon: BookmarkIcon },
];

const isActivePath = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/compare")) return pathname.startsWith("/compare/");
  return pathname.startsWith(href);
};

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="主要ナビゲーション" className="fixed bottom-0 left-1/2 grid w-full max-w-app -translate-x-1/2 grid-cols-4 border-t border-[#50649b66] bg-[#090b21]">
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex flex-col items-center gap-1 py-2 text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-noema-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b21] ${active ? "font-bold text-noema-accent" : "text-[#9ca8c6]"}`}
          >
            <Icon className={`h-5 w-5 ${active ? "text-noema-accent" : "text-[#9ca8c6]"}`} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
