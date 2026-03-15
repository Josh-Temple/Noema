import {
  getComparisonByThinkerPair,
  getComparisonsForThinker,
  getThemeBySlug,
  getThemesForThinker,
  getThinkerBySlug,
} from "@/lib/content";

describe("content helpers", () => {
  it("gets thinker by slug", () => {
    expect(getThinkerBySlug("kant")?.nameEn).toBe("Immanuel Kant");
  });

  it("finds comparison regardless of pair order", () => {
    const forward = getComparisonByThinkerPair("descartes", "hume");
    const reverse = getComparisonByThinkerPair("hume", "descartes");
    expect(forward?.slug).toBe("descartes-hume");
    expect(reverse?.slug).toBe("descartes-hume");
  });

  it("returns thinker comparisons and themes", () => {
    expect(getComparisonsForThinker("hume").length).toBeGreaterThan(1);
    expect(getThemesForThinker("hume").some((theme) => theme.slug === "knowledge")).toBe(true);
  });

  it("gets theme by slug", () => {
    expect(getThemeBySlug("freedom")?.titleEn).toBe("Freedom");
  });
});
