import { cn } from "../../lib/cn.js";

const TONES = {
  default: "bg-slate-50 border-slate-100",
  primary: "bg-gradient-to-br from-primary-soft to-white border-primary/20",
  white: "bg-white border-line shadow-card",
};

const VALUE_TONES = {
  default: "text-ink",
  primary: "text-primary",
  blue: "text-info",
};

export function StatCard({
  label,
  value,
  description,
  tone = "default",
  valueTone,
  className,
  children,
}) {
  const resolvedValueTone = valueTone ?? (tone === "primary" ? "primary" : "default");
  return (
    <article
      className={cn(
        "grid gap-2 rounded-2xl border p-5",
        TONES[tone] ?? TONES.default,
        className,
      )}
    >
      {label && <span className="text-sm font-extrabold text-muted">{label}</span>}
      {value !== undefined && (
        <strong
          className={cn(
            "text-3xl font-black leading-tight",
            VALUE_TONES[resolvedValueTone] ?? VALUE_TONES.default,
          )}
        >
          {value}
        </strong>
      )}
      {description && (
        <p className="m-0 text-sm leading-relaxed text-muted">{description}</p>
      )}
      {children}
    </article>
  );
}
