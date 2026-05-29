import { won } from "../../lib/format.js";
import { cn } from "../../lib/cn.js";

const TONES = {
  default: "text-ink",
  primary: "text-primary",
  blue: "text-info",
  muted: "text-muted",
};

const SIZES = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-2xl",
  "2xl": "text-3xl",
};

export function PriceText({
  value,
  tone = "default",
  size = "md",
  bold = true,
  className,
  ...props
}) {
  return (
    <strong
      className={cn(
        "whitespace-nowrap",
        bold ? "font-black" : "font-semibold",
        TONES[tone] ?? TONES.default,
        SIZES[size] ?? SIZES.md,
        className,
      )}
      {...props}
    >
      {won(value)}
    </strong>
  );
}
