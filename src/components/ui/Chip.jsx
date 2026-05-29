import { cn } from "../../lib/cn.js";

const VARIANTS = {
  default: "border border-line bg-white text-slate-600",
  info: "border border-blue-200 bg-blue-50 text-blue-700",
  success: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border border-amber-200 bg-amber-50 text-amber-700",
  danger: "border border-rose-200 bg-rose-50 text-rose-700",
  primary: "border border-primary/30 bg-primary-soft text-primary",
};

export function Chip({ variant = "default", className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-bold",
        VARIANTS[variant] ?? VARIANTS.default,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
