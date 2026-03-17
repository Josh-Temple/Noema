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
    <section aria-labelledby={`search-group-${kind}`} className="mb-4">
      <h2 id={`search-group-${kind}`} className="mb-2 flex items-center gap-2 text-3xl font-bold">
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
