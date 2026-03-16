import {
  getComparisonBySlug,
  getComparisonByThinkerPair,
  getComparisonsForTheme,
  getComparisonsForThinker,
  getThemeBySlug,
  getThemesForThinker,
  getThinkerBySlug,
} from "@/lib/content";

describe("content helpers", () => {
  it("gets thinker by slug", () => {
    expect(getThinkerBySlug("kant")?.nameEn).toBe("Immanuel Kant");
    expect(getThinkerBySlug("epicurus")?.nameJa).toBe("エピクロス");
    expect(getThinkerBySlug("marcus-aurelius")?.nameJa).toBe("マルクス・アウレリウス");
  });

  it("finds comparison regardless of pair order", () => {
    const forward = getComparisonByThinkerPair("descartes", "hume");
    const reverse = getComparisonByThinkerPair("hume", "descartes");
    expect(forward?.slug).toBe("descartes-hume");
    expect(reverse?.slug).toBe("descartes-hume");
  });

  it("looks up newly added ancient ethics comparisons", () => {
    expect(getComparisonByThinkerPair("zeno", "epicurus")?.slug).toBe("stoicism-epicureanism");
    expect(getComparisonByThinkerPair("epictetus", "epicurus")?.slug).toBe("epictetus-epicurus");
    expect(getComparisonBySlug("marcus-epictetus")?.titleJa).toBe("マルクス・アウレリウス vs エピクテトス");
  });

  it("returns thinker comparisons and themes", () => {
    expect(getComparisonsForThinker("epictetus").length).toBeGreaterThanOrEqual(2);
    expect(getThemesForThinker("epictetus").some((theme) => theme.slug === "happiness")).toBe(true);
  });

  it("gets theme by slug and resolves ancient pathways", () => {
    expect(getThemeBySlug("freedom")?.titleEn).toBe("Freedom");
    expect(getThemeBySlug("human-nature")?.titleJa).toBe("人間とは何か");

    const happinessComparisons = getComparisonsForTheme("happiness").map((comparison) => comparison.slug);
    expect(happinessComparisons).toEqual(expect.arrayContaining(["stoicism-epicureanism", "aristotle-stoicism", "epictetus-epicurus"]));
  });
});
