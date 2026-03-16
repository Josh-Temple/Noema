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
    expect(getThinkerBySlug("heidegger")?.nameEn).toBe("Martin Heidegger");
    expect(getThinkerBySlug("arendt")?.nameJa).toBe("ハンナ・アーレント");
  });

  it("finds comparison regardless of pair order", () => {
    const forward = getComparisonByThinkerPair("descartes", "hume");
    const reverse = getComparisonByThinkerPair("hume", "descartes");
    expect(forward?.slug).toBe("descartes-hume");
    expect(reverse?.slug).toBe("descartes-hume");
  });

  it("looks up newly added bridge comparisons", () => {
    expect(getComparisonByThinkerPair("husserl", "heidegger")?.slug).toBe("husserl-heidegger");
    expect(getComparisonByThinkerPair("sartre", "beauvoir")?.slug).toBe("sartre-beauvoir");
    expect(getComparisonBySlug("foucault-arendt")?.titleJa).toBe("フーコー vs アーレント");
  });

  it("returns thinker comparisons and themes", () => {
    expect(getComparisonsForThinker("sartre").length).toBeGreaterThanOrEqual(3);
    expect(getThemesForThinker("arendt").some((theme) => theme.slug === "society-power")).toBe(true);
  });

  it("gets theme by slug and resolves bridge pathways", () => {
    expect(getThemeBySlug("freedom")?.titleEn).toBe("Freedom");
    expect(getThemeBySlug("society-power")?.titleJa).toBe("社会と権力はどう成り立つか");

    const humanComparisons = getComparisonsForTheme("human-nature").map((comparison) => comparison.slug);
    expect(humanComparisons).toEqual(expect.arrayContaining(["husserl-heidegger", "heidegger-sartre", "sartre-beauvoir"]));
  });
});
