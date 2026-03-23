"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchResultGroup } from "@/components/search/SearchResultGroup";
import { SearchResultCard } from "@/components/search/SearchResultCard";
import { SearchThemeEntryRail } from "@/components/search/SearchThemeEntryRail";
import { EmptyState } from "@/components/common/EmptyState";
import { CompassIcon, SearchIcon, SparkIcon } from "@/components/common/icons";
import { getSearchPathwayHighlights, getSearchStarterSuggestions, getSearchThemeEntrySuggestions, searchEntries } from "@/lib/search";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const entries = useMemo(() => searchEntries(query), [query]);
  const starterSuggestions = useMemo(() => getSearchStarterSuggestions(), []);
  const themeEntrySuggestions = useMemo(() => getSearchThemeEntrySuggestions(), []);
  const pathwayHighlights = useMemo(() => getSearchPathwayHighlights(query), [query]);
  const isNoResult = query.trim().length > 0 && entries.length === 0;
  const isEmpty = query.trim().length === 0;

  return (
    <div>
      <SearchInput value={query} onChange={setQuery} />

      {(isEmpty || isNoResult) ? <SearchThemeEntryRail items={themeEntrySuggestions} /> : null}

      {!isEmpty && pathwayHighlights.length > 0 ? (
        <section className="mb-4" aria-labelledby="search-pathway-highlights-heading">
          <h2 id="search-pathway-highlights-heading" className="mb-2 flex items-center gap-2 text-2xl font-bold">
            <SparkIcon className="h-5 w-5 text-noema-accent" />
            <span>この検索から入りやすい比較</span>
          </h2>
          {pathwayHighlights.map((entry) => (
            <SearchResultCard key={entry.slug} kind="comparison" title={entry.title} subtitle={entry.subtitle} href={entry.href} />
          ))}
        </section>
      ) : null}

      {isNoResult ? (
        <section className="mb-4" aria-label="検索の空結果">
          <EmptyState icon={<SearchIcon className="h-6 w-6" />} title="検索結果が見つかりません" body="語を短くするか、下の入口比較・テーマから始めるのがおすすめです。" />
          <h2 className="mb-2 mt-4 flex items-center gap-2 text-2xl font-bold">
            <CompassIcon className="h-5 w-5 text-noema-accent" />
            <span>最初に見るなら</span>
          </h2>
          {starterSuggestions.map((entry) => (
            <SearchResultCard key={entry.id} kind={entry.kind} title={entry.title} subtitle={entry.subtitle} href={entry.href} />
          ))}
        </section>
      ) : (
        <>
          <SearchResultGroup kind="comparison" label="比較" entries={entries} />
          <SearchResultGroup kind="thinker" label="思想家" entries={entries} />
          <SearchResultGroup kind="theme" label="テーマ" entries={entries} />
        </>
      )}
    </div>
  );
}
