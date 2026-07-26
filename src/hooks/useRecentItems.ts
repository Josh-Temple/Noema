"use client";

import { useCallback, useSyncExternalStore } from "react";
import { ItemKind, STORAGE_KEYS, addRecentItem, getStoredItemsServerSnapshot, getStoredItemsSnapshot, subscribeToStoredItems, updateStoredItems } from "@/lib/storage";

export const useRecentItems = () => {
  const recentItems = useSyncExternalStore(
    (listener) => subscribeToStoredItems(STORAGE_KEYS.recent, listener),
    () => getStoredItemsSnapshot(STORAGE_KEYS.recent),
    getStoredItemsServerSnapshot,
  );

  const addRecent = useCallback((kind: ItemKind, slug: string) => {
    updateStoredItems(STORAGE_KEYS.recent, (items) => addRecentItem(items, { kind, slug }));
  }, []);

  return { recentItems, addRecent };
};
