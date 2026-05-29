import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";

const SIZES = {
  sm: "h-9 text-sm pl-3 pr-9",
  md: "h-11 text-[15px] pl-3.5 pr-10",
  lg: "h-12 text-base pl-4 pr-10",
};

export const Select = forwardRef(function Select(
  { size = "md", error = false, className, children, ...props },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "w-full appearance-none rounded-xl border bg-white text-ink",
          "border-line focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
          "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
          SIZES[size] ?? SIZES.md,
          error && "border-rose-500 focus:border-rose-500 focus:ring-rose-200",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
      >
        ▾
      </span>
    </div>
  );
});
