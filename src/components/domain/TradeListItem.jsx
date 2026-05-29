import { AppLink } from "../AppLink.jsx";
import { TradeTypeBadge } from "./TradeTypeBadge.jsx";
import { PriceText } from "../ui/PriceText.jsx";
import { cn } from "../../lib/cn.js";

export function TradeListItem({
  trade,
  route = "trade-detail",
  params,
  variant = "market",
  showMeta = true,
  className,
}) {
  const linkParams = params ?? { tradeNo: trade.id };

  if (variant === "history") {
    return (
      <AppLink
        route={route}
        params={linkParams}
        className={cn(
          "grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-4 border-b border-slate-100 px-6 py-4 text-ink no-underline transition-colors last:border-b-0 hover:bg-slate-50",
          "md:grid-cols-[auto_minmax(0,1fr)_auto_auto]",
          className,
        )}
      >
        <TradeTypeBadge type={trade.type} />
        <div className="grid min-w-0 gap-1.5">
          <strong className="truncate font-bold text-ink">{trade.title}</strong>
          {showMeta && (
            <em className="not-italic text-sm text-muted">
              {trade.game} · {trade.server} · {trade.itemType}
            </em>
          )}
        </div>
        <PriceText value={trade.unitPrice} tone="primary" size="md" />
        <small className="hidden text-xs font-bold text-muted md:inline">
          {trade.status === "away" ? "자리비움" : "온라인"}
        </small>
      </AppLink>
    );
  }

  return (
    <AppLink
      route={route}
      params={linkParams}
      className={cn(
        "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4 text-ink no-underline transition-all hover:border-primary/40 hover:shadow-card",
        className,
      )}
    >
      <TradeTypeBadge type={trade.type} />
      <div className="grid min-w-0 gap-1.5">
        <span className="truncate font-bold text-ink">{trade.title}</span>
        {showMeta && (
          <span className="truncate text-sm text-muted">
            {trade.game} · {trade.server} · {trade.itemType}
          </span>
        )}
      </div>
      <PriceText value={trade.unitPrice} tone="primary" size="md" />
    </AppLink>
  );
}
