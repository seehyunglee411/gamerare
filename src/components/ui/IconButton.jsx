import { cn } from "../../lib/cn.js";

const VARIANTS = {
  default:
    "bg-white text-ink border border-line hover:border-primary hover:text-primary",
  primary: "bg-primary text-white hover:bg-primary-dark border border-transparent",
  ghost:
    "bg-transparent text-ink hover:bg-slate-100 border border-transparent",
  soft: "bg-primary-soft text-primary hover:bg-primary/10 border border-transparent",
  warning: "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100",
};

const SIZES = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
};

export function IconButton({
  variant = "default",
  size = "md",
  shape = "circle",
  className,
  children,
  type = "button",
  ...rest
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center transition-colors duration-150 disabled:opacity-50",
        shape === "circle" ? "rounded-full" : "rounded-xl",
        VARIANTS[variant] ?? VARIANTS.default,
        SIZES[size] ?? SIZES.md,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
