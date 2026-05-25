import { useEffect, useState } from "react";

export function normalizeRoute(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const map = {
    "/": "home",
    "/index.html": "home",
    "/trade": "trade",
    "/trade/detail": "trade-detail",
    "/trade-write": "trade-write",
    "/game/select": "game-select",
    "/login": "login",
    "/join": "join",
    "/find-id": "find-id",
    "/find-pw": "find-pw",
    "/mypage": "mypage",
    "/mywrite": "mywrite",
    "/sales-history": "sales-history",
    "/purchase-history": "purchase-history",
    "/member-modify": "member-modify",
    "/member-exit": "member-exit",
    "/mileage": "mileage",
    "/mile-in": "mile-in",
    "/mile-out": "mile-out",
    "/mile-history": "mile-history",
    "/point": "point",
    "/notice": "notice-list",
    "/notice/detail": "notice-detail",
    "/faq": "faq",
    "/account": "account",
    "/chat": "chat",
  };

  return map[clean] || "home";
}

export function routeHref(route, params = {}) {
  const pathMap = {
    home: "/",
    trade: "/trade",
    "trade-detail": "/trade/detail",
    "trade-write": "/trade-write",
    "game-select": "/game/select",
    login: "/login",
    join: "/join",
    "find-id": "/find-id",
    "find-pw": "/find-pw",
    mypage: "/mypage",
    mywrite: "/mywrite",
    "sales-history": "/sales-history",
    "purchase-history": "/purchase-history",
    "member-modify": "/member-modify",
    "member-exit": "/member-exit",
    mileage: "/mileage",
    "mile-in": "/mile-in",
    "mile-out": "/mile-out",
    "mile-history": "/mile-history",
    point: "/point",
    "notice-list": "/notice",
    "notice-detail": "/notice/detail",
    faq: "/faq",
    account: "/account",
    chat: "/chat",
  };
  const search = new URLSearchParams(params).toString();
  return `${pathMap[route] || "/"}${search ? `?${search}` : ""}`;
}

export function useCurrentRoute() {
  const readLocation = () => ({
    route: normalizeRoute(window.location.pathname),
    params: new URLSearchParams(window.location.search),
    hash: window.location.hash,
  });
  const [location, setLocation] = useState(readLocation);

  useEffect(() => {
    const onPopState = () => setLocation(readLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (href) => {
    const url = new URL(href, window.location.origin);
    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    setLocation(readLocation());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { ...location, navigate };
}
