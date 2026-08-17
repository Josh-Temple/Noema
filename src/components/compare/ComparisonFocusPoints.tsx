export const ComparisonFocusPoints = ({ items }: { items: string[] }) => (
  <section className="mb-8">
    <h3 className="mb-4 border-l-4 border-noema-yellow pl-4 text-xl font-black">この比較で見るポイント</h3>
    <ol className="space-y-3">
      {items.map((item) => (
        <li key={item} className="rounded-xl border border-noema-line bg-white p-4 text-slate-700 shadow-sm">{item}</li>
      ))}
    </ol>
  </section>
);
