import { ComparisonSection } from "@/types/content";

export const ComparisonSectionCard = ({ section }: { section: ComparisonSection }) => (
  <div className="mb-5 rounded-2xl border border-noema-line bg-white p-5 shadow-sm">
    <h4 className="mb-4 border-l-4 border-noema-accent pl-4 text-xl font-black">{section.title}</h4>
    <div className="grid gap-2 md:grid-cols-2" aria-label={`${section.title}の左右比較`}>
      <article className="rounded-xl border border-noema-line border-l-4 border-l-noema-accent bg-slate-50 px-4 py-4">
        <p className="mb-1 text-[0.65rem] font-black uppercase tracking-widest text-noema-accent">左の立場</p>
        <p className="text-noema-muted">{section.leftView}</p>
      </article>
      <article className="rounded-xl border border-noema-line border-l-4 border-l-noema-blue bg-slate-50 px-4 py-4">
        <p className="mb-1 text-[0.65rem] font-black uppercase tracking-widest text-noema-blue">右の立場</p>
        <p className="text-noema-muted">{section.rightView}</p>
      </article>
    </div>
    <p className="mt-4 text-sm leading-7 text-slate-600">
      <span className="font-black text-noema-text">差分の要点: </span>
      {section.takeaway}
    </p>
  </div>
);
