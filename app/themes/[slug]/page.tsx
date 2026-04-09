import { notFound } from "next/navigation";
import { ThemeHero } from "@/components/theme/ThemeHero";
import { ThemeStarterCard } from "@/components/theme/ThemeStarterCard";
import { ThemeReadingOrderCard } from "@/components/theme/ThemeReadingOrderCard";
import { ThemeComparisonList } from "@/components/theme/ThemeComparisonList";
import { ThemeThinkerList } from "@/components/theme/ThemeThinkerList";
import { getThemeBySlug, getThinkersForTheme } from "@/lib/content";
import { getOrderedThemeComparisons } from "@/lib/recommendations";
import { RecentTracker } from "@/components/common/RecentTracker";
import { getComparisonBySlugs, getPriorityThemePathway } from "@/lib/pathways";

export default function ThemePage({ params }: { params: { slug: string } }) {
  const theme = getThemeBySlug(params.slug);
  if (!theme) return notFound();

  const pathway = getPriorityThemePathway(theme.slug);
  const orderedComparisons = getOrderedThemeComparisons(theme.slug);
  const groupedSlugs = new Set(pathway?.groups.flatMap((group) => group.comparisonSlugs) ?? []);
  const groupedComparisons = pathway?.groups.map((group) => ({ ...group, items: getComparisonBySlugs(group.comparisonSlugs) })) ?? [];
  const toReadingSection = (section: { title: string; description?: string; comparisonSlugs: string[] }) => ({
    label: section.title,
    description: section.description,
    items: getComparisonBySlugs(section.comparisonSlugs),
  });
  const readingOrderSections = pathway?.readingOrder ? [toReadingSection(pathway.readingOrder.first)] : [];
  if (pathway?.readingOrder?.next) readingOrderSections.push(toReadingSection(pathway.readingOrder.next));
  if (pathway?.readingOrder?.detour) readingOrderSections.push(toReadingSection(pathway.readingOrder.detour));
  const remainingComparisons = orderedComparisons.filter((comparison) => !groupedSlugs.has(comparison.slug));

  return (
    <div>
      <RecentTracker kind="theme" slug={theme.slug} />
      <ThemeHero theme={theme} />
      <ThemeStarterCard
        eyebrow={pathway?.eyebrow ?? "はじめの一歩"}
        title={pathway?.starterLabel ?? "このテーマの入口"}
        text={pathway?.starterDescription ?? theme.starterGuidance}
        items={getComparisonBySlugs(pathway?.starterComparisonSlugs ?? orderedComparisons.slice(0, 3).map((item) => item.slug))}
      />
      {pathway?.readingOrder ? <ThemeReadingOrderCard readingOrder={pathway.readingOrder} sections={readingOrderSections} /> : null}
      <ThemeComparisonList items={remainingComparisons} groups={groupedComparisons} />
      <ThemeThinkerList items={getThinkersForTheme(theme.slug)} />
    </div>
  );
}
