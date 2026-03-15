import { ComparisonSection } from "@/types/content";

export const ComparisonSectionCard = ({ section }: { section: ComparisonSection }) => (
  <div className="mb-3 rounded-card border border-noema-line bg-gradient-to-b from-[#13163a] to-[#0d102f] p-4">
    <h4 className="mb-2 text-xl font-bold">{section.title}</h4>
    <div className="grid gap-2 md:grid-cols-2">
      <p className="rounded-lg border-l-4 border-l-[#4d61ff] bg-[#0f1533] p-3 text-noema-muted">{section.leftView}</p>
      <p className="rounded-lg border-r-4 border-r-[#a8b0ca] bg-[#0f1533] p-3 text-noema-muted">{section.rightView}</p>
    </div>
    <p className="mt-2 text-sm text-[#c8d0eb]">{section.takeaway}</p>
  </div>
);
