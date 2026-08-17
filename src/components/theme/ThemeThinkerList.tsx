import Link from "next/link";
import { Thinker } from "@/types/content";
import { thinkerPath } from "@/lib/routes";
import { ThinkerIcon } from "@/components/common/icons";

export const ThemeThinkerList = ({ items }: { items: Thinker[] }) => (
  <section>
    <h3 className="mb-4 flex items-center gap-2 text-xl font-black"><ThinkerIcon className="h-5 w-5 text-noema-accent" /><span>関連思想家</span></h3>
    {items.map((item) => (
      <Link key={item.slug} href={thinkerPath(item.slug)} className="mb-3 block rounded-2xl border border-noema-line bg-white p-4 font-black shadow-sm transition hover:border-noema-accent">
        {item.nameJa}
      </Link>
    ))}
  </section>
);
