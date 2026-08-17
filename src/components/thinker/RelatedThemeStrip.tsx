import Link from "next/link";
import { Theme } from "@/types/content";
import { themePath } from "@/lib/routes";
import { ThemeIcon } from "@/components/common/icons";

export const RelatedThemeStrip = ({ items }: { items: Theme[] }) => (
  <section className="mb-4">
    <h3 className="mb-4 flex items-center gap-2 text-xl font-black"><ThemeIcon className="h-5 w-5 text-noema-yellow" /><span>関連テーマ</span></h3>
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <Link key={item.slug} href={themePath(item.slug)} className="rounded-full border border-noema-line bg-white px-3 py-2 text-sm font-bold shadow-sm transition hover:border-noema-yellow hover:text-noema-yellow">
          {index < 4 ? `入口: ${item.titleJa}` : item.titleJa}
        </Link>
      ))}
    </div>
  </section>
);
