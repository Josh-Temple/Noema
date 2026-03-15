"use client";

import { useSavedItems } from "@/hooks/useSavedItems";
import { ItemKind } from "@/lib/storage";

export const SaveToggleButton = ({ kind, slug, label }: { kind: ItemKind; slug: string; label: string }) => {
  const { isSaved, toggleSaved } = useSavedItems();
  const saved = isSaved(kind, slug);

  return (
    <button
      type="button"
      onClick={() => toggleSaved(kind, slug)}
      aria-pressed={saved}
      aria-label={`${label}を${saved ? "保存解除" : "保存"}`}
      className="rounded-full border border-[#33457c] bg-[#131c37] px-3 py-1 text-xs text-[#dee6ff] outline-none transition hover:border-noema-accent focus-visible:ring-2 focus-visible:ring-noema-accent"
    >
      {saved ? "保存済み" : "保存"}
    </button>
  );
};
