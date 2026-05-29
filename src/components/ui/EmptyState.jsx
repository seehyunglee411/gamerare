import { cn } from "../../lib/cn.js";

export function EmptyState({ icon, title, description, action, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 px-6 py-12 text-center",
        className,
      )}
    >
      {icon && <div className="text-4xl text-slate-300">{icon}</div>}
      {title && <strong className="text-base font-black text-ink">{title}</strong>}
      {description && <p className="m-0 text-sm text-muted">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
