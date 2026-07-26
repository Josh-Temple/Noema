export type SourceReference = {
  id: string;
  author?: string;
  title: string;
  originalTitle?: string;
  workType?: "primary" | "secondary";
  publicationYear?: string;
  translator?: string;
  publisher?: string;
  edition?: string;
  locator?: string;
  url?: string;
  note?: string;
};

export type Quotation = {
  text: string;
  sourceId?: string;
  locator?: string;
  originalText?: string;
  language?: string;
  translationType?: "noema" | "published" | "unknown";
  translator?: string;
  isParaphrase: boolean;
  note?: string;
};

export type Thinker = {
  slug: string;
  nameJa: string;
  nameEn: string;
  eraLabel: string;
  yearsLabel: string;
  oneLiner: string;
  quote: Quotation;
  coreQuestion: string;
  basicAnswer: string;
  opposedTo: string;
  epistemology: string;
  viewOfHuman: string;
  ethicalPoliticalImplication: string;
  laterInfluence: string;
  keyConcepts: string[];
  keyWorks: string[];
  relatedThemeSlugs: string[];
  relatedThinkerSlugs: string[];
  relatedComparisonSlugs: string[];
};

export type ComparisonSection = {
  title: string;
  leftView: string;
  rightView: string;
  takeaway: string;
};

export type Comparison = {
  slug: string;
  leftThinkerSlug: string;
  rightThinkerSlug: string;
  titleJa: string;
  subtitle: string;
  themeSlugs: string[];
  whyThisComparisonMatters: string;
  whatToWatch: string[];
  summaryDifference: string;
  commonGround: string;
  sections: ComparisonSection[];
  nextThinkerSlugs: string[];
  nextComparisonSlugs: string[];
  nextThemeSlugs: string[];
  sourceIds?: string[];
};

export type Theme = {
  slug: string;
  titleJa: string;
  titleEn?: string;
  shortDescription: string;
  relatedThinkerSlugs: string[];
  relatedComparisonSlugs: string[];
  starterGuidance: string;
};

export type SearchResultKind = "thinker" | "comparison" | "theme";

export type SearchEntry = {
  id: string;
  kind: SearchResultKind;
  title: string;
  subtitle: string;
  keywords: string[];
  href: string;
};

export type ThemePathwayGroup = {
  id: string;
  title: string;
  description?: string;
  comparisonSlugs: string[];
};

export type ThemeReadingOrderRoute = {
  title: string;
  description?: string;
  comparisonSlugs: string[];
};

export type ThemeReadingOrder = {
  eyebrow?: string;
  title: string;
  first: ThemeReadingOrderRoute;
  next?: ThemeReadingOrderRoute;
  detour?: ThemeReadingOrderRoute;
};

export type ThemePathwayConfig = {
  slug: string;
  eyebrow: string;
  starterLabel: string;
  starterDescription: string;
  starterComparisonSlugs: string[];
  groups: ThemePathwayGroup[];
  readingOrder?: ThemeReadingOrder;
};

export type HomePathwayRail = {
  id: string;
  title: string;
  description: string;
  comparisonSlugs: string[];
};
