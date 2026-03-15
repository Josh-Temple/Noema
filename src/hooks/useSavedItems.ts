"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS, loadStringArray, saveStringArray } from "@/lib/storage";

export const useSavedItems = () => {
  const [savedItems, setSavedItems] = useState<string[]>([]);

  useEffect(() => {
    setSavedItems(loadStringArray(STORAGE_KEYS.saved));
  }, []);

  const toggleSaved = useCallback((slug: string) => {
    setSavedItems((prev) => {
      const next = prev.includes(slug) ? prev.filter((item) => item !== slug) : [slug, ...prev];
      saveStringArray(STORAGE_KEYS.saved, next);
      return next;
    });
  }, []);

  return useMemo(
    () => ({
      savedItems,
      toggleSaved,
      isSaved: (slug: string) => savedItems.includes(slug),
    }),
    [savedItems, toggleSaved],
  );
};
