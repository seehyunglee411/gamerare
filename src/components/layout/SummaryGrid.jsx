import { cn } from "../../lib/cn.js";

const COLUMNS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export function SummaryGrid({
  columns = 3,
  gap = "md",
  className,
  children,
  ...props
}) {
  return (
    <section
      className={cn(
        "grid grid-cols-1",
        COLUMNS[columns] ?? COLUMNS[3],
        gap === "sm" ? "gap-3" : gap === "lg" ? "gap-6" : "gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
