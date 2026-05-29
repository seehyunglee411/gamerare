import { AppLink } from "../AppLink.jsx";
import { cn } from "../../lib/cn.js";

const VARIANTS = {
  pill: {
    list: "inline-flex items-center gap-1 rounded-full bg-slate-200 p-1",
    tab: "inline-flex min-w-[92px] items-center justify-center rounded-full px-4 py-2 text-sm font-black text-slate-600 transition-colors",
    activeTab: "bg-primary text-white shadow-primarySm",
  },
  underline: {
    list: "flex items-center gap-6 border-b border-line",
    tab: "relative inline-flex items-center px-1 py-3 text-sm font-bold text-slate-500 hover:text-ink",
    activeTab:
      "text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-[3px] after:bg-primary",
  },
  segmented: {
    list: "inline-flex items-center overflow-hidden rounded-xl border border-line bg-white",
    tab: "inline-flex min-w-[80px] items-center justify-center border-l border-line px-4 py-2 text-sm font-bold text-slate-600 first:border-l-0 hover:bg-slate-50",
    activeTab: "bg-primary-soft text-primary",
  },
};

export function Tabs({ variant = "pill", className, children, ...props }) {
  const styles = VARIANTS[variant] ?? VARIANTS.pill;
  return (
    <div
      role="tablist"
      className={cn(styles.list, className)}
      data-variant={variant}
      {...props}
    >
      {children}
    </div>
  );
}

function getStyles(variant) {
  return VARIANTS[variant] ?? VARIANTS.pill;
}

function getVariantFromContext(el) {
  // Walk up to find the parent <div data-variant="..."> rendered by Tabs.
  // For simplicity we accept the variant as a prop on each Tab instead.
  return el;
}

Tabs.Item = function TabsItem({
  active,
  route,
  params,
  href,
  onClick,
  variant = "pill",
  className,
  children,
  ...rest
}) {
  const styles = getStyles(variant);
  void getVariantFromContext;
  const classes = cn(
    styles.tab,
    active && styles.activeTab,
    "cursor-pointer",
    className,
  );

  if (route) {
    return (
      <AppLink
        route={route}
        params={params}
        role="tab"
        aria-selected={Boolean(active)}
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {children}
      </AppLink>
    );
  }

  if (href) {
    return (
      <a
        role="tab"
        aria-selected={Boolean(active)}
        className={classes}
        href={href}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      role="tab"
      aria-selected={Boolean(active)}
      className={classes}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
