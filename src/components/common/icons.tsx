import { ComponentProps } from "react";

type IconProps = ComponentProps<"svg">;

const base = "h-4 w-4 shrink-0";

const wrap = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: `${base} ${props.className ?? ""}`.trim(),
  "aria-hidden": true,
  ...props,
});

export const HomeIcon = (props: IconProps) => (
  <svg {...wrap(props)}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
);
export const SearchIcon = (props: IconProps) => (
  <svg {...wrap(props)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const CompareIcon = (props: IconProps) => (
  <svg {...wrap(props)}><path d="M4 7h7" /><path d="M4 12h11" /><path d="M4 17h7" /><path d="m18 6 3 3-3 3" /><path d="m15 15 3 3 3-3" /></svg>
);
export const BookmarkIcon = (props: IconProps) => (
  <svg {...wrap(props)}><path d="M7 4h10v16l-5-3-5 3z" /></svg>
);
export const SparkIcon = (props: IconProps) => (
  <svg {...wrap(props)}><path d="m12 3 1.8 4.7L18.5 9l-4.7 1.8L12 15.5l-1.8-4.7L5.5 9l4.7-1.3z" /></svg>
);
export const ThemeIcon = (props: IconProps) => (
  <svg {...wrap(props)}><path d="M12 21s8-4.5 8-11V5l-8-2-8 2v5c0 6.5 8 11 8 11Z" /></svg>
);
export const CompassIcon = (props: IconProps) => (
  <svg {...wrap(props)}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 6.2-6.2 2.2 2.2-6.2z" /></svg>
);
export const ClockIcon = (props: IconProps) => (
  <svg {...wrap(props)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const ThinkerIcon = (props: IconProps) => (
  <svg {...wrap(props)}><circle cx="12" cy="8" r="3" /><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /></svg>
);
export const CheckIcon = (props: IconProps) => (
  <svg {...wrap(props)}><path d="m5 12 4 4L19 6" /></svg>
);
export const ChevronRightIcon = (props: IconProps) => (
  <svg {...wrap(props)}><path d="m9 6 6 6-6 6" /></svg>
);
