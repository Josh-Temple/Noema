import { Theme } from "@/types/content";
import { SaveToggleButton } from "@/components/common/SaveToggleButton";

export const ThemeHero = ({ theme }: { theme: Theme }) => (
  <section className="mb-4 rounded-card border border-noema-line bg-gradient-to-b from-[#13163a] to-[#0d102f] p-4">
    <div className="flex items-start justify-between gap-3">
      <h2 className="text-3xl font-bold">{theme.titleJa}</h2>
      <SaveToggleButton kind="theme" slug={theme.slug} label={theme.titleJa} />
    </div>
    <p className="text-noema-muted">{theme.shortDescription}</p>
  </section>
);
