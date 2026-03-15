import { addRecentItem, loadStoredItems, saveStoredItems, toggleSavedItem } from "@/lib/storage";

describe("storage helpers", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("recovers from malformed storage", () => {
    window.localStorage.setItem("broken", "not-json");
    expect(loadStoredItems("broken")).toEqual([]);
  });

  it("deduplicates and toggles saved items", () => {
    const toggled = toggleSavedItem(
      [
        { kind: "thinker", slug: "kant" },
        { kind: "thinker", slug: "kant" },
      ],
      { kind: "thinker", slug: "kant" },
    );
    expect(toggled).toEqual([]);

    const added = toggleSavedItem([], { kind: "theme", slug: "freedom" });
    expect(added).toEqual([{ kind: "theme", slug: "freedom" }]);
  });

  it("keeps recent item ordering and limit", () => {
    const seeded = Array.from({ length: 10 }).map((_, index) => ({ kind: "comparison" as const, slug: `c-${index}` }));
    const next = addRecentItem(seeded, { kind: "comparison", slug: "c-5" });
    expect(next[0]).toEqual({ kind: "comparison", slug: "c-5" });
    expect(next).toHaveLength(10);
  });

  it("loads and saves normalized items", () => {
    saveStoredItems("saved", [
      { kind: "comparison", slug: "descartes-hume" },
      { kind: "comparison", slug: "descartes-hume" },
    ]);
    expect(loadStoredItems("saved")).toEqual([{ kind: "comparison", slug: "descartes-hume" }]);
  });
});
