import { routeHref } from "../lib/router.js";

export function AppLink({ route, params, href, children, className, onClick, ...props }) {
  const target = href || routeHref(route, params);

  return (
    <a
      className={className}
      href={target}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const url = new URL(target, window.location.origin);
        if (url.origin !== window.location.origin) return;
        event.preventDefault();
        window.dispatchEvent(new CustomEvent("app:navigate", { detail: target }));
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
