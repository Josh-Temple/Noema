import Link from "next/link";
import { CompassIcon, ThemeIcon } from "@/components/common/icons";

export const SearchThemeEntryRail = ({ items }: { items: Array<{ slug: string; title: string; description: string; href: string }> }) => (
  <section className="mb-5" aria-labelledby="search-theme-entry-heading">
    <h2 id="search-theme-entry-heading" className="mb-2 flex items-center gap-2 text-2xl font-bold">
      <CompassIcon className="h-5 w-5 text-noema-accent" />
      <span>テーマから入る</span>
    </h2>
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <Link key={item.slug} href={item.href} className="rounded-card border border-noema-line bg-gradient-to-b from-[#13163a] to-[#0d102f] p-3">
          <p className="mb-1 inline-flex items-center gap-1 rounded-full border border-[#33457c] bg-[#131c37] px-2 py-0.5 text-[11px] text-[#dce6ff]">
            <ThemeIcon className="h-3 w-3" />
            <span>テーマ</span>
          </p>
          <p className="font-bold text-noema-text">{item.title}</p>
          <p className="mt-1 text-sm text-noema-muted">{item.description}</p>
        </Link>
      ))}
    </div>
  </section>
);
