import { SearchEntry, SearchResultKind } from "@/types/content";
import { SearchResultCard } from "@/components/search/SearchResultCard";
import { EmptyState } from "@/components/common/EmptyState";
import { CompareIcon, ThemeIcon, ThinkerIcon } from "@/components/common/icons";

const kindIcon = {
  comparison: CompareIcon,
  thinker: ThinkerIcon,
  theme: ThemeIcon,
} as const;

export const SearchResultGroup = ({ kind, label, entries }: { kind: SearchResultKind; label: string; entries: SearchEntry[] }) => {
  const filtered = entries.filter((entry) => entry.kind === kind);
  const Icon = kindIcon[kind];

  return (
    <section aria-labelledby={`search-group-${kind}`} className="mb-10">
      <h2 id={`search-group-${kind}`} className="mb-4 border-l-4 border-noema-accent pl-4 text-xl font-black">
        <Icon className="h-5 w-5 text-noema-accent" />
        <span>{label}</span>
      </h2>
      {filtered.length === 0 ? (
        <EmptyState title="結果なし" body={`${label}に該当する項目はありません。`} />
      ) : (
        <ul className="list-none p-0">
          {filtered.map((entry) => (
            <li key={entry.id}>
              <SearchResultCard kind={entry.kind} title={entry.title} subtitle={entry.subtitle} href={entry.href} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
