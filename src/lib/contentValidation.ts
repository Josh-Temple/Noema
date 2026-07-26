import { comparisons, sources, themes, thinkers } from "@/lib/content";
import { PRIORITY_THEME_PATHWAYS } from "@/lib/pathways";
import { Comparison, SourceReference, Theme, ThemePathwayConfig, Thinker } from "@/types/content";

export type ContentValidationIssue = {
  scope: "source" | "thinker" | "comparison" | "theme" | "pathway";
  slug: string;
  message: string;
};

type ContentData = { sources: SourceReference[]; thinkers: Thinker[]; comparisons: Comparison[]; themes: Theme[]; pathways: ThemePathwayConfig[] };
const requiredStrings = {
  thinker: ["slug", "nameJa", "nameEn", "eraLabel", "yearsLabel", "oneLiner", "coreQuestion", "basicAnswer", "opposedTo", "epistemology", "viewOfHuman", "ethicalPoliticalImplication", "laterInfluence"] as const,
  comparison: ["slug", "leftThinkerSlug", "rightThinkerSlug", "titleJa", "subtitle", "whyThisComparisonMatters", "summaryDifference", "commonGround"] as const,
  theme: ["slug", "titleJa", "shortDescription", "starterGuidance"] as const,
};

const duplicates = (values: string[]) => [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
const addIssue = (issues: ContentValidationIssue[], scope: ContentValidationIssue["scope"], slug: string, message: string) =>
  issues.push({ scope, slug: slug || "<empty>", message });

const validateRequiredString = (issues: ContentValidationIssue[], scope: ContentValidationIssue["scope"], slug: string, field: string, value: string) => {
  if (!value.trim()) addIssue(issues, scope, slug, `${field} must not be empty`);
};

const validateOptionalString = (issues: ContentValidationIssue[], scope: ContentValidationIssue["scope"], slug: string, field: string, value?: string) => {
  if (value !== undefined && !value.trim()) addIssue(issues, scope, slug, `${field} must not be empty when provided`);
};

const validateSlugArray = (issues: ContentValidationIssue[], scope: ContentValidationIssue["scope"], slug: string, field: string, values: string[]) => {
  values.forEach((value) => {
    if (!value.trim()) addIssue(issues, scope, slug, `${field} contains empty slug`);
  });
  duplicates(values).forEach((value) => addIssue(issues, scope, slug, `${field} contains duplicate slug: ${value || "<empty>"}`));
};

const validateStringArray = (issues: ContentValidationIssue[], scope: ContentValidationIssue["scope"], slug: string, field: string, values: string[]) => {
  values.forEach((value) => {
    if (!value.trim()) addIssue(issues, scope, slug, `${field} contains empty value`);
  });
  duplicates(values).forEach((value) => addIssue(issues, scope, slug, `${field} contains duplicate value: ${value || "<empty>"}`));
};

const validateIdentity = (data: ContentData, issues: ContentValidationIssue[]) => {
  (["thinker", "comparison", "theme"] as const).forEach((scope) => {
    const entries = scope === "thinker" ? data.thinkers : scope === "comparison" ? data.comparisons : data.themes;
    duplicates(entries.map((entry) => entry.slug)).forEach((slug) => addIssue(issues, scope, slug, `duplicate slug: ${slug || "<empty>"}`));
    entries.forEach((entry) => requiredStrings[scope].forEach((field) => {
      validateRequiredString(issues, scope, entry.slug, field, String(entry[field as keyof typeof entry] ?? ""));
    }));
  });
};

const validateSources = (data: ContentData, issues: ContentValidationIssue[]) => {
  duplicates(data.sources.map((source) => source.id)).forEach((id) => addIssue(issues, "source", id, `duplicate source ID: ${id || "<empty>"}`));
  data.sources.forEach((source) => {
    validateRequiredString(issues, "source", source.id, "id", source.id);
    validateRequiredString(issues, "source", source.id, "title", source.title);
    if (source.workType && !["primary", "secondary"].includes(source.workType)) addIssue(issues, "source", source.id, `invalid workType: ${source.workType}`);
    validateOptionalString(issues, "source", source.id, "url", source.url);
    if (source.url?.trim()) {
      try { new URL(source.url); } catch { addIssue(issues, "source", source.id, `url must be an absolute http(s) URL: ${source.url}`); }
      if (!/^https?:\/\//.test(source.url)) addIssue(issues, "source", source.id, `url must be an absolute http(s) URL: ${source.url}`);
    }
  });
};

const validateThinkers = (data: ContentData, issues: ContentValidationIssue[]) => {
  const sourceIds = new Set(data.sources.map((item) => item.id));
  const thinkerSlugs = new Set(data.thinkers.map((item) => item.slug));
  const themeSlugs = new Set(data.themes.map((item) => item.slug));
  const comparisonSlugs = new Set(data.comparisons.map((item) => item.slug));
  data.thinkers.forEach((thinker) => {
    const quote = thinker.quote;
    validateRequiredString(issues, "thinker", thinker.slug, "quote.text", quote.text);
    if (!quote.isParaphrase && !quote.sourceId) addIssue(issues, "thinker", thinker.slug, "direct quote must reference a source");
    if (quote.sourceId && !sourceIds.has(quote.sourceId)) addIssue(issues, "thinker", thinker.slug, `quote references missing source: ${quote.sourceId}`);
    if (quote.translationType === "published" && !(quote.translator?.trim() || (quote.sourceId && data.sources.find((source) => source.id === quote.sourceId)?.translator?.trim()))) addIssue(issues, "thinker", thinker.slug, "published translation must name a translator");
    if (quote.translationType === "noema" && quote.translator?.trim()) addIssue(issues, "thinker", thinker.slug, "Noema translation must not name an external translator");
    if (quote.originalText !== undefined && !quote.language?.trim()) addIssue(issues, "thinker", thinker.slug, "originalText requires language");
    validateOptionalString(issues, "thinker", thinker.slug, "quote.locator", quote.locator);
    validateOptionalString(issues, "thinker", thinker.slug, "quote.note", quote.note);
    validateStringArray(issues, "thinker", thinker.slug, "keyConcepts", thinker.keyConcepts);
    validateStringArray(issues, "thinker", thinker.slug, "keyWorks", thinker.keyWorks);
    validateSlugArray(issues, "thinker", thinker.slug, "relatedThinkerSlugs", thinker.relatedThinkerSlugs);
    validateSlugArray(issues, "thinker", thinker.slug, "relatedThemeSlugs", thinker.relatedThemeSlugs);
    validateSlugArray(issues, "thinker", thinker.slug, "relatedComparisonSlugs", thinker.relatedComparisonSlugs);
    thinker.relatedThinkerSlugs.forEach((slug) => { if (!thinkerSlugs.has(slug)) addIssue(issues, "thinker", thinker.slug, `relatedThinkerSlugs contains missing thinker: ${slug}`); });
    thinker.relatedThemeSlugs.forEach((slug) => { if (!themeSlugs.has(slug)) addIssue(issues, "thinker", thinker.slug, `relatedThemeSlugs contains missing theme: ${slug}`); });
    thinker.relatedComparisonSlugs.forEach((slug) => { if (!comparisonSlugs.has(slug)) addIssue(issues, "thinker", thinker.slug, `relatedComparisonSlugs contains missing comparison: ${slug}`); });
  });
};

const validateComparisons = (data: ContentData, issues: ContentValidationIssue[]) => {
  const sourceIds = new Set(data.sources.map((item) => item.id));
  const thinkerSlugs = new Set(data.thinkers.map((item) => item.slug));
  const themeSlugs = new Set(data.themes.map((item) => item.slug));
  const comparisonSlugs = new Set(data.comparisons.map((item) => item.slug));
  const pairs = new Map<string, string>();
  data.comparisons.forEach((comparison) => {
    if (comparison.sourceIds) {
      validateSlugArray(issues, "comparison", comparison.slug, "sourceIds", comparison.sourceIds);
      comparison.sourceIds.forEach((id) => { if (!sourceIds.has(id)) addIssue(issues, "comparison", comparison.slug, `sourceIds contains missing source: ${id}`); });
    }
    if (!thinkerSlugs.has(comparison.leftThinkerSlug)) addIssue(issues, "comparison", comparison.slug, `leftThinkerSlug is missing: ${comparison.leftThinkerSlug}`);
    if (!thinkerSlugs.has(comparison.rightThinkerSlug)) addIssue(issues, "comparison", comparison.slug, `rightThinkerSlug is missing: ${comparison.rightThinkerSlug}`);
    if (comparison.leftThinkerSlug === comparison.rightThinkerSlug) addIssue(issues, "comparison", comparison.slug, "left and right thinkers must differ");
    const pair = [comparison.leftThinkerSlug, comparison.rightThinkerSlug].sort().join("|");
    const existing = pairs.get(pair);
    if (existing) addIssue(issues, "comparison", comparison.slug, `duplicate thinker pair (including reversed order): ${existing}`);
    else pairs.set(pair, comparison.slug);

    validateStringArray(issues, "comparison", comparison.slug, "whatToWatch", comparison.whatToWatch);
    (["themeSlugs", "nextThinkerSlugs", "nextComparisonSlugs", "nextThemeSlugs"] as const).forEach((field) =>
      validateSlugArray(issues, "comparison", comparison.slug, field, comparison[field]));
    comparison.themeSlugs.forEach((slug) => { if (!themeSlugs.has(slug)) addIssue(issues, "comparison", comparison.slug, `themeSlugs contains missing theme: ${slug}`); });
    comparison.nextThinkerSlugs.forEach((slug) => { if (!thinkerSlugs.has(slug)) addIssue(issues, "comparison", comparison.slug, `nextThinkerSlugs contains missing thinker: ${slug}`); });
    comparison.nextThemeSlugs.forEach((slug) => { if (!themeSlugs.has(slug)) addIssue(issues, "comparison", comparison.slug, `nextThemeSlugs contains missing theme: ${slug}`); });
    comparison.nextComparisonSlugs.forEach((slug) => {
      if (!comparisonSlugs.has(slug)) addIssue(issues, "comparison", comparison.slug, `nextComparisonSlugs contains missing comparison: ${slug}`);
      if (slug === comparison.slug) addIssue(issues, "comparison", comparison.slug, "nextComparisonSlugs must not contain itself");
    });
    if (!comparison.sections.length) addIssue(issues, "comparison", comparison.slug, "sections must not be empty");
    comparison.sections.forEach((section, index) => (["title", "leftView", "rightView", "takeaway"] as const).forEach((field) =>
      validateRequiredString(issues, "comparison", comparison.slug, `sections[${index}].${field}`, section[field])));
  });
};

const validateThemes = (data: ContentData, issues: ContentValidationIssue[]) => {
  const thinkerSlugs = new Set(data.thinkers.map((item) => item.slug));
  const comparisonSlugs = new Set(data.comparisons.map((item) => item.slug));
  data.themes.forEach((theme) => {
    validateSlugArray(issues, "theme", theme.slug, "relatedThinkerSlugs", theme.relatedThinkerSlugs);
    validateSlugArray(issues, "theme", theme.slug, "relatedComparisonSlugs", theme.relatedComparisonSlugs);
    theme.relatedThinkerSlugs.forEach((slug) => { if (!thinkerSlugs.has(slug)) addIssue(issues, "theme", theme.slug, `relatedThinkerSlugs contains missing thinker: ${slug}`); });
    theme.relatedComparisonSlugs.forEach((slug) => { if (!comparisonSlugs.has(slug)) addIssue(issues, "theme", theme.slug, `relatedComparisonSlugs contains missing comparison: ${slug}`); });
  });
};

const validatePathways = (data: ContentData, issues: ContentValidationIssue[]) => {
  const themeSlugs = new Set(data.themes.map((item) => item.slug));
  const comparisonSlugs = new Set(data.comparisons.map((item) => item.slug));
  duplicates(data.pathways.map((item) => item.slug)).forEach((slug) => addIssue(issues, "pathway", slug, `duplicate pathway slug: ${slug}`));
  data.pathways.forEach((pathway) => {
    validateRequiredString(issues, "pathway", pathway.slug, "eyebrow", pathway.eyebrow);
    validateRequiredString(issues, "pathway", pathway.slug, "starterLabel", pathway.starterLabel);
    validateRequiredString(issues, "pathway", pathway.slug, "starterDescription", pathway.starterDescription);
    if (!themeSlugs.has(pathway.slug)) addIssue(issues, "pathway", pathway.slug, "slug does not reference an existing theme");
    validateSlugArray(issues, "pathway", pathway.slug, "starterComparisonSlugs", pathway.starterComparisonSlugs);

    validateStringArray(issues, "pathway", pathway.slug, "group ids", pathway.groups.map((group) => group.id));
    pathway.groups.forEach((group) => {
      validateRequiredString(issues, "pathway", pathway.slug, `group:${group.id}.title`, group.title);
      validateOptionalString(issues, "pathway", pathway.slug, `group:${group.id}.description`, group.description);
      validateSlugArray(issues, "pathway", pathway.slug, `group:${group.id}`, group.comparisonSlugs);
    });

    const routes = pathway.readingOrder
      ? ([
          ["first", pathway.readingOrder.first],
          ["next", pathway.readingOrder.next],
          ["detour", pathway.readingOrder.detour],
        ].filter((entry): entry is [string, NonNullable<typeof pathway.readingOrder>["first"]] => Boolean(entry[1])))
      : [];
    if (pathway.readingOrder) {
      validateOptionalString(issues, "pathway", pathway.slug, "readingOrder.eyebrow", pathway.readingOrder.eyebrow);
      validateRequiredString(issues, "pathway", pathway.slug, "readingOrder.title", pathway.readingOrder.title);
      if (!pathway.readingOrder.first.comparisonSlugs.length) addIssue(issues, "pathway", pathway.slug, "readingOrder:first must not be empty");
    }
    routes.forEach(([name, route]) => {
      validateRequiredString(issues, "pathway", pathway.slug, `readingOrder:${name}.title`, route.title);
      validateOptionalString(issues, "pathway", pathway.slug, `readingOrder:${name}.description`, route.description);
      validateSlugArray(issues, "pathway", pathway.slug, `readingOrder:${name}`, route.comparisonSlugs);
    });

    const sections: Array<[string, string[]]> = [
      ["starterComparisonSlugs", pathway.starterComparisonSlugs],
      ...pathway.groups.map((group) => [`group:${group.id}`, group.comparisonSlugs] as [string, string[]]),
      ...routes.map(([name, route]) => [`readingOrder:${name}`, route.comparisonSlugs] as [string, string[]]),
    ];
    sections.forEach(([name, slugs]) => slugs.forEach((slug) => {
      if (!comparisonSlugs.has(slug)) addIssue(issues, "pathway", pathway.slug, `${name} contains missing comparison: ${slug}`);
    }));
  });
};

export const validateContentRelations = (data: ContentData = { sources, thinkers, comparisons, themes, pathways: PRIORITY_THEME_PATHWAYS }) => {
  const issues: ContentValidationIssue[] = [];
  validateSources(data, issues);
  validateIdentity(data, issues);
  validateThinkers(data, issues);
  validateComparisons(data, issues);
  validateThemes(data, issues);
  validatePathways(data, issues);
  return issues;
};

// Related lists also act as editorial “nearby reading” links in the existing data,
// so directional mismatches are reported separately rather than failing builds.
export const validateContentWarnings = (data: ContentData = { sources, thinkers, comparisons, themes, pathways: PRIORITY_THEME_PATHWAYS }) => {
  const warnings: ContentValidationIssue[] = [];
  const comparisonBySlug = new Map(data.comparisons.map((item) => [item.slug, item]));
  const thinkerBySlug = new Map(data.thinkers.map((item) => [item.slug, item]));
  const themeBySlug = new Map(data.themes.map((item) => [item.slug, item]));
  data.thinkers.forEach((thinker) => thinker.relatedComparisonSlugs.forEach((slug) => {
    const comparison = comparisonBySlug.get(slug);
    if (comparison && comparison.leftThinkerSlug !== thinker.slug && comparison.rightThinkerSlug !== thinker.slug) addIssue(warnings, "thinker", thinker.slug, `editorial related comparison does not contain thinker: ${slug}`);
  }));
  data.themes.forEach((theme) => theme.relatedComparisonSlugs.forEach((slug) => {
    const comparison = comparisonBySlug.get(slug);
    if (comparison && !comparison.themeSlugs.includes(theme.slug)) addIssue(warnings, "theme", theme.slug, `editorial related comparison does not contain theme: ${slug}`);
  }));
  data.thinkers.forEach((thinker) => thinker.relatedThemeSlugs.forEach((slug) => {
    const theme = themeBySlug.get(slug);
    if (theme && !theme.relatedThinkerSlugs.includes(thinker.slug)) addIssue(warnings, "thinker", thinker.slug, `theme does not link back to thinker: ${slug}`);
  }));
  data.themes.forEach((theme) => theme.relatedThinkerSlugs.forEach((slug) => {
    const thinker = thinkerBySlug.get(slug);
    if (thinker && !thinker.relatedThemeSlugs.includes(theme.slug)) addIssue(warnings, "theme", theme.slug, `thinker does not link back to theme: ${slug}`);
  }));
  return warnings;
};

export const formatContentIssues = (heading: string, issues: ContentValidationIssue[]) =>
  `${heading}\n${issues.map((issue) => `- [${issue.scope}:${issue.slug}] ${issue.message}`).join("\n")}`;

export const assertContentRelations = () => {
  const issues = validateContentRelations();
  if (issues.length) throw new Error(formatContentIssues("Content validation failed:", issues));
};
