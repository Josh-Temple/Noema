"use client";

export const SearchInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <div className="mb-4">
    <label htmlFor="search-input" className="mb-2 block text-sm text-noema-muted">
      思想家・テーマ・比較を検索
    </label>
    <input
      id="search-input"
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="例: カント 自由"
      className="w-full rounded-card border border-[#2d3a66] bg-[#1b2541] p-4 text-noema-text outline-none focus-visible:ring-2 focus-visible:ring-noema-accent"
    />
  </div>
);
