import { getCompareNextStepSuggestions, getFeaturedComparisons, getRecentRecommendations, getThinkerRecommendations } from "@/lib/recommendations";

describe("recommendations", () => {
  it("surfaces sprint 4 bridge comparisons in featured list", () => {
    const featured = getFeaturedComparisons().map((item) => item.slug);
    const bridge = ["husserl-heidegger", "sartre-beauvoir", "arendt-marx", "heidegger-sartre", "foucault-arendt"];
    expect(featured.filter((slug) => bridge.includes(slug)).length).toBeGreaterThanOrEqual(2);
  });

  it("uses recent and saved context in home recommendations", () => {
    const recommended = getRecentRecommendations(
      [
        { kind: "thinker", slug: "kant" },
        { kind: "comparison", slug: "hume-kant" },
      ],
      [{ kind: "theme", slug: "knowledge" }],
    ).map((item) => item.slug);

    expect(recommended).toEqual(expect.arrayContaining(["hume-kant"]));
  });

  it("prioritizes explicit thinker relations for related comparisons", () => {
    const related = getThinkerRecommendations("sartre").map((item) => item.slug);
    expect(related.slice(0, 3)).toEqual(expect.arrayContaining(["sartre-beauvoir", "heidegger-sartre"]));
  });

  it("adds reason labels to compare next steps", () => {
    const next = getCompareNextStepSuggestions("descartes-locke");
    expect(next[0]?.reason).toBeTruthy();
  });
});
