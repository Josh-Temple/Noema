import { getCompareNextStepSuggestions, getFeaturedComparisons, getRecentRecommendations, getThinkerRecommendations } from "@/lib/recommendations";

describe("recommendations", () => {
  it("surfaces east asian second-wave comparisons in featured list", () => {
    const featured = getFeaturedComparisons({ limit: 6 }).map((item) => item.slug);
    expect(featured).toEqual(expect.arrayContaining(["mencius-xunzi", "hanfeizi-hobbes"]));
  });

  it("uses recent and saved context in home recommendations", () => {
    const recommended = getRecentRecommendations(
      [
        { kind: "thinker", slug: "xunzi" },
        { kind: "comparison", slug: "mencius-xunzi" },
      ],
      [{ kind: "theme", slug: "state-legitimacy" }],
    ).map((item) => item.slug);

    expect(recommended).toEqual(expect.arrayContaining(["mencius-xunzi"]));
  });

  it("prioritizes explicit thinker relations for related comparisons", () => {
    const related = getThinkerRecommendations("hanfeizi").map((item) => item.slug);
    expect(related.slice(0, 3)).toEqual(expect.arrayContaining(["xunzi-hanfeizi", "hanfeizi-hobbes"]));
  });

  it("adds reason labels to compare next steps", () => {
    const next = getCompareNextStepSuggestions("hanfeizi-hobbes");
    expect(next[0]?.reason).toBeTruthy();
  });
});
