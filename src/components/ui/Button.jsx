import { AppLink } from "../AppLink.jsx";
import { cn } from "../../lib/cn.js";

const VARIANTS = {
  primary:
    "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark",
  ghost:
    "bg-transparent text-primary border border-primary/60 hover:bg-primary-soft",
  outline:
    "bg-white text-ink border border-line hover:border-primary hover:text-primary",
  soft: "bg-primary-soft text-primary hover:bg-primary/10",
  info: "bg-info text-white hover:bg-blue-700",
  dark: "bg-ink text-white hover:bg-slate-800",
};

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
  xl: "h-14 px-8 text-base",
};

function resolveTag(props) {
  if (props.route) return AppLink;
  if (props.href) return "a";
  return "button";
}

export function Button({
  route,
  params,
  href,
  type,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...rest
}) {
  const Tag = resolveTag({ route, href });

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-black whitespace-nowrap",
    "transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
    "no-underline",
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    fullWidth && "w-full",
    className,
  );

  if (Tag === AppLink) {
    return (
      <AppLink route={route} params={params} className={classes} {...rest}>
        {children}
      </AppLink>
    );
  }

  if (Tag === "a") {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}
