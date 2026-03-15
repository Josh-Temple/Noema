import { ComparisonSection } from "@/types/content";

export const ComparisonSectionCard = ({ section }: { section: ComparisonSection }) => (
  <div className="mb-3 rounded-card border border-noema-line bg-gradient-to-b from-[#13163a] to-[#0d102f] p-4">
    <h4 className="mb-2 text-xl font-bold">{section.title}</h4>
    <div className="grid gap-2 md:grid-cols-2" aria-label={`${section.title}の左右比較`}>
      <article className="rounded-lg border-l-4 border-l-[#4d61ff] bg-[#0f1533] p-3">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#9fb0ff]">左の立場</p>
        <p className="text-noema-muted">{section.leftView}</p>
      </article>
      <article className="rounded-lg border-r-4 border-r-[#a8b0ca] bg-[#0f1533] p-3">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#d3d8eb]">右の立場</p>
        <p className="text-noema-muted">{section.rightView}</p>
      </article>
    </div>
    <p className="mt-2 text-sm leading-relaxed text-[#c8d0eb]">
      <span className="font-semibold text-[#e3e8fb]">差分の要点: </span>
      {section.takeaway}
    </p>
  </div>
);
