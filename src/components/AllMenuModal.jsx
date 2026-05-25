import { useEffect } from "react";
import { AppLink } from "./AppLink.jsx";

const allMenuSections = [
  {
    title: "거래하기",
    links: [
      { label: "게임머니 거래", route: "trade", params: { type: "sell" } },
      { label: "판매등록", route: "trade-write", params: { status: "sell" } },
      { label: "구매등록", route: "trade-write", params: { status: "buy" } },
      { label: "계정거래", route: "game-select" },
    ],
  },
  {
    title: "거래관리",
    links: [
      { label: "판매내역", route: "sales-history" },
      { label: "구매내역", route: "purchase-history" },
      { label: "내가 쓴 글", route: "mywrite" },
      { label: "쿠폰함", route: "mypage" },
    ],
  },
  {
    title: "마일리지",
    links: [
      { label: "마일리지 충전", route: "mile-in" },
      { label: "마일리지 출금", route: "mile-out" },
      { label: "충전/출금 내역", route: "mile-history" },
      { label: "적립금 내역", route: "point" },
    ],
  },
  {
    title: "내 정보",
    links: [
      { label: "로그인", route: "login" },
      { label: "회원가입", route: "join" },
      { label: "아이디 찾기", route: "find-id" },
      { label: "비밀번호 찾기", route: "find-pw" },
    ],
  },
  {
    title: "고객센터",
    links: [
      { label: "공지사항", route: "notice-list" },
      { label: "FAQ", route: "faq" },
    ],
  },
];

export function AllMenuModal({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="all-menu-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className="all-menu-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="all-menu-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="all-menu-head">
          <h2 id="all-menu-title">전체메뉴</h2>
          <button className="all-menu-close" type="button" aria-label="전체메뉴 닫기" onClick={onClose}>
            ×
          </button>
        </header>
        <div className="all-menu-grid">
          {allMenuSections.map((section) => (
            <nav className="all-menu-card" aria-label={section.title} key={section.title}>
              <strong>{section.title}</strong>
              {section.links.map((link) => (
                <AppLink href={link.href} route={link.route} params={link.params} key={link.label} onClick={onClose}>
                  {link.label}
                </AppLink>
              ))}
            </nav>
          ))}
        </div>
      </section>
    </div>
  );
}
