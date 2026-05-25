import { useEffect, useMemo } from "react";
import { Layout } from "./components/Layout.jsx";
import { useCurrentRoute } from "./lib/router.js";
import {
  AccountPage,
  AuthPage,
  ChatPage,
  FaqPage,
  GameSelectPage,
  HomePage,
  MemberExitPage,
  MemberModifyPage,
  MyPage,
  MyWritePage,
  NoticeDetailPage,
  NoticeListPage,
  TradeHistoryPage,
  TradeDetailPage,
  TradeListPage,
  TradeWritePage,
  WalletPage,
} from "./pages/index.jsx";

function App() {
  const { route, params, navigate } = useCurrentRoute();

  useEffect(() => {
    const onNavigate = (event) => navigate(event.detail);
    window.addEventListener("app:navigate", onNavigate);
    return () => window.removeEventListener("app:navigate", onNavigate);
  }, [navigate]);

  const page = useMemo(() => {
    switch (route) {
      case "trade":
        return <TradeListPage params={params} />;
      case "trade-detail":
        return <TradeDetailPage params={params} />;
      case "trade-write":
        return <TradeWritePage params={params} />;
      case "game-select":
        return <GameSelectPage />;
      case "login":
      case "join":
      case "find-id":
      case "find-pw":
        return <AuthPage mode={route} />;
      case "mypage":
        return <MyPage />;
      case "mywrite":
        return <MyWritePage />;
      case "sales-history":
        return <TradeHistoryPage type="sell" />;
      case "purchase-history":
        return <TradeHistoryPage type="buy" />;
      case "member-modify":
        return <MemberModifyPage />;
      case "member-exit":
        return <MemberExitPage />;
      case "mileage":
      case "mile-in":
      case "mile-out":
      case "mile-history":
      case "point":
        return <WalletPage kind={route} />;
      case "notice-list":
        return <NoticeListPage />;
      case "notice-detail":
        return <NoticeDetailPage params={params} />;
      case "faq":
        return <FaqPage />;
      case "account":
        return <AccountPage params={params} />;
      case "chat":
        return <ChatPage />;
      case "home":
      default:
        return <HomePage />;
    }
  }, [params, route]);

  return <Layout route={route}>{page}</Layout>;
}

export default App;
