"use client";

import { useEffect } from "react";
import { useRecentItems } from "@/hooks/useRecentItems";
import { ItemKind } from "@/lib/storage";

export const RecentTracker = ({ kind, slug }: { kind: ItemKind; slug: string }) => {
  const { addRecent } = useRecentItems();

  useEffect(() => {
    addRecent(kind, slug);
  }, [addRecent, kind, slug]);

  return null;
};
