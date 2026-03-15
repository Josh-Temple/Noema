"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/search", label: "検索" },
  { href: "/compare/descartes/hume", label: "比較" },
  { href: "/saved", label: "保存済み" },
];

export const BottomNav = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-1/2 grid w-full max-w-app -translate-x-1/2 grid-cols-4 border-t border-[#50649b66] bg-[#090b21]">
      {navItems.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.replace(/\/[^/]+\/[^/]+$/, ""));
        return (
          <Link key={item.href} href={item.href} className={`py-4 text-center text-sm ${active ? "font-bold text-noema-accent" : "text-[#9ca8c6]"}`}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
