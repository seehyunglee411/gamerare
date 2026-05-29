import { cn } from "../../lib/cn.js";

const PADDINGS = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const TONES = {
  default: "bg-white",
  soft: "bg-soft",
  primary: "bg-gradient-to-br from-primary-soft to-white border-primary/20",
};

export function Card({
  padding = "md",
  tone = "default",
  className,
  children,
  ...props
}) {
  return (
    <section
      className={cn(
        "rounded-cardLg border border-line shadow-card",
        PADDINGS[padding] ?? PADDINGS.md,
        TONES[tone] ?? TONES.default,
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

function CardHeader({ title, description, action, className, children }) {
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-4 border-b border-slate-100 pb-4",
        className,
      )}
    >
      <div className="flex-1 min-w-0">
        {title && <h3 className="m-0 text-xl font-black text-ink">{title}</h3>}
        {description && <p className="m-0 mt-1 text-sm text-muted">{description}</p>}
        {children}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </header>
  );
}

function CardBody({ className, children }) {
  return <div className={cn("py-4", className)}>{children}</div>;
}

function CardFooter({ className, children }) {
  return (
    <footer
      className={cn(
        "flex items-center justify-end gap-2 border-t border-slate-100 pt-4",
        className,
      )}
    >
      {children}
    </footer>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
