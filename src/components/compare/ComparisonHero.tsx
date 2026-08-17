import { Comparison, Thinker } from "@/types/content";
import { TagChip } from "@/components/common/TagChip";
import { SaveToggleButton } from "@/components/common/SaveToggleButton";
import { ThemeIcon } from "@/components/common/icons";

export const ComparisonHero = ({ comparison, left, right }: { comparison: Comparison; left: Thinker; right: Thinker }) => (
  <section aria-labelledby="comparison-title" className="mb-8 rounded-2xl border border-noema-line border-t-4 border-t-noema-blue bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-noema-blue">COMPARISON</p>
      <SaveToggleButton kind="comparison" slug={comparison.slug} label={comparison.titleJa} />
    </div>
    <div className="my-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2" aria-label="比較対象の思想家">
      <div className="rounded-xl border border-noema-line border-l-4 border-l-noema-accent bg-slate-50 p-3">
        <strong>{left.nameJa}</strong>
      </div>
      <span className="text-noema-accent">VS</span>
      <div className="rounded-xl border border-noema-line border-r-4 border-r-noema-blue bg-slate-50 p-3 text-right">
        <strong>{right.nameJa}</strong>
      </div>
    </div>
    <h2 id="comparison-title" className="text-3xl font-black tracking-tight">
      {comparison.titleJa}
    </h2>
    <p className="text-noema-muted">{comparison.subtitle}</p>
    <div className="mt-3 flex flex-wrap gap-2">{comparison.themeSlugs.map((slug) => <TagChip key={slug} label={slug} icon={<ThemeIcon className="h-3 w-3" />} />)}</div>
  </section>
);
