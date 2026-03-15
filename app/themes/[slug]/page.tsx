import { notFound } from "next/navigation";
import { ThemeHero } from "@/components/theme/ThemeHero";
import { ThemeStarterCard } from "@/components/theme/ThemeStarterCard";
import { ThemeComparisonList } from "@/components/theme/ThemeComparisonList";
import { ThemeThinkerList } from "@/components/theme/ThemeThinkerList";
import { getComparisonsForTheme, getThemeBySlug, getThinkersForTheme } from "@/lib/content";

export default function ThemePage({ params }: { params: { slug: string } }) {
  const theme = getThemeBySlug(params.slug);
  if (!theme) return notFound();

  return (
    <div>
      <ThemeHero theme={theme} />
      <ThemeStarterCard text={theme.starterGuidance} />
      <ThemeComparisonList items={getComparisonsForTheme(theme.slug)} />
      <ThemeThinkerList items={getThinkersForTheme(theme.slug)} />
    </div>
  );
}
