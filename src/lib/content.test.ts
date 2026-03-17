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
    expect(getThinkerBySlug("mencius")?.nameJa).toBe("孟子");
    expect(getThinkerBySlug("zhuangzi")?.nameEn).toBe("Zhuangzi");
    expect(getThinkerBySlug("xunzi")?.nameJa).toBe("荀子");
    expect(getThinkerBySlug("hanfeizi")?.nameEn).toBe("Han Feizi");
  });

  it("finds comparison regardless of pair order", () => {
    const forward = getComparisonByThinkerPair("descartes", "hume");
    const reverse = getComparisonByThinkerPair("hume", "descartes");
    expect(forward?.slug).toBe("descartes-hume");
    expect(reverse?.slug).toBe("descartes-hume");
  });

  it("looks up east asian second-layer comparisons", () => {
    expect(getComparisonByThinkerPair("mencius", "xunzi")?.slug).toBe("mencius-xunzi");
    expect(getComparisonByThinkerPair("xunzi", "hanfeizi")?.slug).toBe("xunzi-hanfeizi");
    expect(getComparisonBySlug("hanfeizi-hobbes")?.titleJa).toBe("韓非子 vs ホッブズ");
  });

  it("returns thinker comparisons and themes", () => {
    expect(getComparisonsForThinker("confucius").length).toBeGreaterThanOrEqual(4);
    expect(getThemesForThinker("hanfeizi").some((theme) => theme.slug === "state-legitimacy")).toBe(true);
  });

  it("gets theme by slug and resolves east asian pathways", () => {
    expect(getThemeBySlug("state-legitimacy")?.titleEn).toBe("State Legitimacy");
    expect(getThemeBySlug("human-nature")?.titleJa).toBe("人間とは何か");

    const stateComparisons = getComparisonsForTheme("state-legitimacy").map((comparison) => comparison.slug);
    expect(stateComparisons).toEqual(expect.arrayContaining(["mencius-xunzi", "xunzi-hanfeizi", "hanfeizi-hobbes"]));
  });
});
