"use client";

import { useCallback, useEffect, useState } from "react";
import { ItemKind, STORAGE_KEYS, StoredItem, addRecentItem, loadStoredItems, saveStoredItems } from "@/lib/storage";

export const useRecentItems = () => {
  const [recentItems, setRecentItems] = useState<StoredItem[]>([]);

  useEffect(() => {
    setRecentItems(loadStoredItems(STORAGE_KEYS.recent));
  }, []);

  const addRecent = useCallback((kind: ItemKind, slug: string) => {
    setRecentItems((prev) => {
      const next = addRecentItem(prev, { kind, slug });
      saveStoredItems(STORAGE_KEYS.recent, next);
      return next;
    });
  }, []);

  return { recentItems, addRecent };
};
