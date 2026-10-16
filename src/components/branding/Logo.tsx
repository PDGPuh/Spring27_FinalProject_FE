import Link from "next/link";

type LogoProps = {
  href?: string;
  variant?: "light" | "dark" | "onDark";
  size?: "sm" | "md";
  showText?: boolean;
};

export function Logo({
  href = "/",
  variant = "light",
  size = "md",
  showText = true,
}: LogoProps) {
  const isDark = variant === "onDark" || variant === "dark";
  const titleColor = isDark ? "text-white" : "text-primary-700";
  const subTitleColor = isDark ? "text-primary-100" : "text-primary-500";
  const iconBoxSize = size === "sm" ? "size-9" : "size-11";
  const titleSize = size === "sm" ? "text-[14px]" : "text-[16px]";

  const content = (
    <span className="inline-flex shrink-0 items-center gap-3 whitespace-nowrap">
      <span
        className={`${iconBoxSize} relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] border ${
          isDark
            ? "border-white/25 bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-xs"
            : "border-primary-200 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white shadow-xs"
        }`}
        aria-hidden
      >
        <svg viewBox="0 0 28 28" className={size === "sm" ? "size-5" : "size-6"} fill="none">
          <rect
            x="2.5"
            y="2.5"
            width="23"
            height="23"
            rx="6"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="1.2"
          />
          <path
            d="M14 5.5v17M9.5 9.5c2-1.2 7-1.2 9 0M8.5 13.5c2.5-1.3 8.5-1.3 11 0M9.8 17.5c1.8-1 6.6-1 8.4 0"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <circle
            cx="19.5"
            cy="8.5"
            r="2.2"
            fill="#52c8f4"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </span>
      {showText && (
        <span className="flex flex-col leading-tight">
          <span
            className={`font-extrabold tracking-tight ${titleSize} ${titleColor}`}
          >
            Hệ thống X-quang AI
          </span>
          <span
            className={`mt-0.5 text-[11px] font-semibold uppercase tracking-[0.04em] ${subTitleColor}`}
          >
            Radiology Workflow · Explainable AI
          </span>
        </span>
      )}
    </span>
  );

  if (!href) return content;
  return (
    <Link
      href={href}
      className="inline-flex shrink-0 rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {content}
    </Link>
  );
}
