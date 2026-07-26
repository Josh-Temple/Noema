import { comparisons, sources, themes, thinkers } from "@/lib/content";
import { validateContentRelations, validateContentWarnings } from "@/lib/contentValidation";
import { PRIORITY_THEME_PATHWAYS } from "@/lib/pathways";

const data = () => ({
  sources: structuredClone(sources),
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

  it("validates thinker and comparison display arrays as values rather than slugs", () => {
    const broken = data();
    broken.thinkers[0].keyConcepts = ["理性", " ", "理性"];
    broken.thinkers[0].keyWorks = ["純粋理性批判", "純粋理性批判"];
    broken.comparisons[0].whatToWatch = ["相違点", "", "相違点"];
    const messages = validateContentRelations(broken).map((issue) => issue.message);
    expect(messages).toEqual(expect.arrayContaining([
      "keyConcepts contains empty value",
      "keyConcepts contains duplicate value: 理性",
      "keyWorks contains duplicate value: 純粋理性批判",
      "whatToWatch contains empty value",
      "whatToWatch contains duplicate value: 相違点",
    ]));
  });

  it("validates pathway display metadata, group ids, and per-section duplicates", () => {
    const broken = data();
    broken.pathways[0].eyebrow = " ";
    broken.pathways[0].groups[0].description = " ";
    broken.pathways[0].groups[1].id = broken.pathways[0].groups[0].id;
    broken.pathways[0].groups[0].title = "";
    broken.pathways[0].readingOrder!.title = " ";
    broken.pathways[0].readingOrder!.first.title = "";
    broken.pathways[0].readingOrder!.first.comparisonSlugs.push(
      broken.pathways[0].readingOrder!.first.comparisonSlugs[0],
    );
    const messages = validateContentRelations(broken).map((issue) => issue.message);
    expect(messages).toEqual(expect.arrayContaining([
      "eyebrow must not be empty",
      "group ids contains duplicate value: bridges-20th",
      "group:bridges-20th.title must not be empty",
      "group:bridges-20th.description must not be empty when provided",
      "readingOrder.title must not be empty",
      "readingOrder:first.title must not be empty",
      expect.stringContaining("readingOrder:first contains duplicate slug:"),
    ]));
  });

  it("separates intentional editorial one-way relations as warnings", () => {
    expect(validateContentWarnings()).toEqual(expect.arrayContaining([expect.objectContaining({ scope: "thinker" }), expect.objectContaining({ scope: "theme" })]));
  });

  it("validates source identity and source references", () => {
    const broken = data();
    broken.sources.push(structuredClone(broken.sources[0]));
    broken.thinkers[0].quote = { text: "direct", isParaphrase: false };
    broken.thinkers[1].quote.sourceId = "missing-source";
    const messages = validateContentRelations(broken).map((issue) => issue.message);
    expect(messages).toContain(`duplicate source ID: ${broken.sources[0].id}`);
    expect(messages).toContain("direct quote must reference a source");
    expect(messages).toContain("quote references missing source: missing-source");
  });

  it("allows an unsourced summary but validates translations and comparison references", () => {
    const broken = data();
    broken.thinkers[0].quote = { text: "summary", isParaphrase: true };
    broken.thinkers[1].quote = { text: "published", isParaphrase: false, sourceId: broken.sources[0].id, translationType: "published" };
    broken.comparisons[0].sourceIds = [broken.sources[0].id, broken.sources[0].id, "missing-source"];
    const messages = validateContentRelations(broken).map((issue) => issue.message);
    expect(messages).not.toContain("summary must reference a source");
    expect(messages).toContain("published translation must name a translator");
    expect(messages).toContain(`sourceIds contains duplicate slug: ${broken.sources[0].id}`);
    expect(messages).toContain("sourceIds contains missing source: missing-source");
  });
});
