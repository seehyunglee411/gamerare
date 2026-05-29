import { Eyebrow } from "../ui/Eyebrow.jsx";
import { cn } from "../../lib/cn.js";

const TITLE_CLASS = "m-0 mt-2 pl-2 text-2xl font-extrabold tracking-tight text-ink md:text-[28px]";
const DESCRIPTION_CLASS = "m-0 pl-2 text-sm leading-relaxed text-muted md:text-[15px]";

export function SectionTitle({
  eyebrow,
  eyebrowTone = "soft",
  title,
  description,
  align = "left",
  action,
  className,
  children,
}) {
  return (
    <header
      className={cn(
        "flex flex-wrap items-end justify-between gap-4",
        align === "center" && "items-center text-center justify-center",
        className,
      )}
    >
      <div className="grid gap-2 min-w-0 flex-1">
        {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
        {title && <h2 className={TITLE_CLASS}>{title}</h2>}
        {description && <p className={DESCRIPTION_CLASS}>{description}</p>}
        {children}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </header>
  );
}
