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
    <Link href={href} className="flex items-center justify-between border-b border-[#253257] py-3">
      <div>
        <p className="mb-1 inline-flex items-center gap-1 rounded-full border border-[#33457c] bg-[#131c37] px-2 py-0.5 text-[11px] text-[#dee6ff]">
          <Icon className="h-3 w-3" />
          <span>{config.label}</span>
        </p>
        <p className="font-bold">{title}</p>
        <p className="text-sm text-noema-muted">{subtitle}</p>
      </div>
      <span className="inline-flex items-center gap-1 rounded-full border border-[#33457c] bg-[#131c37] px-3 py-1 text-xs text-[#dee6ff]">
        <span>開く</span>
        <ChevronRightIcon className="h-3 w-3" />
      </span>
    </Link>
  );
};
