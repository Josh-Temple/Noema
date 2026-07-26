"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { ItemKind, STORAGE_KEYS, getStoredItemsServerSnapshot, getStoredItemsSnapshot, subscribeToStoredItems, toggleSavedItem, updateStoredItems } from "@/lib/storage";

export const useSavedItems = () => {
  const savedItems = useSyncExternalStore(
    (listener) => subscribeToStoredItems(STORAGE_KEYS.saved, listener),
    () => getStoredItemsSnapshot(STORAGE_KEYS.saved),
    getStoredItemsServerSnapshot,
  );

  const toggleSaved = useCallback((kind: ItemKind, slug: string) => {
    updateStoredItems(STORAGE_KEYS.saved, (items) => toggleSavedItem(items, { kind, slug }));
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
