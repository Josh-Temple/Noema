import { act, renderHook } from "@testing-library/react";
import { useSavedItems } from "@/hooks/useSavedItems";
import { useRecentItems } from "@/hooks/useRecentItems";
import { resetStoredItemsStore, STORAGE_KEYS } from "@/lib/storage";

describe("shared storage hooks", () => {
  beforeEach(() => { localStorage.clear(); resetStoredItemsStore(); });

  it("synchronizes save and unsave across consumers and persists", () => {
    const first = renderHook(() => useSavedItems());
    const second = renderHook(() => useSavedItems());
    act(() => first.result.current.toggleSaved("thinker", "kant"));
    expect(second.result.current.isSaved("thinker", "kant")).toBe(true);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.saved) ?? "[]")).toEqual([{ kind: "thinker", slug: "kant" }]);
    act(() => second.result.current.toggleSaved("thinker", "kant"));
    expect(first.result.current.isSaved("thinker", "kant")).toBe(false);
  });

  it("recovers from broken storage and keeps recent order and limit", () => {
    localStorage.setItem(STORAGE_KEYS.recent, "broken");
    const recent = renderHook(() => useRecentItems());
    expect(recent.result.current.recentItems).toEqual([]);
    act(() => { for (let index = 0; index < 12; index += 1) recent.result.current.addRecent("comparison", `item-${index}`); });
    expect(recent.result.current.recentItems).toHaveLength(10);
    expect(recent.result.current.recentItems[0]?.slug).toBe("item-11");
  });

  it("applies storage events from another tab", () => {
    const saved = renderHook(() => useSavedItems());
    localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify([{ kind: "theme", slug: "freedom" }]));
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEYS.saved })));
    expect(saved.result.current.isSaved("theme", "freedom")).toBe(true);
  });
});
