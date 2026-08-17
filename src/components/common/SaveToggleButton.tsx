"use client";

import { BookmarkIcon } from "@/components/common/icons";
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
      className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-noema-line bg-white px-3 py-2 text-xs font-bold text-noema-text outline-none shadow-sm transition duration-300 hover:border-noema-accent hover:text-noema-accent active:scale-95 focus-visible:ring-2 focus-visible:ring-noema-accent"
    >
      <BookmarkIcon className="h-3 w-3" />
      <span>{saved ? "保存済み" : "保存"}</span>
    </button>
  );
};
