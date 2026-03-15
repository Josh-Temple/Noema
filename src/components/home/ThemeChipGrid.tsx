import Link from "next/link";
import { Theme } from "@/types/content";
import { themePath } from "@/lib/routes";
import { TagChip } from "@/components/common/TagChip";

export const ThemeChipGrid = ({ items }: { items: Theme[] }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <Link key={item.slug} href={themePath(item.slug)}>
        <TagChip label={item.titleJa} />
      </Link>
    ))}
  </div>
);
