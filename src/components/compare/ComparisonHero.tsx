import { Comparison, Thinker } from "@/types/content";
import { TagChip } from "@/components/common/TagChip";
import { SaveToggleButton } from "@/components/common/SaveToggleButton";
import { ThemeIcon } from "@/components/common/icons";

export const ComparisonHero = ({ comparison, left, right }: { comparison: Comparison; left: Thinker; right: Thinker }) => (
  <section aria-labelledby="comparison-title" className="mb-5 rounded-card border border-noema-line bg-gradient-to-b from-[#13163a] to-[#0d102f] p-4">
    <div className="flex items-start justify-between gap-3">
      <p className="text-noema-muted">思索の比較</p>
      <SaveToggleButton kind="comparison" slug={comparison.slug} label={comparison.titleJa} />
    </div>
    <div className="my-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2" aria-label="比較対象の思想家">
      <div className="rounded-xl border border-[#2e3f73] border-l-4 border-l-[#4d61ff] bg-[#121a34] p-2">
        <strong>{left.nameJa}</strong>
      </div>
      <span className="text-noema-accent">VS</span>
      <div className="rounded-xl border border-[#2e3f73] border-r-4 border-r-[#9ca7c8] bg-[#121a34] p-2 text-right">
        <strong>{right.nameJa}</strong>
      </div>
    </div>
    <h2 id="comparison-title" className="text-3xl font-bold">
      {comparison.titleJa}
    </h2>
    <p className="text-noema-muted">{comparison.subtitle}</p>
    <div className="mt-3 flex flex-wrap gap-2">{comparison.themeSlugs.map((slug) => <TagChip key={slug} label={slug} icon={<ThemeIcon className="h-3 w-3" />} />)}</div>
  </section>
);
