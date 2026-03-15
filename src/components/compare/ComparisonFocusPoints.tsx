export const ComparisonFocusPoints = ({ items }: { items: string[] }) => (
  <section className="mb-5">
    <h3 className="mb-2 text-2xl font-bold">この比較で見るポイント</h3>
    <ol className="space-y-2">
      {items.map((item) => (
        <li key={item} className="rounded-xl border border-[#26345e] bg-[#0f1533] p-3">{item}</li>
      ))}
    </ol>
  </section>
);
