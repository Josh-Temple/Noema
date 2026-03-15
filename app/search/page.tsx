"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchResultGroup } from "@/components/search/SearchResultGroup";
import { searchEntries } from "@/lib/search";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const entries = useMemo(() => searchEntries(query), [query]);

  return (
    <div>
      <SearchInput value={query} onChange={setQuery} />
      <SearchResultGroup kind="comparison" label="比較" entries={entries} />
      <SearchResultGroup kind="thinker" label="思想家" entries={entries} />
      <SearchResultGroup kind="theme" label="テーマ" entries={entries} />
    </div>
  );
}
