import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "soft";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 shadow-[0_4px_12px_rgba(13,113,186,0.24)] border border-primary-600",
  secondary:
    "bg-white text-primary-700 border border-primary-600/80 hover:bg-primary-50 hover:border-primary-700 hover:text-primary-800 shadow-2xs",
  outline:
    "bg-white text-primary-950 border border-primary-200 hover:border-primary-600 hover:text-primary-700 hover:bg-primary-50/50",
  ghost:
    "bg-transparent text-text-secondary hover:bg-primary-50 hover:text-primary-700",
  danger:
    "bg-critical text-white hover:bg-red-700 border border-critical shadow-2xs",
  soft:
    "bg-primary-50 text-primary-800 border border-primary-200 hover:bg-primary-600 hover:text-white hover:border-primary-600",
};

const sizes: Record<Size, string> = {
  sm: "h-10.5 px-4.5 text-[14px]",
  md: "h-11.5 px-5.5 text-[15px]",
  lg: "h-13 px-7 text-[16px]",
};

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common & {
  href: string;
  type?: never;
  disabled?: boolean;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = `btn-press inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-500/30 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, disabled, ...rest } = props;
    if (disabled) {
      return <span className={classes}>{children}</span>;
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
