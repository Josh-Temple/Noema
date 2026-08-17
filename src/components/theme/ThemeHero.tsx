import { Theme } from "@/types/content";
import { SaveToggleButton } from "@/components/common/SaveToggleButton";

export const ThemeHero = ({ theme }: { theme: Theme }) => (
  <section className="mb-8 rounded-2xl border border-noema-line border-t-4 border-t-noema-yellow bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.2em] text-noema-yellow">THEME</p>
        <h2 className="text-3xl font-black tracking-tight">{theme.titleJa}</h2>
      </div>
      <SaveToggleButton kind="theme" slug={theme.slug} label={theme.titleJa} />
    </div>
    <p className="text-noema-muted">{theme.shortDescription}</p>
  </section>
);
