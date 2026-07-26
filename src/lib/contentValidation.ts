import { comparisons, themes, thinkers } from "@/lib/content";
import { PRIORITY_THEME_PATHWAYS } from "@/lib/pathways";
import { Comparison, Theme, ThemePathwayConfig, Thinker } from "@/types/content";

export type ContentValidationIssue = {
  scope: "thinker" | "comparison" | "theme" | "pathway";
  slug: string;
  message: string;
};

type ContentData = { thinkers: Thinker[]; comparisons: Comparison[]; themes: Theme[]; pathways: ThemePathwayConfig[] };
const requiredStrings = {
  thinker: ["slug", "nameJa", "nameEn", "eraLabel", "yearsLabel", "oneLiner", "quote", "coreQuestion", "basicAnswer", "opposedTo", "epistemology", "viewOfHuman", "ethicalPoliticalImplication", "laterInfluence"] as const,
  comparison: ["slug", "leftThinkerSlug", "rightThinkerSlug", "titleJa", "subtitle", "whyThisComparisonMatters", "summaryDifference", "commonGround"] as const,
  theme: ["slug", "titleJa", "shortDescription", "starterGuidance"] as const,
};

const duplicates = (values: string[]) => [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
const addDuplicates = (issues: ContentValidationIssue[], scope: ContentValidationIssue["scope"], slug: string, field: string, values: string[]) =>
  duplicates(values).forEach((value) => issues.push({ scope, slug, message: `${field} contains duplicate slug: ${value}` }));

const validateIdentity = (data: ContentData, issues: ContentValidationIssue[]) => {
  (["thinker", "comparison", "theme"] as const).forEach((scope) => {
    const entries = scope === "thinker" ? data.thinkers : scope === "comparison" ? data.comparisons : data.themes;
    duplicates(entries.map((entry) => entry.slug)).forEach((slug) => issues.push({ scope, slug, message: `duplicate slug: ${slug || "<empty>"}` }));
    entries.forEach((entry) => requiredStrings[scope].forEach((field) => {
      if (!String(entry[field as keyof typeof entry] ?? "").trim()) issues.push({ scope, slug: entry.slug || "<empty>", message: `${field} must not be empty` });
    }));
  });
};

const validateThinkers = (data: ContentData, issues: ContentValidationIssue[]) => {
  const thinkerSlugs = new Set(data.thinkers.map((item) => item.slug));
  const themeSlugs = new Set(data.themes.map((item) => item.slug));
  const comparisonBySlug = new Map(data.comparisons.map((item) => [item.slug, item]));
  data.thinkers.forEach((thinker) => {
    addDuplicates(issues, "thinker", thinker.slug, "relatedThinkerSlugs", thinker.relatedThinkerSlugs);
    addDuplicates(issues, "thinker", thinker.slug, "relatedThemeSlugs", thinker.relatedThemeSlugs);
    addDuplicates(issues, "thinker", thinker.slug, "relatedComparisonSlugs", thinker.relatedComparisonSlugs);
    thinker.relatedThinkerSlugs.forEach((slug) => { if (!thinkerSlugs.has(slug)) issues.push({ scope: "thinker", slug: thinker.slug, message: `relatedThinkerSlugs contains missing thinker: ${slug}` }); });
    thinker.relatedThemeSlugs.forEach((slug) => { if (!themeSlugs.has(slug)) issues.push({ scope: "thinker", slug: thinker.slug, message: `relatedThemeSlugs contains missing theme: ${slug}` }); });
    thinker.relatedComparisonSlugs.forEach((slug) => {
      const comparison = comparisonBySlug.get(slug);
      if (!comparison) issues.push({ scope: "thinker", slug: thinker.slug, message: `relatedComparisonSlugs contains missing comparison: ${slug}` });
    });
  });
};

const validateComparisons = (data: ContentData, issues: ContentValidationIssue[]) => {
  const thinkerSlugs = new Set(data.thinkers.map((item) => item.slug));
  const themeSlugs = new Set(data.themes.map((item) => item.slug));
  const comparisonSlugs = new Set(data.comparisons.map((item) => item.slug));
  const pairs = new Map<string, string>();
  data.comparisons.forEach((comparison) => {
    if (!thinkerSlugs.has(comparison.leftThinkerSlug)) issues.push({ scope: "comparison", slug: comparison.slug, message: `leftThinkerSlug is missing: ${comparison.leftThinkerSlug}` });
    if (!thinkerSlugs.has(comparison.rightThinkerSlug)) issues.push({ scope: "comparison", slug: comparison.slug, message: `rightThinkerSlug is missing: ${comparison.rightThinkerSlug}` });
    if (comparison.leftThinkerSlug === comparison.rightThinkerSlug) issues.push({ scope: "comparison", slug: comparison.slug, message: "left and right thinkers must differ" });
    const pair = [comparison.leftThinkerSlug, comparison.rightThinkerSlug].sort().join("|");
    const existing = pairs.get(pair);
    if (existing) issues.push({ scope: "comparison", slug: comparison.slug, message: `duplicate thinker pair (including reversed order): ${existing}` }); else pairs.set(pair, comparison.slug);
    (["themeSlugs", "nextThinkerSlugs", "nextComparisonSlugs", "nextThemeSlugs"] as const).forEach((field) => addDuplicates(issues, "comparison", comparison.slug, field, comparison[field]));
    comparison.themeSlugs.forEach((slug) => { if (!themeSlugs.has(slug)) issues.push({ scope: "comparison", slug: comparison.slug, message: `themeSlugs contains missing theme: ${slug}` }); });
    comparison.nextThinkerSlugs.forEach((slug) => { if (!thinkerSlugs.has(slug)) issues.push({ scope: "comparison", slug: comparison.slug, message: `nextThinkerSlugs contains missing thinker: ${slug}` }); });
    comparison.nextThemeSlugs.forEach((slug) => { if (!themeSlugs.has(slug)) issues.push({ scope: "comparison", slug: comparison.slug, message: `nextThemeSlugs contains missing theme: ${slug}` }); });
    comparison.nextComparisonSlugs.forEach((slug) => { if (!comparisonSlugs.has(slug)) issues.push({ scope: "comparison", slug: comparison.slug, message: `nextComparisonSlugs contains missing comparison: ${slug}` }); if (slug === comparison.slug) issues.push({ scope: "comparison", slug: comparison.slug, message: "nextComparisonSlugs must not contain itself" }); });
    if (!comparison.sections.length) issues.push({ scope: "comparison", slug: comparison.slug, message: "sections must not be empty" });
    comparison.sections.forEach((section, index) => (["title", "leftView", "rightView", "takeaway"] as const).forEach((field) => { if (!section[field].trim()) issues.push({ scope: "comparison", slug: comparison.slug, message: `sections[${index}].${field} must not be empty` }); }));
  });
};

const validateThemes = (data: ContentData, issues: ContentValidationIssue[]) => {
  const thinkerSlugs = new Set(data.thinkers.map((item) => item.slug));
  const comparisonBySlug = new Map(data.comparisons.map((item) => [item.slug, item]));
  data.themes.forEach((theme) => {
    addDuplicates(issues, "theme", theme.slug, "relatedThinkerSlugs", theme.relatedThinkerSlugs);
    addDuplicates(issues, "theme", theme.slug, "relatedComparisonSlugs", theme.relatedComparisonSlugs);
    theme.relatedThinkerSlugs.forEach((slug) => { if (!thinkerSlugs.has(slug)) issues.push({ scope: "theme", slug: theme.slug, message: `relatedThinkerSlugs contains missing thinker: ${slug}` }); });
    theme.relatedComparisonSlugs.forEach((slug) => { if (!comparisonBySlug.has(slug)) issues.push({ scope: "theme", slug: theme.slug, message: `relatedComparisonSlugs contains missing comparison: ${slug}` }); });
  });
};

const validatePathways = (data: ContentData, issues: ContentValidationIssue[]) => {
  const themeSlugs = new Set(data.themes.map((item) => item.slug));
  const comparisonSlugs = new Set(data.comparisons.map((item) => item.slug));
  duplicates(data.pathways.map((item) => item.slug)).forEach((slug) => issues.push({ scope: "pathway", slug, message: `duplicate pathway slug: ${slug}` }));
  data.pathways.forEach((pathway) => {
    if (!themeSlugs.has(pathway.slug)) issues.push({ scope: "pathway", slug: pathway.slug, message: "slug does not reference an existing theme" });
    const sections: Array<[string, string[]]> = [["starterComparisonSlugs", pathway.starterComparisonSlugs], ...pathway.groups.map((group) => [`group:${group.id}`, group.comparisonSlugs] as [string, string[]])];
    if (pathway.readingOrder) sections.push(["readingOrder:first", pathway.readingOrder.first.comparisonSlugs], ["readingOrder:next", pathway.readingOrder.next?.comparisonSlugs ?? []], ["readingOrder:detour", pathway.readingOrder.detour?.comparisonSlugs ?? []]);
    if (pathway.readingOrder && !pathway.readingOrder.first.comparisonSlugs.length) issues.push({ scope: "pathway", slug: pathway.slug, message: "readingOrder:first must not be empty" });
    sections.forEach(([name, slugs]) => { addDuplicates(issues, "pathway", pathway.slug, name, slugs); slugs.forEach((slug) => { if (!comparisonSlugs.has(slug)) issues.push({ scope: "pathway", slug: pathway.slug, message: `${name} contains missing comparison: ${slug}` }); }); });
  });
};

export const validateContentRelations = (data: ContentData = { thinkers, comparisons, themes, pathways: PRIORITY_THEME_PATHWAYS }) => {
  const issues: ContentValidationIssue[] = [];
  validateIdentity(data, issues); validateThinkers(data, issues); validateComparisons(data, issues); validateThemes(data, issues); validatePathways(data, issues);
  return issues;
};

// Related lists also act as editorial “nearby reading” links in the existing data,
// so directional mismatches are reported separately rather than failing builds.
export const validateContentWarnings = (data: ContentData = { thinkers, comparisons, themes, pathways: PRIORITY_THEME_PATHWAYS }) => {
  const warnings: ContentValidationIssue[] = [];
  const comparisonBySlug = new Map(data.comparisons.map((item) => [item.slug, item]));
  const thinkerBySlug = new Map(data.thinkers.map((item) => [item.slug, item]));
  const themeBySlug = new Map(data.themes.map((item) => [item.slug, item]));
  data.thinkers.forEach((thinker) => thinker.relatedComparisonSlugs.forEach((slug) => {
    const comparison = comparisonBySlug.get(slug);
    if (comparison && comparison.leftThinkerSlug !== thinker.slug && comparison.rightThinkerSlug !== thinker.slug) warnings.push({ scope: "thinker", slug: thinker.slug, message: `editorial related comparison does not contain thinker: ${slug}` });
  }));
  data.themes.forEach((theme) => theme.relatedComparisonSlugs.forEach((slug) => {
    const comparison = comparisonBySlug.get(slug);
    if (comparison && !comparison.themeSlugs.includes(theme.slug)) warnings.push({ scope: "theme", slug: theme.slug, message: `editorial related comparison does not contain theme: ${slug}` });
  }));
  data.thinkers.forEach((thinker) => thinker.relatedThemeSlugs.forEach((slug) => {
    const theme = themeBySlug.get(slug);
    if (theme && !theme.relatedThinkerSlugs.includes(thinker.slug)) warnings.push({ scope: "thinker", slug: thinker.slug, message: `theme does not link back to thinker: ${slug}` });
  }));
  data.themes.forEach((theme) => theme.relatedThinkerSlugs.forEach((slug) => {
    const thinker = thinkerBySlug.get(slug);
    if (thinker && !thinker.relatedThemeSlugs.includes(theme.slug)) warnings.push({ scope: "theme", slug: theme.slug, message: `thinker does not link back to theme: ${slug}` });
  }));
  return warnings;
};

export const assertContentRelations = () => {
  const issues = validateContentRelations();
  if (issues.length) throw new Error(`Content validation failed:\n${issues.map((issue) => `- [${issue.scope}:${issue.slug}] ${issue.message}`).join("\n")}`);
};
