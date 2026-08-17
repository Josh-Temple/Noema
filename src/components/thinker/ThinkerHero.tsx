import { Thinker } from "@/types/content";
import { SaveToggleButton } from "@/components/common/SaveToggleButton";

export const ThinkerHero = ({ thinker }: { thinker: Thinker }) => (
  <section className="mb-8 rounded-2xl border border-noema-line border-t-4 border-t-noema-accent bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.2em] text-noema-accent">THINKER</p>
        <h2 className="text-3xl font-black tracking-tight">{thinker.nameJa}</h2>
      </div>
      <SaveToggleButton kind="thinker" slug={thinker.slug} label={thinker.nameJa} />
    </div>
    <p className="text-noema-muted">
      {thinker.nameEn} / {thinker.eraLabel}
    </p>
    <p className="mt-2 text-noema-muted">{thinker.oneLiner}</p>
  </section>
);
