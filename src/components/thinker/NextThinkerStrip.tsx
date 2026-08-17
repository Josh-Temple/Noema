import Link from "next/link";
import { Thinker } from "@/types/content";
import { thinkerPath } from "@/lib/routes";
import { ThinkerIcon } from "@/components/common/icons";

export const NextThinkerStrip = ({ items }: { items: Thinker[] }) => (
  <section>
    <h3 className="mb-4 flex items-center gap-2 text-xl font-black"><ThinkerIcon className="h-5 w-5 text-noema-blue" /><span>次に見る思想家</span></h3>
    {items.map((item, index) => (
      <Link key={item.slug} href={thinkerPath(item.slug)} className="mb-3 block rounded-2xl border border-noema-line bg-white p-4 shadow-sm transition hover:border-noema-blue">
        <p className="text-noema-text">{item.nameJa}</p>
        {index < 2 ? <p className="mt-1 text-xs text-noema-muted">このテーマに近い橋渡し</p> : null}
      </Link>
    ))}
  </section>
);
