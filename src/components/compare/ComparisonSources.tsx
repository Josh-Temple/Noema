import { SourceReference } from "@/components/common/SourceReference";
import { getSourcesByIds } from "@/lib/content";

export const ComparisonSources = ({ sourceIds }: { sourceIds?: string[] }) => {
  const sources = getSourcesByIds(sourceIds);
  if (!sources.length) return null;
  const groups = [["一次資料", sources.filter((source) => source.workType === "primary")], ["参考資料", sources.filter((source) => source.workType !== "primary")]] as const;
  return (
    <section className="mb-6 border-t border-noema-line pt-4" aria-labelledby="comparison-sources-heading">
      <h3 id="comparison-sources-heading" className="text-lg font-bold">参照資料</h3>
      <details className="mt-2 text-sm text-noema-muted">
        <summary className="cursor-pointer py-1 font-medium text-noema-text">資料一覧（{sources.length}件）</summary>
        {groups.map(([title, items]) => items.length ? <div className="mt-3" key={title}><h4 className="font-semibold text-noema-text">{title}</h4><ul className="mt-1 divide-y divide-noema-line/60">{items.map((source) => <li className="py-2 leading-6" key={source.id}><SourceReference source={source} /></li>)}</ul></div> : null)}
      </details>
    </section>
  );
};
