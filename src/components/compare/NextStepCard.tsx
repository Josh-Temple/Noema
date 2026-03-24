import Link from "next/link";
import { ChevronRightIcon, CompareIcon, ThemeIcon, ThinkerIcon } from "@/components/common/icons";

const typeMeta = (href: string) => {
  if (href.startsWith("/thinkers/")) return { label: "思想家", icon: ThinkerIcon };
  if (href.startsWith("/themes/")) return { label: "テーマ", icon: ThemeIcon };
  return { label: "比較", icon: CompareIcon };
};

export const NextStepCard = ({
  title,
  href,
  subtitle,
  variant = "card",
}: {
  title: string;
  href: string;
  subtitle?: string;
  variant?: "card" | "row";
}) => {
  const { label, icon: Icon } = typeMeta(href);
  const isRow = variant === "row";

  return (
    <Link
      href={href}
      className={
        isRow
          ? "group block rounded-md px-1 py-2 text-noema-muted transition hover:bg-white/[0.03]"
          : "mb-2 block rounded-card border border-noema-line/80 bg-gradient-to-b from-[#13163a] to-[#0d102f] p-3 text-noema-muted"
      }
    >
      <p
        className={
          isRow
            ? "mb-1 inline-flex items-center gap-1 text-[11px] text-[#b9c6ee]"
            : "mb-1 inline-flex items-center gap-1 rounded-full border border-[#33457c] bg-[#131c37] px-2 py-0.5 text-[11px] text-[#dce6ff]"
        }
      >
        <Icon className="h-3 w-3" />
        <span>{label}</span>
      </p>
      <p className="flex items-center justify-between gap-2 text-noema-text">
        <span>{title}</span>
        <ChevronRightIcon className={`h-4 w-4 ${isRow ? "text-[#9baad7] group-hover:text-[#c2d0f5]" : "text-[#b8c5ec]"}`} />
      </p>
      {subtitle ? <p className={`mt-1 text-xs ${isRow ? "text-[#95a4d2]" : "text-[#aebbe5]"}`}>{subtitle}</p> : null}
    </Link>
  );
};
