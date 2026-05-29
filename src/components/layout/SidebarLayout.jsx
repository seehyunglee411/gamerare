import { cn } from "../../lib/cn.js";

export function SidebarLayout({
  aside,
  side = "left",
  asideClassName,
  contentClassName,
  className,
  children,
}) {
  return (
    <div
      className={cn(
        "grid gap-6 lg:gap-8",
        side === "left"
          ? "lg:grid-cols-[300px_minmax(0,1fr)]"
          : "lg:grid-cols-[minmax(0,1fr)_300px]",
        className,
      )}
    >
      {side === "left" && (
        <aside className={cn("min-w-0", asideClassName)}>{aside}</aside>
      )}
      <div className={cn("min-w-0", contentClassName)}>{children}</div>
      {side === "right" && (
        <aside className={cn("min-w-0", asideClassName)}>{aside}</aside>
      )}
    </div>
  );
}
