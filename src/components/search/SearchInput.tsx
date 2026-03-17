"use client";

import { SearchIcon } from "@/components/common/icons";

export const SearchInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <div className="mb-4">
    <label htmlFor="search-input" className="mb-2 flex items-center gap-1 text-sm text-noema-muted">
      <SearchIcon className="h-4 w-4" />
      <span>思想家・テーマ・比較を検索</span>
    </label>
    <div className="flex items-center gap-2 rounded-card border border-[#2d3a66] bg-[#1b2541] p-3 focus-within:ring-2 focus-within:ring-noema-accent">
      <SearchIcon className="h-4 w-4 text-[#b2c0e8]" />
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
