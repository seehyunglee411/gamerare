import { Eyebrow } from "../ui/Eyebrow.jsx";
import { cn } from "../../lib/cn.js";

export function PageHero({
  eyebrow,
  title,
  description,
  aside,
  tone = "white",
  className,
}) {
  return (
    <header
      className={cn(
        "grid items-end gap-7 rounded-cardLg border border-line shadow-card",
        "p-7 md:p-9",
        tone === "white" && "bg-white",
        tone === "primary" && "bg-gradient-to-br from-primary-soft to-white",
        aside ? "md:grid-cols-[minmax(0,0.9fr)_minmax(380px,1fr)]" : "",
        className,
      )}
    >
      <div className="grid gap-3 min-w-0">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {title && (
          <h2 className="m-0 text-3xl font-black tracking-tight text-ink md:text-[34px]">
            {title}
          </h2>
        )}
        {description && (
          <p className="m-0 text-base leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
      {aside && <div className="min-w-0">{aside}</div>}
    </header>
  );
}
