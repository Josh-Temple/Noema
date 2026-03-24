import Link from "next/link";
import { Theme } from "@/types/content";
import { themePath } from "@/lib/routes";
import { TagChip } from "@/components/common/TagChip";
import { ThemeIcon } from "@/components/common/icons";

export const ThemeChipGrid = ({ items }: { items: Theme[] }) => (
  <div className="flex flex-wrap gap-1.5 rounded-card bg-[#0f1630]/30 p-1.5">
    {items.map((item) => (
      <Link key={item.slug} href={themePath(item.slug)}>
        <TagChip label={item.titleJa} icon={<ThemeIcon className="h-3 w-3" />} />
      </Link>
    ))}
  </div>
);
