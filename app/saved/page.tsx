"use client";

import { StudyShelfSection } from "@/components/saved/StudyShelfSection";
import { useRecentItems } from "@/hooks/useRecentItems";
import { useSavedItems } from "@/hooks/useSavedItems";
import { getSavedStudyGroups } from "@/lib/recommendations";

export default function SavedPage() {
  const { savedItems } = useSavedItems();
  const { recentItems } = useRecentItems();
  const groups = getSavedStudyGroups(savedItems, recentItems);

  return <StudyShelfSection groups={groups} />;
}
