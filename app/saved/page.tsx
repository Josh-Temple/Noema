"use client";

import { StudyShelfSection } from "@/components/saved/StudyShelfSection";
import { ResumeLearningSection } from "@/components/saved/ResumeLearningSection";
import { useRecentItems } from "@/hooks/useRecentItems";
import { useSavedItems } from "@/hooks/useSavedItems";
import { getSavedResumeGroups, getSavedStudyGroups } from "@/lib/recommendations";

export default function SavedPage() {
  const { savedItems } = useSavedItems();
  const { recentItems } = useRecentItems();
  const resumeGroups = getSavedResumeGroups(savedItems, recentItems);
  const groups = getSavedStudyGroups(savedItems, recentItems);

  return (
    <div>
      <ResumeLearningSection groups={resumeGroups} />
      <StudyShelfSection groups={groups} />
    </div>
  );
}
