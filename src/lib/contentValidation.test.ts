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

  it("requires an effective locator only for direct quotes", () => {
    const sourceLocator = data();
    sourceLocator.thinkers[0].quote = { text: "direct", sourceId: sourceLocator.sources[0].id, isParaphrase: false };
    expect(validateContentRelations(sourceLocator).map((issue) => issue.message)).not.toContain("direct quote must have a locator on the quotation or source");

    const quoteLocator = data();
    quoteLocator.sources[0].locator = undefined;
    quoteLocator.thinkers[0].quote = { text: "direct", sourceId: quoteLocator.sources[0].id, locator: "section 1", isParaphrase: false };
    expect(validateContentRelations(quoteLocator).map((issue) => issue.message)).not.toContain("direct quote must have a locator on the quotation or source");

    quoteLocator.thinkers[0].quote.locator = undefined;
    expect(validateContentRelations(quoteLocator).map((issue) => issue.message)).toContain("direct quote must have a locator on the quotation or source");
    quoteLocator.thinkers[0].quote = { text: "summary", isParaphrase: true };
    expect(validateContentRelations(quoteLocator).map((issue) => issue.message)).not.toContain("direct quote must have a locator on the quotation or source");
  });

  it("validates source classifications and optional strings at runtime", () => {
    const broken = data();
    (broken.sources[0] as { workType?: string }).workType = undefined;
    (broken.sources[1] as { workType?: string }).workType = "tertiary";
    broken.sources[2].author = " ";
    const messages = validateContentRelations(broken).map((issue) => issue.message);
    expect(messages.filter((message) => message === "workType must be primary or secondary")).toHaveLength(2);
    expect(messages).toContain("author must not be empty when provided");
  });

  it("validates quotation strings, original-language pairs, and translation types", () => {
    const broken = data();
    broken.thinkers[0].quote.sourceId = " ";
    broken.thinkers[1].quote.originalText = " ";
    broken.thinkers[2].quote = { text: "language only", isParaphrase: true, language: "de" };
    broken.thinkers[3].quote = { text: "original only", isParaphrase: true, originalText: "Original" };
    (broken.thinkers[4].quote as { translationType?: string }).translationType = "machine";
    const messages = validateContentRelations(broken).map((issue) => issue.message);
    expect(messages).toEqual(expect.arrayContaining([
      "quote.sourceId must not be empty when provided",
      "quote.originalText must not be empty when provided",
      "quote.language requires originalText",
      "originalText requires language",
      "translationType must be noema, published, or unknown",
    ]));
  });

  it("validates translator provenance and consistency", () => {
    const broken = data();
    broken.sources[0].translator = "Source Translator";
    broken.thinkers[0].quote = { text: "published", sourceId: broken.sources[0].id, locator: "1", isParaphrase: false, translationType: "published", translator: "Quote Translator" };
    broken.thinkers[1].quote = { text: "published", sourceId: broken.sources[1].id, locator: "1", isParaphrase: false, translationType: "published" };
    broken.thinkers[2].quote = { text: "noema", sourceId: broken.sources[2].id, locator: "1", isParaphrase: false, translationType: "noema", translator: "External" };
    const messages = validateContentRelations(broken).map((issue) => issue.message);
    expect(messages).toContain("quotation and source translators must match");
    expect(messages).toContain("published translation must name a translator");
    expect(messages).toContain("Noema translation must not name an external translator");
  });

  it("keeps Kant's direct quote faithful and Rousseau's canonical chapter URL", () => {
    const kant = thinkers.find((thinker) => thinker.slug === "kant")!;
    expect(kant.quote).toMatchObject({ sourceId: "kant-enlightenment", locator: "冒頭", language: "de", isParaphrase: false });
    expect(kant.quote.text).toContain("自ら招いた");
    expect(kant.quote.originalText).toContain("seiner selbst verschuldeten");
    expect(sources.find((source) => source.id === "rousseau-social-contract")?.url).toBe("https://fr.wikisource.org/wiki/Du_contrat_social/%C3%89dition_1762/Livre_I/Chapitre_1");
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
