import { cn } from "../../lib/cn.js";

const STYLES = {
  sell: "bg-primary text-white",
  buy: "bg-info text-white",
};

const LABELS = {
  sell: "팝니다",
  buy: "삽니다",
};

export function TradeTypeBadge({ type = "sell", label, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-3 py-1.5",
        "min-w-[68px] text-xs font-black uppercase leading-none",
        STYLES[type] ?? STYLES.sell,
        className,
      )}
    >
      {label ?? LABELS[type] ?? LABELS.sell}
    </span>
  );
}
