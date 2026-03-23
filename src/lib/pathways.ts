import { comparisons, themes } from "@/lib/content";
import { HomePathwayRail, ThemePathwayConfig } from "@/types/content";

export const PRIORITY_THEME_SLUGS = ["human-nature", "state-legitimacy", "freedom", "society-power"] as const;

export const PRIORITY_THEME_PATHWAYS: ThemePathwayConfig[] = [
  {
    slug: "human-nature",
    eyebrow: "このテーマの入口",
    starterLabel: "まずはこの比較から",
    starterDescription: "人間観の分岐が見えやすい比較から入り、20世紀と東洋思想の両方へ伸ばします。",
    starterComparisonSlugs: ["mencius-xunzi", "heidegger-sartre", "confucius-laozi"],
    groups: [
      { id: "bridges-20th", title: "20世紀への入口", description: "現象学から実存思想へ。", comparisonSlugs: ["husserl-heidegger", "heidegger-sartre", "sartre-beauvoir"] },
      { id: "east-asian", title: "東洋思想への入口", description: "性善・性悪と道家/儒家の人間観。", comparisonSlugs: ["mencius-xunzi", "confucius-laozi", "laozi-zhuangzi"] },
      { id: "western-basics", title: "西洋思想の基礎比較", description: "古代から入る別ルート。", comparisonSlugs: ["plato-epicurus", "aristotle-stoicism"] },
    ],
  },
  {
    slug: "state-legitimacy",
    eyebrow: "ここから入ると流れがつかみやすい",
    starterLabel: "このテーマの入口",
    starterDescription: "秩序設計の比較から入り、東洋思想と近代〜20世紀政治思想をつなぎます。",
    starterComparisonSlugs: ["xunzi-hanfeizi", "hanfeizi-hobbes", "arendt-marx"],
    groups: [
      { id: "east-asian", title: "東洋思想への入口", description: "徳治・礼法・法治の分岐をつかむ。", comparisonSlugs: ["confucius-mencius", "xunzi-hanfeizi", "confucius-mozi"] },
      { id: "bridges-20th", title: "20世紀への入口", description: "国家の正当化を政治的行為や権力批判へ開く。", comparisonSlugs: ["arendt-marx", "foucault-arendt"] },
      { id: "western-basics", title: "西洋思想の基礎比較", description: "社会契約から見直す。", comparisonSlugs: ["hobbes-locke", "locke-rousseau", "hobbes-rousseau"] },
    ],
  },
  {
    slug: "freedom",
    eyebrow: "まずはここから",
    starterLabel: "まずはこの比較から",
    starterDescription: "自由を実存・制度・脱力の三つの入口から比べられるようにします。",
    starterComparisonSlugs: ["nietzsche-sartre", "sartre-beauvoir", "laozi-zhuangzi"],
    groups: [
      { id: "bridges-20th", title: "20世紀への入口", description: "実存と状況の自由。", comparisonSlugs: ["nietzsche-sartre", "heidegger-sartre", "sartre-beauvoir"] },
      { id: "east-asian", title: "東洋思想への入口", description: "無為・視点転換・役割倫理の距離感。", comparisonSlugs: ["laozi-zhuangzi", "confucius-zhuangzi"] },
      { id: "western-basics", title: "西洋思想の基礎比較", description: "制度と自由の関係から入る。", comparisonSlugs: ["hobbes-locke", "locke-rousseau", "bentham-mill"] },
    ],
  },
  {
    slug: "society-power",
    eyebrow: "比較の入口",
    starterLabel: "まずはこの比較から",
    starterDescription: "権力の働き方を、統治技術・公共空間・近代国家の比較から見えるようにします。",
    starterComparisonSlugs: ["foucault-arendt", "xunzi-hanfeizi", "hanfeizi-hobbes"],
    groups: [
      { id: "bridges-20th", title: "20世紀への入口", description: "権力批判と公共性論。", comparisonSlugs: ["foucault-arendt", "arendt-marx", "sartre-beauvoir"] },
      { id: "east-asian", title: "東洋思想への入口", description: "礼法・法家・国家秩序の比較。", comparisonSlugs: ["xunzi-hanfeizi", "hanfeizi-hobbes"] },
      { id: "western-basics", title: "同じテーマの別ルート", description: "契約論から社会の成り立ちを見直す。", comparisonSlugs: ["hobbes-rousseau", "rawls-marx"] },
    ],
  },
];

export const HOME_THEME_ENTRY_THEMES = PRIORITY_THEME_SLUGS.map((slug) => themes.find((theme) => theme.slug === slug)).filter((theme): theme is NonNullable<typeof theme> => Boolean(theme));

export const HOME_PATHWAY_RAILS: HomePathwayRail[] = [
  {
    id: "twentieth-century",
    title: "20世紀への入口",
    description: "現象学・実存・政治思想の橋渡し比較。",
    comparisonSlugs: ["husserl-heidegger", "heidegger-sartre", "arendt-marx"],
  },
  {
    id: "east-asian",
    title: "東洋思想への入口",
    description: "儒家・道家・法家へ入りやすい比較。",
    comparisonSlugs: ["confucius-laozi", "mencius-xunzi", "xunzi-hanfeizi"],
  },
];

export const PATHWAY_SEARCH_TERMS: Record<string, string[]> = {
  human: ["人間", "human", "human nature", "human-nature", "性善", "性悪"],
  freedom: ["自由", "freedom", "existentialism", "実存", "phenomenology", "現象学", "daoism", "道家"],
  state: ["国家", "state", "legitimacy", "正当", "儒家", "法家", "legalism"],
  power: ["権力", "power", "society", "社会", "foucault", "arendt", "mohism", "墨家"],
  east: ["東洋思想", "confucianism", "daoism", "mohism", "legalism", "儒家", "道家", "墨家", "法家"],
  twentieth: ["20世紀", "20th", "phenomenology", "existentialism", "現象学", "実存", "権力"],
};

export const getPriorityThemePathway = (themeSlug: string) => PRIORITY_THEME_PATHWAYS.find((item) => item.slug === themeSlug);

export const getComparisonBySlugs = (slugs: string[]) =>
  slugs.map((slug) => comparisons.find((comparison) => comparison.slug == slug)).filter((comparison): comparison is NonNullable<typeof comparison> => Boolean(comparison));

export const isPriorityTheme = (themeSlug: string) => PRIORITY_THEME_SLUGS.includes(themeSlug as (typeof PRIORITY_THEME_SLUGS)[number]);

export const isEastAsianComparison = (comparisonSlug: string) =>
  ["confucius-laozi", "confucius-mencius", "laozi-zhuangzi", "confucius-zhuangzi", "confucius-aristotle", "mencius-xunzi", "confucius-mozi", "xunzi-hanfeizi", "mozi-mencius", "hanfeizi-hobbes"].includes(comparisonSlug);

export const isTwentiethCenturyComparison = (comparisonSlug: string) =>
  ["husserl-heidegger", "heidegger-sartre", "sartre-beauvoir", "arendt-marx", "foucault-arendt", "nietzsche-sartre", "kant-nietzsche"].includes(comparisonSlug);
