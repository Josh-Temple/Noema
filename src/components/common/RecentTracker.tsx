"use client";

import { useEffect } from "react";
import { useRecentItems } from "@/hooks/useRecentItems";

export const RecentTracker = ({ slug }: { slug: string }) => {
  const { addRecent } = useRecentItems();

  useEffect(() => {
    addRecent(slug);
  }, [addRecent, slug]);

  return null;
};
