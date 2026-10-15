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
  const textClass =
    variant === "onDark" || variant === "dark"
      ? "text-white"
      : "text-text";
  const iconBg =
    variant === "onDark" || variant === "dark"
      ? "bg-primary text-white"
      : "bg-primary text-white";
  const iconSize = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const titleSize = size === "sm" ? "text-sm" : "text-[15px]";

  const content = (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`${iconSize} inline-flex items-center justify-center rounded-[8px] ${iconBg}`}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M12 3v18M8 7h8M7 12h10M9 17h6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
      {showText && (
        <span className={`font-semibold tracking-tight ${titleSize} ${textClass}`}>
          Hệ thống X-quang AI
        </span>
      )}
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} className="inline-flex shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-[8px]">
      {content}
    </Link>
  );
}
