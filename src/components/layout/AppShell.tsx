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
    <div className="min-h-screen w-full bg-noema-bg pb-24">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-noema-text focus:px-4 focus:py-3 focus:text-white">
        メインコンテンツへスキップ
      </a>
      <PageHeader title={titleForPath(pathname)} />
      <main id="main-content" className="mx-auto w-full max-w-app px-6 pb-16 pt-8 lg:max-w-archive lg:px-10">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};
