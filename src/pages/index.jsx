import { useEffect, useState } from "react";
import {
  accountGames,
  assetPath,
  faqGroups,
  member,
  notices,
  popularGames,
  trades,
  writeGames,
} from "../data/mockData.js";
import { MemberCard } from "../components/MemberCard.jsx";
import { won } from "../lib/format.js";
import { AppLink } from "../components/AppLink.jsx";

export function HomePage() {
  return (
    <main>
      <section className="hero section">
        <div className="hero-card">
          <div className="hero-copy">
            <span className="eyebrow">GAME MARKET SAFE TRADE</span>
            <h2>
              게임 계정·아이템·게임머니
              <br />
              안전거래 플랫폼
            </h2>
            <p>인기 게임 거래를 한 곳에서 빠르게 찾고, 24시간 사고대응 전담팀과 최대 보상 정책으로 더 안심하고 이용하세요.</p>
            <div className="hero-actions">
              <AppLink className="primary-button" route="trade-write" params={{ status: "sell" }}>판매등록</AppLink>
              <AppLink className="ghost-button" route="trade-write" params={{ status: "buy" }}>구매등록</AppLink>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="coin coin-one"></div>
            <div className="coin coin-two"></div>
            <div className="device-card">
              <strong>실시간 인기 거래</strong>
              {popularGames.slice(0, 3).map((game) => (
                <span key={game.gm}>{game.name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section split-section">
        <div className="popular-games">
          <div className="section-title">
            <h2>인기 게임 TOP5</h2>
          </div>
          <ol className="game-list">
            {popularGames.map((game, index) => (
              <li key={game.gm}>
                <AppLink route="trade" params={{ gm: game.gm, sv: game.sv || "", krgame: game.name, krserver: game.server, type: "sell" }}>
                  <span className="rank">{index + 1}</span>
                  <span className="game-info">
                    <b>{game.name}</b>
                    <em>{game.publisher}</em>
                  </span>
                  {game.image && (
                    <span className="game-thumb">
                      <img src={assetPath(game.image)} alt={`${game.name} 로고`} />
                    </span>
                  )}
                </AppLink>
              </li>
            ))}
          </ol>
        </div>

        <div className="quick-panel">
          <div className="section-title">
            <h2>게임마켓 퀵메뉴</h2>
          </div>
          <div className="quick-grid">
            <AppLink route="trade-write" params={{ status: "sell" }}><i>팝니다</i><span>판매등록</span></AppLink>
            <AppLink route="trade-write" params={{ status: "buy" }}><i>삽니다</i><span>구매등록</span></AppLink>
            <AppLink route="game-select"><i>계정</i><span>계정거래</span></AppLink>
            <AppLink route="mileage"><i>마일</i><span>마일리지</span></AppLink>
          </div>
        </div>
      </section>

      <section className="section trust-section">
        {["24시간 모니터링", "실명·계좌 인증", "안전 결제 보관"].map((title, index) => (
          <div className="trust-card" key={title}>
            <b>{title}</b>
            <p>{["사기 의심 거래를 실시간으로 탐지하고 대응합니다.", "판매자 인증 정보를 거래 전 확인할 수 있습니다.", "구매 확정 전까지 결제금을 안전하게 보관합니다."][index]}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export function TradeListPage({ params }) {
  const selectedType = params.get("type") || "sell";
  const selectedGame = params.get("krgame") || "던전앤파이터";
  const [bookmarked, setBookmarked] = useState(() => localStorage.getItem("gm-trade-bookmark") === "1");
  const visibleTrades = trades.filter((trade) => trade.type === selectedType || trade.game === selectedGame);

  useEffect(() => {
    localStorage.setItem("gm-trade-bookmark", bookmarked ? "1" : "0");
  }, [bookmarked]);

  return (
    <main className="trade-market-page section">
      <div className="trade-market-layout">
        <aside className="trade-market-side" aria-label="거래 사이드 메뉴">
          <MemberCard />
          <section className="trade-side-box">
            <h3>최근 본 게임</h3>
            <p>{selectedGame} · {params.get("krserver") || "전체서버"}</p>
          </section>
        </aside>
        <section className="trade-market-main" id="trade-list">
          <header className="trade-market-head">
            <div>
              <span className="eyebrow">GAME MARKET</span>
              <h2>{selectedGame} {selectedType === "buy" ? "구매" : "판매"} 거래</h2>
            </div>
            <button type="button" className={`bookmark-star ${bookmarked ? "is-active" : ""}`} onClick={() => setBookmarked((value) => !value)}>
              {bookmarked ? "★ 즐겨찾기" : "☆ 즐겨찾기"}
            </button>
          </header>
          <div className="trade-market-tabs">
            <AppLink className={selectedType === "sell" ? "active" : ""} route="trade" params={{ krgame: selectedGame, krserver: "전체서버", type: "sell" }}>팝니다</AppLink>
            <AppLink className={selectedType === "buy" ? "active" : ""} route="trade" params={{ krgame: selectedGame, krserver: "전체서버", type: "buy" }}>삽니다</AppLink>
          </div>
          <div className="trade-market-list">
            {visibleTrades.map((trade) => (
              <AppLink
                className="trade-market-item"
                route="trade-detail"
                params={{
                  tradeNo: trade.id,
                  gm: trade.gm,
                  sv: trade.sv,
                  krgame: trade.game,
                  krserver: trade.server,
                  itemType: trade.itemType,
                  type: trade.type,
                  title: trade.title,
                  seller: trade.seller,
                  unitPrice: trade.unitPrice,
                  min: trade.minQty,
                  max: trade.maxQty,
                }}
                key={trade.id}
              >
                <span className={`trade-type ${trade.type}`}>{trade.type === "buy" ? "삽니다" : "팝니다"}</span>
                <span className="trade-title">{trade.title}</span>
                <span className="trade-meta">{trade.game} · {trade.server} · {trade.itemType}</span>
                <strong>{won(trade.unitPrice)}</strong>
              </AppLink>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function findTrade(params) {
  const tradeNo = params.get("tradeNo");
  const fallback = trades.find((trade) => trade.id === tradeNo) || trades[0];
  return {
    ...fallback,
    id: tradeNo || fallback.id,
    game: params.get("game") || params.get("krgame") || fallback.game,
    server: params.get("server") || params.get("krserver") || fallback.server,
    itemType: params.get("itemType") || fallback.itemType,
    type: params.get("type") || fallback.type,
    title: params.get("title") || fallback.title,
    seller: params.get("seller") || fallback.seller,
    status: params.get("status") || fallback.status,
    unitLabel: params.get("unitLabel") || fallback.unitLabel,
    unitPrice: Number(params.get("unitPrice") || fallback.unitPrice),
    minQty: Number(params.get("min") || fallback.minQty),
    maxQty: Number(params.get("max") || fallback.maxQty),
    mileage: Number(params.get("mileage") || fallback.mileage),
    point: Number(params.get("point") || fallback.point),
  };
}

export function TradeDetailPage({ params }) {
  const trade = findTrade(params);
  const [qty, setQty] = useState(Number(params.get("qty") || trade.minQty || 1));
  const [point, setPoint] = useState(0);
  const [payMethod, setPayMethod] = useState("mileage");
  const finalPrice = Math.max(trade.unitPrice * qty - point, 0);
  const saleType = trade.type === "buy" ? "삽니다" : "팝니다";
  const clampQty = (value) => Math.min(Math.max(Number(value) || trade.minQty, 1), trade.maxQty);

  return (
    <main className="trade-detail-page section">
      <div className="trade-detail-layout">
        <section className="trade-detail-main" aria-labelledby="trade-detail-title">
          <nav className="trade-detail-breadcrumb" aria-label="현재 위치">
            <AppLink route="trade" params={{ gm: trade.gm, sv: trade.sv, krgame: trade.game, krserver: trade.server, type: trade.type }}>{trade.game}</AppLink>
            <span aria-hidden="true">&gt;</span>
            <AppLink route="trade" params={{ gm: trade.gm, sv: trade.sv, krgame: trade.game, krserver: trade.server, type: trade.type }}>{trade.server}</AppLink>
            <span aria-hidden="true">&gt;</span>
            <span>{trade.itemType}</span>
            <span aria-hidden="true">&gt;</span>
            <strong>#{trade.id}</strong>
            <span className={`${trade.type} trade-detail-sale-chip`}>{saleType}</span>
          </nav>
          <header className="trade-detail-head">
            <h2 id="trade-detail-title">{trade.title}</h2>
            <div className="trade-detail-meta">
              <span className={`seller-presence ${trade.status === "away" ? "is-away" : "is-online"}`}>{trade.status === "away" ? "자리비움" : "온라인"}</span>
              <span className="trade-detail-seller">{trade.seller}</span>
              <span className="trade-detail-divider" aria-hidden="true"></span>
              <span className="trade-detail-muted">거래중 313건</span>
              <span className="trade-detail-chip">실명인증</span>
              <span className="trade-detail-chip">휴대폰</span>
              <span className="trade-detail-chip">출금계좌</span>
            </div>
          </header>
          <section className="trade-detail-card" aria-labelledby="trade-price-title">
            <h3 id="trade-price-title">가격정보</h3>
            <div className="trade-detail-price-block"><span>{trade.unitLabel}</span><strong>{won(trade.unitPrice)}</strong></div>
            <p className="trade-detail-price-meta"><span>최소 <strong>{trade.minQty}개</strong></span><span>~</span><span>최대 <strong>{trade.maxQty}개</strong></span></p>
          </section>
          <section className="trade-detail-card" aria-labelledby="trade-desc-title">
            <h3 id="trade-desc-title">상세설명</h3>
            <div className="trade-detail-description">
              {trade.description.map((line) => <p key={line}>{line}</p>)}
            </div>
          </section>
        </section>
        <aside className="trade-detail-side" aria-label="결제 정보">
          <section className="trade-detail-order-card">
            <div className="trade-detail-order-block">
              <div className="trade-detail-order-head">
                <strong>구매 수량</strong>
                <div className="trade-detail-qty-summary"><span>{qty}개</span><span aria-hidden="true">=</span><strong>{trade.itemType} {qty}개</strong></div>
              </div>
              <div className="trade-detail-qty-row">
                <button type="button" className="trade-detail-step" aria-label="수량 감소" onClick={() => setQty((value) => clampQty(value - 1))}>-</button>
                <input className="trade-detail-qty-input" type="number" value={qty} min="1" max={trade.maxQty} onChange={(event) => setQty(clampQty(event.target.value))} />
                <button type="button" className="trade-detail-step" aria-label="수량 증가" onClick={() => setQty((value) => clampQty(value + 1))}>+</button>
              </div>
            </div>
            <div className="trade-detail-order-block">
              <label className="trade-detail-label" htmlFor="characterName">구매자 캐릭터명</label>
              <input id="characterName" className="trade-detail-input" type="text" placeholder="물품을 전달 받으실 본인의 캐릭터명" />
            </div>
            <fieldset className="trade-detail-order-block trade-detail-fieldset">
              <legend className="trade-detail-label">구매자 안심서비스</legend>
              <label className="trade-detail-option is-selected"><input type="radio" name="assurance" defaultChecked /><span>보증서비스 미사용</span></label>
              <label className="trade-detail-option"><input type="radio" name="assurance" /><span>사고발생시 100% 보상 <small>(보증료 1.5%)</small></span></label>
            </fieldset>
            <div className="trade-detail-order-block">
              <div className="trade-detail-payment-head"><strong>결제수단</strong><AppLink route="mile-in">마일리지 충전하기</AppLink></div>
              <div className="trade-detail-pay-tabs" role="tablist" aria-label="결제수단">
                {["mileage", "card", "phone"].map((method) => (
                  <button type="button" className={`trade-detail-pay-tab ${payMethod === method ? "is-active" : ""}`} key={method} onClick={() => setPayMethod(method)}>
                    {{ mileage: "마일리지", card: "신용카드", phone: "휴대폰" }[method]}
                  </button>
                ))}
              </div>
            </div>
            <div className="trade-detail-order-block trade-detail-mileage-row">
              <div><strong className="trade-detail-label">적립금 사용</strong><p>(보유: {won(trade.point)})</p></div>
              <div className="trade-detail-inline-controls">
                <input className="trade-detail-inline-input" type="number" value={point} min="0" onChange={(event) => setPoint(Math.min(Math.max(Number(event.target.value) || 0, 0), trade.point))} />
                <button type="button" className="trade-detail-apply-btn" onClick={() => setPoint(trade.point)}>전액사용</button>
              </div>
            </div>
            <div className="trade-detail-order-block trade-detail-mileage-balance"><span>보유 마일리지</span><strong>{won(trade.mileage)}</strong></div>
            <div className="trade-detail-total-row"><span>총 결제금액</span><strong>{won(finalPrice)}</strong></div>
            <div className="trade-detail-action-row">
              <AppLink className="trade-detail-chat-btn" route="chat">채팅</AppLink>
              <button type="button" className="trade-detail-pay-btn" onClick={() => alert("외부 결제 연동 전 데모 화면입니다.")}>결제</button>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

export function TradeWritePage({ params }) {
  const isBuy = params.get("status") === "buy";
  const initialGame = writeGames.find((game) => game.gm === params.get("gm")) || writeGames[0];
  const [game, setGame] = useState(initialGame);
  const [server, setServer] = useState(params.get("krserver") || initialGame.servers[0]);
  const [itemType, setItemType] = useState(initialGame.itemRows[0]);

  return (
    <main className="trade-write-page section">
      <div className="trade-write-layout">
        <section className="trade-write-panel">
          <header className="trade-write-head">
            <span className="eyebrow">{isBuy ? "BUY REQUEST" : "SELL REQUEST"}</span>
            <h2>{isBuy ? "구매등록" : "판매등록"}</h2>
            <p>백엔드 API 개발 전까지 등록 내용은 저장하지 않고 데모 알림만 표시합니다.</p>
          </header>
          <div className="tw-pick-grid">
            <div className="tw-pick-list">
              <strong>게임선택</strong>
              {writeGames.map((item) => (
                <button
                  type="button"
                  className={game.gm === item.gm ? "active" : ""}
                  key={item.gm}
                  onClick={() => {
                    setGame(item);
                    setServer(item.servers[0]);
                    setItemType(item.itemRows[0]);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="tw-pick-list">
              <strong>서버선택</strong>
              {game.servers.map((item) => (
                <button type="button" className={server === item ? "active" : ""} key={item} onClick={() => setServer(item)}>{item}</button>
              ))}
            </div>
            <div className="tw-pick-list">
              <strong>물품종류</strong>
              {game.itemRows.map((item) => (
                <button type="button" className={itemType === item ? "active" : ""} key={item} onClick={() => setItemType(item)}>{item}</button>
              ))}
            </div>
          </div>
          <form
            className="trade-write-form"
            onSubmit={(event) => {
              event.preventDefault();
              alert(`${game.name} ${server} ${itemType} ${isBuy ? "구매" : "판매"} 등록 데모입니다.`);
            }}
          >
            <label>제목<input required name="title" placeholder={`${game.name} ${itemType} ${isBuy ? "삽니다" : "팝니다"}`} /></label>
            <label>단가<input required name="price" type="number" min="1" placeholder="거래 단가" /></label>
            <label>수량<input required name="qty" type="number" min="1" placeholder="최소 거래 수량" /></label>
            <label>상세설명<textarea name="description" rows="6" placeholder="거래 조건과 가능 시간을 입력해주세요." /></label>
            <div className="trade-write-summary">{game.name} &gt; {server} &gt; {itemType}</div>
            <button type="submit" className="primary-button">{isBuy ? "구매등록" : "판매등록"}</button>
          </form>
        </section>
      </div>
    </main>
  );
}

export function GameSelectPage() {
  const [keyword, setKeyword] = useState("");
  const filtered = accountGames.filter((game) => game.name.includes(keyword));

  return (
    <main className="section account-game-page">
      <header className="section-title"><h2>계정거래 게임 선택</h2><p>더미 게임 목록에서 계정거래 화면으로 이동합니다.</p></header>
      <div className="search-box"><input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="게임명을 검색하세요" /><button type="button">검색</button></div>
      <div className="account-game-grid">
        {filtered.map((game) => (
          <AppLink className="account-game-card" route="account" params={{ game: game.name }} key={game.name}>
            <img className="account-game-thumb" src={assetPath(game.image)} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} />
            <strong>{game.name}</strong>
          </AppLink>
        ))}
      </div>
    </main>
  );
}

export function AuthPage({ mode }) {
  const titles = { login: "로그인", join: "회원가입", "find-id": "아이디 찾기", "find-pw": "비밀번호 찾기" };

  return (
    <main className="login-page section">
      <section className="login-card">
        <h2>{titles[mode]}</h2>
        <p>인증/회원 API 연동 전까지 데모 폼으로 동작합니다.</p>
        <form onSubmit={(event) => { event.preventDefault(); alert(`${titles[mode]} 데모입니다.`); }}>
          {mode !== "find-id" && <input type="text" placeholder="아이디" required />}
          {mode !== "find-id" && mode !== "join" && <input type="password" placeholder="비밀번호" required />}
          {(mode === "find-id" || mode === "join") && <input type="tel" placeholder="휴대폰 번호" required />}
          {mode === "join" && <input type="email" placeholder="이메일" required />}
          <button className="primary-button" type="submit">{titles[mode]}</button>
        </form>
        <div className="login-links"><AppLink route="find-id">아이디 찾기</AppLink><AppLink route="find-pw">비밀번호 찾기</AppLink><AppLink route="join">회원가입</AppLink></div>
      </section>
    </main>
  );
}

export function MyPage() {
  return (
    <main className="mypage-page">
      <div className="mypage-content trade-market-layout">
        <aside className="trade-market-side"><MemberCard /></aside>
        <section className="trade-market-main">
          <header className="section-title"><h2>마이룸</h2><p>회원 상태와 거래 현황을 더미 데이터로 표시합니다.</p></header>
          <div className="trust-section">
            <div className="trust-card"><b>{won(member.mileage)}</b><p>보유 마일리지</p></div>
            <div className="trust-card"><b>{won(member.point)}</b><p>보유 적립금</p></div>
            <div className="trust-card"><b>0건</b><p>진행 중 거래</p></div>
          </div>
          <div className="quick-grid">
            <AppLink route="member-modify"><i>수정</i><span>회원정보</span></AppLink>
            <AppLink route="mile-in"><i>충전</i><span>마일리지</span></AppLink>
            <AppLink route="sales-history"><i>판매</i><span>판매내역</span></AppLink>
            <AppLink route="purchase-history"><i>구매</i><span>구매내역</span></AppLink>
            <AppLink route="mywrite"><i>게시</i><span>내게시글</span></AppLink>
            <AppLink route="member-exit"><i>탈퇴</i><span>회원탈퇴</span></AppLink>
          </div>
        </section>
      </div>
    </main>
  );
}

export function MyWritePage() {
  return (
    <main className="section">
      <header className="section-title"><h2>내게시글</h2><p>등록 API가 없어서 현재는 샘플 거래만 표시합니다.</p></header>
      <div className="trade-market-list">
        {trades.slice(0, 2).map((trade) => (
          <AppLink className="trade-market-item" route="trade-detail" params={{ tradeNo: trade.id }} key={trade.id}>
            <span className={`trade-type ${trade.type}`}>{trade.type === "buy" ? "구매중" : "판매중"}</span>
            <span className="trade-title">{trade.title}</span>
            <strong>{won(trade.unitPrice)}</strong>
          </AppLink>
        ))}
      </div>
    </main>
  );
}

export function TradeHistoryPage({ type }) {
  const isSell = type === "sell";
  const pageTitle = isSell ? "판매내역" : "구매내역";
  const filteredTrades = trades.filter((trade) => trade.type === type);
  const totalAmount = filteredTrades.reduce((sum, trade) => sum + trade.unitPrice * trade.minQty, 0);

  return (
    <main className="section trade-history-page">
      <header className="trade-history-hero">
        <div>
          <span className="eyebrow">{isSell ? "SELL HISTORY" : "BUY HISTORY"}</span>
          <h2>{pageTitle}</h2>
          <p>{isSell ? "판매 등록 및 거래 진행 내역을 확인합니다." : "구매 요청 및 결제 진행 내역을 확인합니다."}</p>
        </div>
        <section className="trade-history-summary" aria-label={`${pageTitle} 요약`}>
          <article>
            <span>총 거래</span>
            <strong>{filteredTrades.length}건</strong>
          </article>
          <article>
            <span>거래 예정 금액</span>
            <strong>{won(totalAmount)}</strong>
          </article>
          <article>
            <span>진행 상태</span>
            <strong>{filteredTrades.length ? "진행중" : "대기없음"}</strong>
          </article>
        </section>
      </header>

      <section className="trade-history-card">
        <div className="trade-history-card-head">
          <h3>{pageTitle} 목록</h3>
          <AppLink route="trade-write" params={{ status: isSell ? "sell" : "buy" }}>
            {isSell ? "판매등록" : "구매등록"}
          </AppLink>
        </div>
        <div className="trade-history-list">
          {filteredTrades.map((trade) => (
            <AppLink className="trade-history-item" route="trade-detail" params={{ tradeNo: trade.id }} key={trade.id}>
              <span className={`trade-type ${trade.type}`}>{isSell ? "판매" : "구매"}</span>
              <div>
                <strong>{trade.title}</strong>
                <em>{trade.game} · {trade.server} · {trade.itemType}</em>
              </div>
              <b>{won(trade.unitPrice)}</b>
              <small>{trade.status === "away" ? "자리비움" : "온라인"}</small>
            </AppLink>
          ))}
          {!filteredTrades.length && (
            <div className="trade-history-empty">
              <strong>{pageTitle}이 없습니다.</strong>
              <p>새 거래를 등록하면 이곳에 표시됩니다.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export function MemberModifyPage() {
  return (
    <main className="section member-modify-page">
      <section className="login-card">
        <h2>회원정보 수정</h2>
        <form onSubmit={(event) => { event.preventDefault(); alert("회원정보 수정 데모입니다."); }}>
          <input defaultValue={member.id} placeholder="닉네임" />
          <input defaultValue={member.phone} placeholder="휴대폰" />
          <input defaultValue={member.email} placeholder="이메일" />
          <button className="primary-button" type="submit">수정하기</button>
        </form>
      </section>
    </main>
  );
}

export function MemberExitPage() {
  return (
    <main className="section">
      <section className="login-card">
        <h2>회원탈퇴</h2>
        <p>실제 탈퇴 처리는 API 개발 후 연결됩니다.</p>
        <button className="primary-button" type="button" onClick={() => alert("회원탈퇴 데모입니다.")}>탈퇴 신청</button>
      </section>
    </main>
  );
}

export function WalletPage({ kind }) {
  const titles = { mileage: "마일리지", "mile-in": "마일리지 충전", "mile-out": "마일리지 출금", "mile-history": "마일리지 내역", point: "적립금" };

  if (kind === "mile-in" || kind === "mile-out") {
    const isCharge = kind === "mile-in";
    const title = isCharge ? "마일리지 충전" : "마일리지 출금";
    const primaryLabel = isCharge ? "충전 신청" : "출금 신청";
    const guideItems = isCharge
      ? ["입금자명과 신청 금액이 일치해야 빠르게 처리됩니다.", "외부 결제 연동 전까지 실제 충전은 발생하지 않는 데모 화면입니다."]
      : ["출금은 본인 명의 계좌 기준으로 처리됩니다.", "은행 API 연동 전까지 실제 출금은 발생하지 않는 데모 화면입니다."];

    return (
      <main className={`section mileage-action-page ${isCharge ? "is-charge" : "is-withdraw"}`}>
        <header className="mileage-action-hero">
          <div>
            <span className="eyebrow">{isCharge ? "MILEAGE CHARGE" : "MILEAGE WITHDRAW"}</span>
            <h2>{title}</h2>
            <p>{isCharge ? "거래에 사용할 마일리지를 충전 신청합니다." : "보유 마일리지를 등록 계좌로 출금 신청합니다."}</p>
          </div>
          <section className="mileage-action-summary" aria-label="마일리지 요약">
            <article>
              <span>보유 마일리지</span>
              <strong>{won(member.mileage)}</strong>
            </article>
            <article>
              <span>{isCharge ? "최소 충전" : "최소 출금"}</span>
              <strong>{won(1000)}</strong>
            </article>
            <article>
              <span>처리 대기</span>
              <strong>{won(0)}</strong>
            </article>
          </section>
        </header>

        <section className="mileage-action-shell">
          <form
            className="mileage-action-card"
            onSubmit={(event) => {
              event.preventDefault();
              alert(`${title} 데모입니다.`);
            }}
          >
            <h3>{primaryLabel}</h3>
            <label>
              신청 금액
              <div className="mileage-action-input">
                <input type="number" min="1000" step="1000" placeholder="금액을 입력하세요" required />
                <span>원</span>
              </div>
            </label>
            {isCharge ? (
              <label>
                입금자명
                <input type="text" placeholder="입금자명을 입력하세요" required />
              </label>
            ) : (
              <>
                <label>
                  은행
                  <select defaultValue="국민은행" required>
                    <option>국민은행</option>
                    <option>신한은행</option>
                    <option>하나은행</option>
                    <option>우리은행</option>
                  </select>
                </label>
                <label>
                  계좌번호
                  <input type="text" placeholder="계좌번호를 입력하세요" required />
                </label>
              </>
            )}
            <button className="mileage-action-submit" type="submit">{primaryLabel}</button>
          </form>

          <aside className="mileage-action-guide">
            <h3>이용 안내</h3>
            <ul>
              {guideItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="mileage-action-bank">
              <span>{isCharge ? "입금 계좌" : "출금 수수료"}</span>
              <strong>{isCharge ? "국민 000000-00-000000" : won(1000)}</strong>
            </div>
            <AppLink className="mileage-action-link" route="mile-history">충전/출금 내역 보기</AppLink>
          </aside>
        </section>
      </main>
    );
  }

  if (kind === "point") {
    const pointHistory = [
      { title: "거래 결제 적립", date: "2026.05.26", amount: 3000, status: "지급완료" },
      { title: "이벤트 참여 적립", date: "2026.05.22", amount: 1000, status: "지급완료" },
      { title: "거래 상세 결제 사용", date: "2026.05.20", amount: -1000, status: "사용완료" },
    ];

    return (
      <main className="section point-page">
        <header className="point-hero">
          <span className="eyebrow">GAME MARKET POINT</span>
          <h2>적립금</h2>
          <p>거래 보상과 이벤트로 지급된 적립금을 확인하고, 결제 단계에서 사용할 수 있습니다.</p>
        </header>

        <section className="point-summary-grid" aria-label="적립금 요약">
          <article className="point-balance-card point-balance-card--primary">
            <span>사용 가능 적립금</span>
            <strong>{won(member.point)}</strong>
            <p>결제 시 보유 금액 내에서 즉시 차감됩니다.</p>
          </article>
          <article className="point-balance-card">
            <span>이번 달 적립</span>
            <strong>{won(4000)}</strong>
            <p>데모 데이터 기준 누적 적립금입니다.</p>
          </article>
          <article className="point-balance-card">
            <span>이번 달 사용</span>
            <strong>{won(1000)}</strong>
            <p>거래 결제에서 사용된 금액입니다.</p>
          </article>
        </section>

        <section className="point-guide-card">
          <div>
            <h3>적립금 사용 안내</h3>
            <p>실제 정책과 만료일은 백엔드 API 연동 후 내려받도록 예정되어 있습니다.</p>
          </div>
          <AppLink className="primary-button" route="trade">거래하러 가기</AppLink>
        </section>

        <section className="point-history-card" aria-labelledby="point-history-title">
          <div className="point-section-head">
            <h3 id="point-history-title">적립금 내역</h3>
            <span>최근 3건</span>
          </div>
          <div className="point-history-list">
            {pointHistory.map((item) => (
              <div className="point-history-row" key={`${item.title}-${item.date}`}>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.date} · {item.status}</span>
                </div>
                <b className={item.amount > 0 ? "is-plus" : "is-minus"}>
                  {item.amount > 0 ? "+" : ""}
                  {won(item.amount)}
                </b>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="section mileage-page">
      <header className="section-title"><h2>{titles[kind]}</h2><p>외부 결제 및 은행 연동 없이 더미 잔액으로 표시합니다.</p></header>
      <div className="trust-section">
        <div className="trust-card"><b>{won(member.mileage)}</b><p>마일리지</p></div>
        <div className="trust-card"><b>{won(member.point)}</b><p>적립금</p></div>
        <div className="trust-card"><b>0원</b><p>처리 대기</p></div>
      </div>
      {(kind === "mile-in" || kind === "mile-out") && (
        <form className="login-card" onSubmit={(event) => { event.preventDefault(); alert(`${titles[kind]} 데모입니다.`); }}>
          <input type="number" placeholder="금액" min="1000" required />
          <button className="primary-button" type="submit">신청하기</button>
        </form>
      )}
      {kind === "mile-history" && (
        <div className="trade-market-list">
          {["더미 충전 신청", "거래 결제", "적립금 사용"].map((title, index) => (
            <div className="trade-market-item" key={title}><span className="trade-title">{title}</span><span>2026.05.{20 + index}</span><strong>{won([50000, -15500, -3000][index])}</strong></div>
          ))}
        </div>
      )}
    </main>
  );
}

export function NoticeListPage() {
  return (
    <main className="page-main notice-board-page section">
      <div className="notice-board-wrap">
        <header className="notice-board-head">
          <div>
            <p className="notice-board-kicker">CUSTOMER CENTER</p>
            <h2 className="notice-board-title">공지사항</h2>
          </div>
          <AppLink className="notice-board-contact" route="chat">
            <span className="notice-contact-icon">1:1</span>
            채널톡 문의
          </AppLink>
        </header>
        <div className="notice-board-guide">
          <span className="notice-guide-icon">!</span>
          게임마켓의 서비스 안내와 업데이트 소식을 확인해 주세요.
        </div>
        <div className="notice-board-summary">
          총 <strong>{notices.length}</strong>건
        </div>
        <ul className="notice-board-list">
          {notices.map((notice) => (
            <li key={notice.id}>
              <AppLink className="notice-board-item" route="notice-detail" params={{ id: notice.id }}>
                <span className="notice-board-number">{notice.id}</span>
                <span className="notice-board-item-main">
                  <strong>{notice.title}</strong>
                  <em>{notice.date}</em>
                </span>
                <span className="notice-board-arrow">›</span>
              </AppLink>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export function NoticeDetailPage({ params }) {
  const notice = notices.find((item) => item.id === params.get("id")) || notices[0];
  return (
    <main className="page-main notice-board-page notice-detail-page section">
      <div className="notice-board-wrap notice-detail-wrap">
        <nav className="notice-detail-nav" aria-label="공지 상세 이동">
          <AppLink className="notice-board-back" route="notice-list">← 목록으로</AppLink>
        </nav>
        <article className="notice-detail-article">
          <header className="notice-detail-head">
            <p className="notice-board-kicker notice-detail-kicker">공지사항</p>
            <h2 className="notice-detail-title">{notice.title}</h2>
            <div className="notice-detail-meta">
              <span>{notice.date}</span>
            </div>
          </header>
          <div className="notice-detail-content">
            <p>{notice.content}</p>
          </div>
        </article>
      </div>
    </main>
  );
}

export function FaqPage() {
  const [active, setActive] = useState(faqGroups[0].id);
  const group = faqGroups.find((item) => item.id === active) || faqGroups[0];

  return (
    <main id="wrap" className="page-main faq-board-page">
      <div className="notice_page_wrap">
        <div className="notice_title_wrap">
          <div className="notice_title">FAQ</div>
          <div className="notice_title_info"><div className="notice_title_info_row"><span>- 1:1상담은 카카오채널 채팅으로 아침 9시부터 새벽 1시까지 가능합니다.</span><AppLink route="chat">1:1채널톡 문의</AppLink></div></div>
        </div>
        <div className="faq_list_wrap">
          <div className="faq_tabs_row">
            <ul className="tabs" role="tablist">
              {faqGroups.map((item) => <li role="tab" className={`tab-link ${active === item.id ? "current" : ""}`} aria-selected={active === item.id} tabIndex={active === item.id ? 0 : -1} key={item.id} onClick={() => setActive(item.id)}>{item.label}</li>)}
            </ul>
            <span className="tab-link-bottom" aria-hidden="true"></span>
          </div>
          <div className="tab-content current" role="tabpanel">
            <ul className="faq_list">
              {group.items.map((item) => (
                <li key={item.q}>
                  <details className="faq-acc-item">
                    <summary className="question"><div><img src={assetPath("faq_question_icon.svg")} alt="" /><span>{item.q}</span></div><img className="faq-chevron" src={assetPath("faq_down_icon.svg")} alt="" /></summary>
                    <div className="answer"><div className="answer-inner"><p>{item.a}</p></div></div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export function AccountPage({ params }) {
  const game = params.get("game") || "던전앤파이터";
  return (
    <main className="section account-page">
      <header className="section-title"><h2>{game} 계정거래</h2><p>계정거래 상세 조건은 더미 데이터로 구성되어 있습니다.</p></header>
      <div className="trust-section"><div className="trust-card"><b>실명인증</b><p>판매자 인증 정보 표시</p></div><div className="trust-card"><b>안전결제</b><p>구매확정 전 결제금 보관</p></div><div className="trust-card"><b>채팅상담</b><p>외부 채팅 연동 전 placeholder</p></div></div>
      <AppLink className="primary-button" route="trade-write" params={{ status: "sell", krgame: game }}>계정 판매등록</AppLink>
    </main>
  );
}

export function ChatPage() {
  return (
    <main className="section">
      <section className="login-card">
        <h2>채팅</h2>
        <p>외부 채팅 서비스는 아직 연동하지 않았습니다. 현재는 placeholder 화면입니다.</p>
        <AppLink className="primary-button" route="notice-list">고객센터로 이동</AppLink>
      </section>
    </main>
  );
}
