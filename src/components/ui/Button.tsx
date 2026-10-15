import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "soft";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-sm shadow-primary/20",
  secondary:
    "bg-white text-text border border-border hover:bg-background",
  outline:
    "bg-transparent text-text border border-border hover:bg-background",
  ghost: "bg-transparent text-text-secondary hover:bg-black/[0.04] hover:text-text",
  danger: "bg-critical text-white hover:bg-red-700",
  soft: "bg-primary-soft text-primary-dark hover:bg-cyan-100",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
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
  const classes = `btn-press inline-flex items-center justify-center gap-2 rounded-[8px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`;

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
