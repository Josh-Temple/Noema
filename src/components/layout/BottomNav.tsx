"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/search", label: "検索" },
  { href: "/compare/descartes/hume", label: "比較" },
  { href: "/saved", label: "保存済み" },
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

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`py-4 text-center text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-noema-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b21] ${active ? "font-bold text-noema-accent" : "text-[#9ca8c6]"}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
