import { comparisons, getComparisonBySlug, getThemeBySlug, getThinkerBySlug, themes, thinkers } from "@/lib/content";

export type ContentValidationIssue = {
  scope: "thinker" | "comparison" | "theme";
  slug: string;
  message: string;
};

const pushIssue = (issues: ContentValidationIssue[], issue: ContentValidationIssue) => {
  issues.push(issue);
};

export const validateContentRelations = () => {
  const issues: ContentValidationIssue[] = [];

  for (const thinker of thinkers) {
    for (const relatedThinkerSlug of thinker.relatedThinkerSlugs) {
      if (!getThinkerBySlug(relatedThinkerSlug)) {
        pushIssue(issues, {
          scope: "thinker",
          slug: thinker.slug,
          message: `relatedThinkerSlugs contains missing thinker: ${relatedThinkerSlug}`,
        });
      }
    }

    for (const relatedThemeSlug of thinker.relatedThemeSlugs) {
      if (!getThemeBySlug(relatedThemeSlug)) {
        pushIssue(issues, {
          scope: "thinker",
          slug: thinker.slug,
          message: `relatedThemeSlugs contains missing theme: ${relatedThemeSlug}`,
        });
      }
    }

    for (const relatedComparisonSlug of thinker.relatedComparisonSlugs) {
      if (!getComparisonBySlug(relatedComparisonSlug)) {
        pushIssue(issues, {
          scope: "thinker",
          slug: thinker.slug,
          message: `relatedComparisonSlugs contains missing comparison: ${relatedComparisonSlug}`,
        });
      }
    }
  }

  for (const comparison of comparisons) {
    if (!getThinkerBySlug(comparison.leftThinkerSlug)) {
      pushIssue(issues, {
        scope: "comparison",
        slug: comparison.slug,
        message: `leftThinkerSlug is missing: ${comparison.leftThinkerSlug}`,
      });
    }

    if (!getThinkerBySlug(comparison.rightThinkerSlug)) {
      pushIssue(issues, {
        scope: "comparison",
        slug: comparison.slug,
        message: `rightThinkerSlug is missing: ${comparison.rightThinkerSlug}`,
      });
    }

    for (const themeSlug of comparison.themeSlugs) {
      if (!getThemeBySlug(themeSlug)) {
        pushIssue(issues, {
          scope: "comparison",
          slug: comparison.slug,
          message: `themeSlugs contains missing theme: ${themeSlug}`,
        });
      }
    }

    for (const nextThinkerSlug of comparison.nextThinkerSlugs) {
      if (!getThinkerBySlug(nextThinkerSlug)) {
        pushIssue(issues, {
          scope: "comparison",
          slug: comparison.slug,
          message: `nextThinkerSlugs contains missing thinker: ${nextThinkerSlug}`,
        });
      }
    }

    for (const nextThemeSlug of comparison.nextThemeSlugs) {
      if (!getThemeBySlug(nextThemeSlug)) {
        pushIssue(issues, {
          scope: "comparison",
          slug: comparison.slug,
          message: `nextThemeSlugs contains missing theme: ${nextThemeSlug}`,
        });
      }
    }

    for (const nextComparisonSlug of comparison.nextComparisonSlugs) {
      if (!getComparisonBySlug(nextComparisonSlug)) {
        pushIssue(issues, {
          scope: "comparison",
          slug: comparison.slug,
          message: `nextComparisonSlugs contains missing comparison: ${nextComparisonSlug}`,
        });
      }
    }
  }

  for (const theme of themes) {
    for (const relatedThinkerSlug of theme.relatedThinkerSlugs) {
      if (!getThinkerBySlug(relatedThinkerSlug)) {
        pushIssue(issues, {
          scope: "theme",
          slug: theme.slug,
          message: `relatedThinkerSlugs contains missing thinker: ${relatedThinkerSlug}`,
        });
      }
    }

    for (const relatedComparisonSlug of theme.relatedComparisonSlugs) {
      if (!getComparisonBySlug(relatedComparisonSlug)) {
        pushIssue(issues, {
          scope: "theme",
          slug: theme.slug,
          message: `relatedComparisonSlugs contains missing comparison: ${relatedComparisonSlug}`,
        });
      }
    }
  }

  return issues;
};

export const assertContentRelations = () => {
  const issues = validateContentRelations();
  if (issues.length > 0) {
    throw new Error(`Content relation validation failed:\n${issues.map((issue) => `- [${issue.scope}:${issue.slug}] ${issue.message}`).join("\n")}`);
  }
};
