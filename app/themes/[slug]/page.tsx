import { notFound } from "next/navigation";
import { ThemeHero } from "@/components/theme/ThemeHero";
import { ThemeStarterCard } from "@/components/theme/ThemeStarterCard";
import { ThemeComparisonList } from "@/components/theme/ThemeComparisonList";
import { ThemeThinkerList } from "@/components/theme/ThemeThinkerList";
import { getThemeBySlug, getThinkersForTheme } from "@/lib/content";
import { getOrderedThemeComparisons } from "@/lib/recommendations";
import { RecentTracker } from "@/components/common/RecentTracker";

export default function ThemePage({ params }: { params: { slug: string } }) {
  const theme = getThemeBySlug(params.slug);
  if (!theme) return notFound();

  return (
    <div>
      <RecentTracker kind="theme" slug={theme.slug} />
      <ThemeHero theme={theme} />
      <ThemeStarterCard text={theme.starterGuidance} />
      <ThemeComparisonList items={getOrderedThemeComparisons(theme.slug)} />
      <ThemeThinkerList items={getThinkersForTheme(theme.slug)} />
    </div>
  );
}
