"use client";

import { SavedSection, SavedEntry } from "@/components/saved/SavedSection";
import { comparisons, themes, thinkers } from "@/lib/content";
import { comparisonPath, themePath, thinkerPath } from "@/lib/routes";
import { useSavedItems } from "@/hooks/useSavedItems";

const savedLookup = (): SavedEntry[] => [
  ...thinkers.map((item) => ({ slug: `thinker:${item.slug}`, title: item.nameJa, href: thinkerPath(item.slug) })),
  ...themes.map((item) => ({ slug: `theme:${item.slug}`, title: item.titleJa, href: themePath(item.slug) })),
  ...comparisons.map((item) => ({ slug: `comparison:${item.slug}`, title: item.titleJa, href: comparisonPath(item.leftThinkerSlug, item.rightThinkerSlug) })),
];

export default function SavedPage() {
  const { savedItems } = useSavedItems();
  const selected = new Set(savedItems.map((item) => `${item.kind}:${item.slug}`));
  const records = savedLookup().filter((item) => selected.has(item.slug));

  return <SavedSection items={records} />;
}
