import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";

export const Textarea = forwardRef(function Textarea(
  { error = false, className, rows = 6, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full rounded-xl border bg-white px-3.5 py-3 text-[15px] text-ink",
        "border-line placeholder:text-slate-400",
        "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
        error && "border-rose-500 focus:border-rose-500 focus:ring-rose-200",
        className,
      )}
      {...props}
    />
  );
});
