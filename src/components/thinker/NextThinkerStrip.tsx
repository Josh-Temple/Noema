import Link from "next/link";
import { Thinker } from "@/types/content";
import { thinkerPath } from "@/lib/routes";
import { ThinkerIcon } from "@/components/common/icons";

export const NextThinkerStrip = ({ items }: { items: Thinker[] }) => (
  <section>
    <h3 className="mb-2 flex items-center gap-2 text-2xl font-bold"><ThinkerIcon className="h-5 w-5 text-noema-accent" /><span>次に見る思想家</span></h3>
    {items.map((item, index) => (
      <Link key={item.slug} href={thinkerPath(item.slug)} className="mb-2 block rounded-card border border-noema-line bg-gradient-to-b from-[#13163a] to-[#0d102f] p-3">
        <p className="text-noema-text">{item.nameJa}</p>
        {index < 2 ? <p className="mt-1 text-xs text-[#aebbe5]">このテーマに近い橋渡し</p> : null}
      </Link>
    ))}
  </section>
);
