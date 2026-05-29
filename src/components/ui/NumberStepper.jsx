import { cn } from "../../lib/cn.js";

export function NumberStepper({
  value,
  min = 0,
  max = Infinity,
  step = 1,
  onChange,
  className,
  inputClassName,
  "aria-label": ariaLabel,
}) {
  const clamp = (next) => Math.min(Math.max(Number(next) || min, min), max);

  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-xl border border-line bg-white",
        className,
      )}
    >
      <button
        type="button"
        className="h-11 w-11 text-lg font-black text-ink hover:bg-slate-50 disabled:opacity-40"
        onClick={() => onChange?.(clamp(value - step))}
        disabled={value <= min}
        aria-label="감소"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        aria-label={ariaLabel ?? "수량"}
        onChange={(event) => onChange?.(clamp(event.target.value))}
        className={cn(
          "h-11 w-16 border-x border-line bg-white text-center text-[15px] font-bold text-ink",
          "focus:outline-none focus:bg-primary-soft",
          // Hide native number spin buttons across browsers
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          inputClassName,
        )}
      />
      <button
        type="button"
        className="h-11 w-11 text-lg font-black text-ink hover:bg-slate-50 disabled:opacity-40"
        onClick={() => onChange?.(clamp(value + step))}
        disabled={value >= max}
        aria-label="증가"
      >
        +
      </button>
    </div>
  );
}
