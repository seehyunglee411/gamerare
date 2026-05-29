import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";

const SIZES = {
  sm: "h-9 text-sm px-3",
  md: "h-11 text-[15px] px-3.5",
  lg: "h-12 text-base px-4",
};

const baseField = [
  "w-full rounded-xl bg-white text-ink",
  "border border-line",
  "placeholder:text-slate-400",
  "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
  "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
];

export const Input = forwardRef(function Input(
  {
    size = "md",
    prefix,
    suffix,
    error = false,
    className,
    wrapperClassName,
    ...props
  },
  ref,
) {
  if (prefix || suffix) {
    return (
      <div
        className={cn(
          "flex items-center overflow-hidden rounded-xl border bg-white",
          "border-line focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
          error && "border-rose-500 focus-within:border-rose-500 focus-within:ring-rose-200",
          wrapperClassName,
        )}
      >
        {prefix && (
          <span className="flex items-center border-r border-line bg-slate-50 px-3 text-sm font-black text-muted">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            "min-w-0 flex-1 border-0 bg-transparent outline-none",
            SIZES[size] ?? SIZES.md,
            className,
          )}
          {...props}
        />
        {suffix && (
          <span className="flex items-center border-l border-line bg-slate-50 px-3 text-sm font-black text-muted">
            {suffix}
          </span>
        )}
      </div>
    );
  }

  return (
    <input
      ref={ref}
      className={cn(
        baseField,
        SIZES[size] ?? SIZES.md,
        error && "border-rose-500 focus:border-rose-500 focus:ring-rose-200",
        className,
      )}
      {...props}
    />
  );
});
