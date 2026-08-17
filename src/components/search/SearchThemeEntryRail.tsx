import Link from "next/link";
import { CompassIcon, ThemeIcon } from "@/components/common/icons";

export const SearchThemeEntryRail = ({ items }: { items: Array<{ slug: string; title: string; description: string; href: string }> }) => (
  <section className="mb-5" aria-labelledby="search-theme-entry-heading">
    <h2 id="search-theme-entry-heading" className="mb-4 border-l-4 border-noema-yellow pl-4 text-xl font-black">
      <CompassIcon className="h-5 w-5 text-noema-accent" />
      <span>テーマから入る</span>
    </h2>
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <Link key={item.slug} href={item.href} className="rounded-2xl border border-noema-line bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-noema-yellow">
          <p className="mb-3 inline-flex items-center gap-1 rounded-full border border-noema-line bg-noema-accentSoft px-2 py-1 text-[0.65rem] font-black uppercase tracking-widest text-noema-accent">
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
