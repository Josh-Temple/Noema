import { comparisons, themes, thinkers } from "@/lib/content";
import { validateContentRelations, validateContentWarnings } from "@/lib/contentValidation";
import { PRIORITY_THEME_PATHWAYS } from "@/lib/pathways";

const data = () => ({
  thinkers: structuredClone(thinkers),
  comparisons: structuredClone(comparisons),
  themes: structuredClone(themes),
  pathways: structuredClone(PRIORITY_THEME_PATHWAYS),
});

describe("content validation", () => {
  it("has no build-blocking content issues", () => expect(validateContentRelations()).toEqual([]));

  it("reports scope, slug, duplicate pairs and invalid section content", () => {
    const broken = data();
    broken.comparisons[0].rightThinkerSlug = broken.comparisons[0].leftThinkerSlug;
    broken.comparisons[0].sections[0].takeaway = " ";
    broken.comparisons[0].nextComparisonSlugs.push(broken.comparisons[0].slug);
    const issues = validateContentRelations(broken);
    expect(issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ scope: "comparison", slug: broken.comparisons[0].slug, message: "left and right thinkers must differ" }),
      expect.objectContaining({ message: "sections[0].takeaway must not be empty" }),
      expect.objectContaining({ message: "nextComparisonSlugs must not contain itself" }),
    ]));
  });

  it("validates duplicate/empty slugs, references, and pathway reading order", () => {
    const broken = data();
    broken.thinkers[1].slug = broken.thinkers[0].slug;
    broken.themes[0].titleJa = "";
    broken.pathways[0].readingOrder!.first.comparisonSlugs = [];
    broken.pathways[0].starterComparisonSlugs.push("missing-comparison");
    const messages = validateContentRelations(broken).map((issue) => issue.message);
    expect(messages).toContain(`duplicate slug: ${broken.thinkers[0].slug}`);
    expect(messages).toContain("titleJa must not be empty");
    expect(messages).toContain("readingOrder:first must not be empty");
    expect(messages).toContain("starterComparisonSlugs contains missing comparison: missing-comparison");
  });

  it("separates intentional editorial one-way relations as warnings", () => {
    expect(validateContentWarnings()).toEqual(expect.arrayContaining([expect.objectContaining({ scope: "thinker" }), expect.objectContaining({ scope: "theme" })]));
  });
});
