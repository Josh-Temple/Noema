import { Thinker } from "@/types/content";
import { SaveToggleButton } from "@/components/common/SaveToggleButton";

export const ThinkerHero = ({ thinker }: { thinker: Thinker }) => (
  <section className="mb-4 rounded-card border border-noema-line bg-gradient-to-b from-[#13163a] to-[#0d102f] p-4">
    <div className="flex items-start justify-between gap-3">
      <h2 className="text-3xl font-bold">{thinker.nameJa}</h2>
      <SaveToggleButton kind="thinker" slug={thinker.slug} label={thinker.nameJa} />
    </div>
    <p className="text-noema-muted">
      {thinker.nameEn} / {thinker.eraLabel}
    </p>
    <p className="mt-2 text-noema-muted">{thinker.oneLiner}</p>
  </section>
);
