import { getSearchIndex, searchEntries } from "@/lib/search";

describe("search", () => {
  it("builds unified index", () => {
    const index = getSearchIndex();
    expect(index.length).toBeGreaterThan(10);
    expect(index.some((entry) => entry.kind === "comparison")).toBe(true);
    expect(index.some((entry) => entry.kind === "thinker")).toBe(true);
    expect(index.some((entry) => entry.kind === "theme")).toBe(true);
  });

  it("supports alias queries and relevance ordering", () => {
    const results = searchEntries("経験論");
    expect(results.some((entry) => entry.id.includes("locke") || entry.id.includes("hume") || entry.id.includes("berkeley"))).toBe(true);
  });

  it("matches japanese thinker names", () => {
    const results = searchEntries("デカルト");
    expect(results.some((entry) => entry.id.includes("descartes") || entry.title.includes("デカルト"))).toBe(true);
  });
});
