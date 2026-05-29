import { useId } from "react";
import { cn } from "../../lib/cn.js";

export function FormField({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  className,
}) {
  const autoId = useId();
  const fieldId = htmlFor ?? autoId;

  const enhancedChildren =
    typeof children === "function"
      ? children({ id: fieldId, "aria-invalid": Boolean(error) || undefined })
      : children;

  return (
    <label htmlFor={fieldId} className={cn("grid gap-2", className)}>
      {label && (
        <span className="pl-2 text-[14px] font-black text-ink">
          {label}
          {required && <em className="not-italic ml-1 text-primary">*</em>}
        </span>
      )}
      {enhancedChildren}
      {error ? (
        <span className="text-xs font-bold text-rose-600">{error}</span>
      ) : hint ? (
        <span className="text-xs text-muted">{hint}</span>
      ) : null}
    </label>
  );
}
