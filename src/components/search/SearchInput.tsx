"use client";

import { SearchIcon } from "@/components/common/icons";

export const SearchInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <div className="mb-4">
    <label htmlFor="search-input" className="mb-3 flex items-center gap-1 text-[0.65rem] font-black uppercase tracking-widest text-noema-muted">
      <SearchIcon className="h-4 w-4" />
      <span>思想家・テーマ・比較を検索</span>
    </label>
    <div className="flex items-center gap-3 rounded-2xl border border-noema-line bg-white p-4 shadow-sm focus-within:ring-2 focus-within:ring-noema-accent">
      <SearchIcon className="h-4 w-4 text-noema-blue" />
      <input
        id="search-input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="例: カント 自由"
        className="w-full bg-transparent text-noema-text outline-none"
      />
    </div>
  </div>
);
