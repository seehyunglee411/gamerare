export const TRADE_TYPE_LABELS = {
  sell: "팝니다",
  buy: "삽니다",
};

const TRADE_TYPE_THEMES = {
  sell: {
    badge: "bg-ink text-white",
    tab: "bg-ink text-white shadow-none",
  },
  buy: {
    badge: "bg-primary text-white",
    tab: "bg-primary text-white shadow-none",
  },
};

export function getTradeTypeClasses(type = "sell", surface = "badge") {
  const theme = TRADE_TYPE_THEMES[type] ?? TRADE_TYPE_THEMES.sell;
  return theme[surface] ?? theme.badge;
}
