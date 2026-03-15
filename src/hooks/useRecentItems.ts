"use client";

import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEYS, loadStringArray, saveStringArray } from "@/lib/storage";

const RECENT_LIMIT = 10;

export const useRecentItems = () => {
  const [recentItems, setRecentItems] = useState<string[]>([]);

  useEffect(() => {
    setRecentItems(loadStringArray(STORAGE_KEYS.recent));
  }, []);

  const addRecent = useCallback((slug: string) => {
    setRecentItems((prev) => {
      const next = [slug, ...prev.filter((item) => item !== slug)].slice(0, RECENT_LIMIT);
      saveStringArray(STORAGE_KEYS.recent, next);
      return next;
    });
  }, []);

  return { recentItems, addRecent };
};
