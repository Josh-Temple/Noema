import Link from "next/link";
import { Theme } from "@/types/content";
import { themePath } from "@/lib/routes";
import { ThemeIcon } from "@/components/common/icons";

export const RelatedThemeStrip = ({ items }: { items: Theme[] }) => (
  <section className="mb-4">
    <h3 className="mb-2 flex items-center gap-2 text-2xl font-bold"><ThemeIcon className="h-5 w-5 text-noema-accent" /><span>関連テーマ</span></h3>
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <Link key={item.slug} href={themePath(item.slug)} className="rounded-full border border-[#2b3a68] bg-[#1b2744] px-3 py-2 text-sm">
          {index < 4 ? `入口: ${item.titleJa}` : item.titleJa}
        </Link>
      ))}
    </div>
  </section>
);
