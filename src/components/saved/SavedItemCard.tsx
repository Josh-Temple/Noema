import Link from "next/link";
import { ChevronRightIcon, CompareIcon, ThemeIcon, ThinkerIcon } from "@/components/common/icons";

const kindMeta = (href: string) => {
  if (href.startsWith("/thinkers/")) return { label: "思想家", icon: ThinkerIcon };
  if (href.startsWith("/themes/")) return { label: "テーマ", icon: ThemeIcon };
  return { label: "比較", icon: CompareIcon };
};

export const SavedItemCard = ({ title, href }: { title: string; href: string }) => {
  const { label, icon: Icon } = kindMeta(href);

  return (
    <Link href={href} className="mb-2 block border-b border-noema-line/30 px-1 py-3 transition hover:bg-white/[0.02]">
      <p className="mb-1 inline-flex items-center gap-1 text-[11px] text-[#bdc9ed]">
        <Icon className="h-3 w-3" />
        <span>{label}</span>
      </p>
      <p className="flex items-center justify-between">
        <span>{title}</span>
        <ChevronRightIcon className="h-4 w-4 text-[#b8c5ec]" />
      </p>
    </Link>
  );
};
