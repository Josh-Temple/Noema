"use client";

export const SearchInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <input
    type="search"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder="思想家・テーマ・比較を検索"
    className="mb-4 w-full rounded-card border border-[#2d3a66] bg-[#1b2541] p-4 text-noema-text"
  />
);
