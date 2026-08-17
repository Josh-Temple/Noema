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
    <Link href={href} className="mb-2 block rounded-xl border-b border-noema-line px-3 py-4 transition duration-300 hover:bg-slate-50">
      <p className="mb-1 inline-flex items-center gap-1 text-[0.65rem] font-black uppercase tracking-widest text-noema-blue">
        <Icon className="h-3 w-3" />
        <span>{label}</span>
      </p>
      <p className="flex items-center justify-between">
        <span>{title}</span>
        <ChevronRightIcon className="h-4 w-4 text-noema-accent" />
      </p>
    </Link>
  );
};
