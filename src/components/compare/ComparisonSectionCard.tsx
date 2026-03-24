import { ComparisonSection } from "@/types/content";

export const ComparisonSectionCard = ({ section }: { section: ComparisonSection }) => (
  <div className="mb-4 border-y border-noema-line/35 bg-[#0f142d]/25 py-4">
    <h4 className="mb-2 text-xl font-bold">{section.title}</h4>
    <div className="grid gap-2 md:grid-cols-2" aria-label={`${section.title}の左右比較`}>
      <article className="border-l-2 border-l-[#5f72ff] bg-[#111735]/35 px-3 py-2.5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#9fb0ff]">左の立場</p>
        <p className="text-noema-muted">{section.leftView}</p>
      </article>
      <article className="border-l-2 border-l-[#acb6d5] bg-[#111735]/35 px-3 py-2.5">
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
