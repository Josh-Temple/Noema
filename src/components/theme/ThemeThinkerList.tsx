import Link from "next/link";
import { Thinker } from "@/types/content";
import { thinkerPath } from "@/lib/routes";

export const ThemeThinkerList = ({ items }: { items: Thinker[] }) => (
  <section>
    <h3 className="mb-2 text-2xl font-bold">関連思想家</h3>
    {items.map((item) => (
      <Link key={item.slug} href={thinkerPath(item.slug)} className="mb-2 block rounded-card border border-noema-line bg-gradient-to-b from-[#13163a] to-[#0d102f] p-3">
        {item.nameJa}
      </Link>
    ))}
  </section>
);
