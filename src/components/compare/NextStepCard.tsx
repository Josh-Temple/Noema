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
          ? "group block rounded-xl px-3 py-3 text-noema-muted transition duration-300 hover:bg-slate-50"
          : "mb-3 block rounded-xl border border-noema-line bg-white px-4 py-4 text-noema-muted shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-noema-blue"
      }
    >
      <p
        className={
          isRow
            ? "mb-1 inline-flex items-center gap-1 text-[0.65rem] font-black uppercase tracking-widest text-noema-blue"
            : "mb-1 inline-flex items-center gap-1 text-[0.65rem] font-black uppercase tracking-widest text-noema-blue"
        }
      >
        <Icon className="h-3 w-3" />
        <span>{label}</span>
      </p>
      <p className="flex items-center justify-between gap-2 text-noema-text">
        <span className={isRow ? "text-[15px]" : ""}>{title}</span>
        <ChevronRightIcon className={`h-4 w-4 ${isRow ? "text-noema-blue" : "text-noema-accent"}`} />
      </p>
      {subtitle ? <p className="mt-1 text-xs leading-relaxed text-noema-muted">{subtitle}</p> : null}
    </Link>
  );
};
