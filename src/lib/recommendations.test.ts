import {
  getCompareNextStepSuggestions,
  getComparisonReview,
  getFeaturedComparisons,
  getOrderedThemeComparisons,
  getOrderedThemesForThinker,
  getRecentContinuationSuggestions,
  getRecentRecommendations,
  getSavedRevisitSuggestions,
  getSavedStudyGroups,
  getThinkerRecommendations,
} from "@/lib/recommendations";

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

  it("adds themed pathway labels to compare next steps", () => {
    const next = getCompareNextStepSuggestions("hanfeizi-hobbes");
    expect(next[0]?.reason).toBeTruthy();
    expect(next.map((item) => item.reason)).toContain("このテーマの次の一歩");
  });

  it("builds recent continuation suggestions deterministically", () => {
    const items = getRecentContinuationSuggestions([{ kind: "comparison", slug: "descartes-locke" }], [], 2);
    expect(items.map((item) => item.slug)).toEqual(["spinoza-descartes", "leibniz-locke"]);
  });

  it("builds saved revisit suggestions from saved thinkers and themes", () => {
    const items = getSavedRevisitSuggestions(
      [
        { kind: "thinker", slug: "xunzi" },
        { kind: "theme", slug: "state-legitimacy" },
      ],
      [],
      2,
    );

    expect(items.map((item) => item.slug)).toContain("xunzi-hanfeizi");
  });

  it("derives study-shelf groups with next study steps", () => {
    const groups = getSavedStudyGroups(
      [
        { kind: "comparison", slug: "mencius-xunzi" },
        { kind: "thinker", slug: "hanfeizi" },
        { kind: "theme", slug: "state-legitimacy" },
      ],
      [{ kind: "comparison", slug: "mencius-xunzi" }],
    );

    expect(groups[0]?.items[0]?.nextStep?.slug).toBe("xunzi-hanfeizi");
    expect(groups[1]?.items[0]?.nextStep?.slug).toBe("hanfeizi-hobbes");
    expect(groups[2]?.items[0]?.nextStep?.slug).toBeTruthy();
  });

  it("creates a lightweight comparison review", () => {
    const review = getComparisonReview("sartre-beauvoir");
    expect(review?.reviewPoints).toHaveLength(3);
    expect(review?.prompts).toHaveLength(2);
    expect(review?.nextStep?.reason).toBe("20世紀から見る");
  });

  it("pins starter pathways for priority themes", () => {
    const items = getOrderedThemeComparisons("freedom").slice(0, 3).map((item) => item.slug);
    expect(items).toEqual(["nietzsche-sartre", "sartre-beauvoir", "laozi-zhuangzi"]);
  });

  it("orders thinker themes toward the priority gateways", () => {
    const items = getOrderedThemesForThinker("hanfeizi").slice(0, 2).map((item) => item.slug);
    expect(items).toEqual(["state-legitimacy", "society-power"]);
  });
});
