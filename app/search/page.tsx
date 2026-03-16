"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchResultGroup } from "@/components/search/SearchResultGroup";
import { SearchResultCard } from "@/components/search/SearchResultCard";
import { EmptyState } from "@/components/common/EmptyState";
import { getSearchStarterSuggestions, searchEntries } from "@/lib/search";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const entries = useMemo(() => searchEntries(query), [query]);
  const starterSuggestions = useMemo(() => getSearchStarterSuggestions(), []);
  const isNoResult = query.trim().length > 0 && entries.length === 0;

  return (
    <div>
      <SearchInput value={query} onChange={setQuery} />

      {isNoResult ? (
        <section className="mb-4" aria-label="検索の空結果">
          <EmptyState title="検索結果が見つかりません" body="語を短くするか、下の入口比較・テーマから始めるのがおすすめです。" />
          <h2 className="mb-2 mt-4 text-2xl font-bold">最初に見るなら</h2>
          {starterSuggestions.map((entry) => (
            <SearchResultCard key={entry.id} title={entry.title} subtitle={entry.subtitle} href={entry.href} />
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
