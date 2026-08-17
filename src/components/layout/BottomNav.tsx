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
    <nav aria-label="主要ナビゲーション" className="fixed bottom-0 left-1/2 z-30 grid min-h-[68px] w-full max-w-app -translate-x-1/2 grid-cols-4 border-t border-noema-line bg-white/95 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur lg:max-w-archive">
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-[68px] flex-col items-center justify-center gap-1 text-xs outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-noema-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white ${active ? "font-bold text-noema-accent" : "text-slate-500"}`}
          >
            <Icon className={`h-5 w-5 ${active ? "text-noema-accent" : "text-slate-400"}`} />
            <span className={`h-1 w-1 rounded-full ${active ? "bg-noema-accent" : "bg-transparent"}`} aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
