import Link from "next/link";
import { SearchResultKind } from "@/types/content";
import { ChevronRightIcon, CompareIcon, ThemeIcon, ThinkerIcon } from "@/components/common/icons";

const kindConfig: Record<SearchResultKind, { label: string; icon: typeof CompareIcon }> = {
  comparison: { label: "比較", icon: CompareIcon },
  thinker: { label: "思想家", icon: ThinkerIcon },
  theme: { label: "テーマ", icon: ThemeIcon },
};

export const SearchResultCard = ({ title, subtitle, href, kind = "comparison" }: { title: string; subtitle: string; href: string; kind?: SearchResultKind }) => {
  const config = kindConfig[kind];
  const Icon = config.icon;

  return (
    <Link href={href} className="flex items-center justify-between gap-4 border-b border-noema-line py-4 transition duration-300 hover:bg-slate-50">
      <div>
        <p className="mb-1 inline-flex items-center gap-1 text-[0.65rem] font-black uppercase tracking-widest text-noema-blue">
          <Icon className="h-3 w-3" />
          <span>{config.label}</span>
        </p>
        <p className="font-bold">{title}</p>
        <p className="text-sm text-noema-muted">{subtitle}</p>
      </div>
      <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-noema-accent">
        <span>開く</span>
        <ChevronRightIcon className="h-3 w-3" />
      </span>
    </Link>
  );
};
