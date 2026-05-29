import { cn } from "../../lib/cn.js";

const TONES = {
  primary: "bg-primary text-white",
  light: "bg-white/20 text-white",
  soft: "bg-primary-soft text-primary",
  ghost: "bg-slate-100 text-slate-600",
};

export function Eyebrow({ tone = "soft", className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1.5 text-[12px] font-black tracking-[0.08em]",
        TONES[tone] ?? TONES.soft,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
