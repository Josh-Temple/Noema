"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ItemKind, STORAGE_KEYS, StoredItem, loadStoredItems, saveStoredItems, toggleSavedItem } from "@/lib/storage";

export const useSavedItems = () => {
  const [savedItems, setSavedItems] = useState<StoredItem[]>([]);

  useEffect(() => {
    setSavedItems(loadStoredItems(STORAGE_KEYS.saved));
  }, []);

  const toggleSaved = useCallback((kind: ItemKind, slug: string) => {
    setSavedItems((prev) => {
      const next = toggleSavedItem(prev, { kind, slug });
      saveStoredItems(STORAGE_KEYS.saved, next);
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (kind: ItemKind, slug: string) => savedItems.some((item) => item.kind === kind && item.slug === slug),
    [savedItems],
  );

  return useMemo(
    () => ({
      savedItems,
      toggleSaved,
      isSaved,
    }),
    [savedItems, toggleSaved, isSaved],
  );
};
