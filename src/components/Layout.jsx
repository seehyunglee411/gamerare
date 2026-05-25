import { useState } from "react";
import { assetPath } from "../data/mockData.js";
import { AppLink } from "./AppLink.jsx";
import { routeHref } from "../lib/router.js";
import { AllMenuModal } from "./AllMenuModal.jsx";
import { SearchArea } from "./SearchArea.jsx";

function SiteHeader({ route }) {
  const [isAllMenuOpen, setIsAllMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <AppLink className="brand" route="home" aria-label="게임마켓 홈">
            <img src={assetPath("logo_320x104.png")} alt="게임마켓 로고" />
          </AppLink>
          <nav className="utility-nav" aria-label="회원 메뉴">
            <AppLink route="login">로그인</AppLink>
            <AppLink route="join">회원가입</AppLink>
            <AppLink route="notice-list">고객센터</AppLink>
          </nav>
          <button className="mobile-menu-button" type="button" aria-label="메뉴 열기" onClick={() => setIsAllMenuOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <SearchArea />
        {(route === "trade" || route === "trade-detail") && (
          <div className="mobile-trade-register-strip">
            <AppLink route="trade-write" params={{ status: "sell" }}>판매등록</AppLink>
            <AppLink route="trade-write" params={{ status: "buy" }}>구매등록</AppLink>
          </div>
        )}
        <nav className="main-nav" aria-label="주 메뉴">
          <AppLink route="trade-write" params={{ status: "sell" }}>판매등록</AppLink>
          <AppLink route="trade-write" params={{ status: "buy" }}>구매등록</AppLink>
          <AppLink className="with-badge" route="game-select">
            계정거래 <span>NEW</span>
          </AppLink>
          <AppLink route="mypage">마이룸</AppLink>
          <AppLink route="mywrite">내게시글</AppLink>
          <AppLink route="notice-list">고객센터</AppLink>
          <button className="main-nav-button" type="button" onClick={() => setIsAllMenuOpen(true)}>
            전체메뉴
          </button>
          <AppLink route="faq">FAQ</AppLink>
        </nav>
      </header>
      {isAllMenuOpen && <AllMenuModal onClose={() => setIsAllMenuOpen(false)} />}
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <nav className="footer-links">
          <AppLink route="faq" href={`${routeHref("faq")}#terms-service`}>이용약관</AppLink>
          <span>|</span>
          <AppLink route="faq" href={`${routeHref("faq")}#terms-trade`}>아이템거래약관</AppLink>
          <span>|</span>
          <AppLink route="faq" href={`${routeHref("faq")}#privacy`}>개인정보취급방침</AppLink>
          <span>|</span>
          <AppLink route="notice-list" href={`${routeHref("notice-list")}#partnership`}>광고/제휴문의</AppLink>
        </nav>
        <div className="company-info">
          <img src={assetPath("logo_320x104.png")} alt="게임마켓 로고" />
          <p>
            상호 : 겜마톡 / 대표 : 유지훈 / 사업자등록번호 : 807-16-01721 / 통신판매업 :
            2024-전주덕진-0100 / 고객센터 : 1644-4176
            <br />
            전라북도 전주시 덕진구 가재미로 83(인후동1가) / 이메일 : contact@gamemarket.kr
            <br />
            COPYRIGHT (C) GAME MARKET. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="모바일 빠른 메뉴">
      <AppLink route="mypage">내정보</AppLink>
      <AppLink route="mywrite" href={`${routeHref("mywrite")}#sell`}>판매중(0)</AppLink>
      <AppLink route="mywrite" href={`${routeHref("mywrite")}#buy`}>구매중(0)</AppLink>
      <AppLink route="chat">채팅하기</AppLink>
    </nav>
  );
}

export function Layout({ route, children }) {
  return (
    <>
      <h1 className="sr-only">게임마켓 게임 계정, 아이템, 게임머니 거래 플랫폼</h1>
      <h2 className="sr-only">게임 계정거래 - 인기 게임 계정 안전하게 사고팔기</h2>
      <h2 className="sr-only">아이템거래 - 최저가 아이템 즉시 거래</h2>
      <h2 className="sr-only">게임머니 거래 - 메소, 로아 골드 안전거래 지원</h2>
      <SiteHeader route={route} />
      {children}
      <MobileBottomNav />
      <SiteFooter />
    </>
  );
}
