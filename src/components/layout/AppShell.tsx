"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageHeader } from "@/components/common/PageHeader";

const titleForPath = (pathname: string) => {
  if (pathname.startsWith("/search")) return "検索";
  if (pathname.startsWith("/compare")) return "比較";
  if (pathname.startsWith("/saved")) return "保存済み";
  if (pathname.startsWith("/themes")) return "テーマ";
  if (pathname.startsWith("/thinkers")) return "思想家";
  return "ホーム";
};

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="mx-auto min-h-screen w-full max-w-app border-x border-[#1a2045] bg-gradient-to-b from-[#0f1030] to-noema-bg pb-24">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-[#090b21] focus:px-3 focus:py-2 focus:text-noema-text">
        メインコンテンツへスキップ
      </a>
      <PageHeader title={titleForPath(pathname)} />
      <main id="main-content" className="px-4 pt-4">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};
