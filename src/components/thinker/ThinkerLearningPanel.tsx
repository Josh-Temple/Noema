"use client";

import { useRecentItems } from "@/hooks/useRecentItems";
import { useSavedItems } from "@/hooks/useSavedItems";
import { getThinkerLearningSuggestions } from "@/lib/recommendations";
import { ThinkerLearningModule } from "@/components/thinker/ThinkerLearningModule";

export const ThinkerLearningPanel = ({ thinkerSlug }: { thinkerSlug: string }) => {
  const { recentItems } = useRecentItems();
  const { savedItems } = useSavedItems();

  return <ThinkerLearningModule items={getThinkerLearningSuggestions(thinkerSlug, recentItems, savedItems)} />;
};
