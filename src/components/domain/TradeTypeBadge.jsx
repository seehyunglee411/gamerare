import { cn } from "../../lib/cn.js";
import { getTradeTypeClasses, TRADE_TYPE_LABELS } from "./tradeTypeTheme.js";

export function TradeTypeBadge({ type = "sell", label, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-3 py-1.5",
        "min-w-[68px] text-xs font-black uppercase leading-none",
        getTradeTypeClasses(type, "badge"),
        className,
      )}
    >
      {label ?? TRADE_TYPE_LABELS[type] ?? TRADE_TYPE_LABELS.sell}
    </span>
  );
}
