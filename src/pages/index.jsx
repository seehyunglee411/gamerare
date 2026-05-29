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
import {
  Button,
  Card,
  Chip,
  EmptyState,
  Eyebrow,
  FormField,
  IconButton,
  Input,
  NumberStepper,
  PriceText,
  Select,
  StatCard,
  Tabs,
  Textarea,
} from "../components/ui/index.js";
import {
  Page,
  PageHero,
  SectionTitle,
  SidebarLayout,
  SummaryGrid,
} from "../components/layout/index.js";
import { TradeListItem, TradeTypeBadge } from "../components/domain/index.js";

export function HomePage() {
  return (
    <Page>
      <section className="hero">
        <div className="hero-card">
          <div className="hero-copy">
            <Eyebrow tone="light">GAME MARKET SAFE TRADE</Eyebrow>
            <h2>
              게임 계정·아이템·게임머니
              <br />
              안전거래 플랫폼
            </h2>
            <p>
              인기 게임 거래를 한 곳에서 빠르게 찾고, 24시간 사고대응 전담팀과 최대 보상 정책으로 더
              안심하고 이용하세요.
            </p>
            <div className="hero-actions">
              <AppLink className="primary-button" route="trade-write" params={{ status: "sell" }}>
                판매등록
              </AppLink>
              <AppLink className="ghost-button" route="trade-write" params={{ status: "buy" }}>
                구매등록
              </AppLink>
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

      <section className="split-section">
        <div className="popular-games">
          <SectionTitle title="인기 게임 TOP5" className="mb-5" />
          <ol className="game-list">
            {popularGames.map((game, index) => (
              <li key={game.gm}>
                <AppLink
                  route="trade"
                  params={{
                    gm: game.gm,
                    sv: game.sv || "",
                    krgame: game.name,
                    krserver: game.server,
                    type: "sell",
                  }}
                >
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
          <SectionTitle title="게임마켓 퀵메뉴" className="mb-5" />
          <div className="quick-grid">
            <AppLink route="trade-write" params={{ status: "sell" }}>
              <i>팝니다</i>
              <span>판매등록</span>
            </AppLink>
            <AppLink route="trade-write" params={{ status: "buy" }}>
              <i>삽니다</i>
              <span>구매등록</span>
            </AppLink>
            <AppLink route="game-select">
              <i>계정</i>
              <span>계정거래</span>
            </AppLink>
            <AppLink route="mileage">
              <i>마일</i>
              <span>마일리지</span>
            </AppLink>
          </div>
        </div>
      </section>

      <section className="trust-section">
        {["24시간 모니터링", "실명·계좌 인증", "안전 결제 보관"].map((title, index) => (
          <div className="trust-card" key={title}>
            <b>{title}</b>
            <p>
              {
                [
                  "사기 의심 거래를 실시간으로 탐지하고 대응합니다.",
                  "판매자 인증 정보를 거래 전 확인할 수 있습니다.",
                  "구매 확정 전까지 결제금을 안전하게 보관합니다.",
                ][index]
              }
            </p>
          </div>
        ))}
      </section>
    </Page>
  );
}

export function TradeListPage({ params }) {
  const selectedType = params.get("type") || "sell";
  const selectedGame = params.get("krgame") || "던전앤파이터";
  const [bookmarked, setBookmarked] = useState(
    () => localStorage.getItem("gm-trade-bookmark") === "1",
  );
  const visibleTrades = trades.filter(
    (trade) => trade.type === selectedType || trade.game === selectedGame,
  );

  useEffect(() => {
    localStorage.setItem("gm-trade-bookmark", bookmarked ? "1" : "0");
  }, [bookmarked]);

  return (
    <Page>
      <SidebarLayout
        aside={
          <>
            <MemberCard />
            <Card padding="md" className="mt-4">
              <h3 className="m-0 text-base font-black text-ink">최근 본 게임</h3>
              <p className="m-0 mt-2 text-sm text-muted">
                {selectedGame} · {params.get("krserver") || "전체서버"}
              </p>
            </Card>
          </>
        }
      >
        <Card padding="lg" id="trade-list">
          <SectionTitle
            eyebrow="GAME MARKET"
            title={`${selectedGame} ${selectedType === "buy" ? "구매" : "판매"} 거래`}
            action={
              <IconButton
                variant={bookmarked ? "warning" : "default"}
                shape="pill"
                size="md"
                className="!w-auto px-4"
                aria-label="즐겨찾기 토글"
                onClick={() => setBookmarked((value) => !value)}
              >
                {bookmarked ? "★ 즐겨찾기" : "☆ 즐겨찾기"}
              </IconButton>
            }
          />
          <Tabs variant="pill" className="mt-5 mb-4" aria-label="거래 유형">
            <Tabs.Item
              active={selectedType === "sell"}
              variant="pill"
              route="trade"
              params={{ krgame: selectedGame, krserver: "전체서버", type: "sell" }}
            >
              팝니다
            </Tabs.Item>
            <Tabs.Item
              active={selectedType === "buy"}
              variant="pill"
              route="trade"
              params={{ krgame: selectedGame, krserver: "전체서버", type: "buy" }}
            >
              삽니다
            </Tabs.Item>
          </Tabs>
          <div className="grid gap-3">
            {visibleTrades.map((trade) => (
              <TradeListItem
                key={trade.id}
                trade={trade}
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
              />
            ))}
            {!visibleTrades.length && (
              <EmptyState
                title="조건에 맞는 거래가 없습니다."
                description="다른 게임이나 거래 유형을 선택해 보세요."
              />
            )}
          </div>
        </Card>
      </SidebarLayout>
    </Page>
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

  return (
    <Page>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="grid gap-5" aria-labelledby="trade-detail-title">
          <nav
            className="flex flex-wrap items-center gap-2 text-sm text-muted"
            aria-label="현재 위치"
          >
            <AppLink
              className="hover:text-primary"
              route="trade"
              params={{
                gm: trade.gm,
                sv: trade.sv,
                krgame: trade.game,
                krserver: trade.server,
                type: trade.type,
              }}
            >
              {trade.game}
            </AppLink>
            <span aria-hidden="true">›</span>
            <AppLink
              className="hover:text-primary"
              route="trade"
              params={{
                gm: trade.gm,
                sv: trade.sv,
                krgame: trade.game,
                krserver: trade.server,
                type: trade.type,
              }}
            >
              {trade.server}
            </AppLink>
            <span aria-hidden="true">›</span>
            <span>{trade.itemType}</span>
            <span aria-hidden="true">›</span>
            <strong className="text-ink">#{trade.id}</strong>
            <TradeTypeBadge type={trade.type} className="ml-2" />
          </nav>

          <Card padding="lg">
            <header className="grid gap-3">
              <h2 id="trade-detail-title" className="m-0 text-2xl font-black text-ink">
                {trade.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Chip variant={trade.status === "away" ? "warning" : "success"}>
                  {trade.status === "away" ? "자리비움" : "온라인"}
                </Chip>
                <span className="font-bold text-ink">{trade.seller}</span>
                <span className="h-3 w-px bg-line" aria-hidden="true" />
                <span className="text-muted">거래중 313건</span>
                <Chip variant="info">실명인증</Chip>
                <Chip variant="info">휴대폰</Chip>
                <Chip variant="info">출금계좌</Chip>
              </div>
            </header>
          </Card>

          <Card padding="lg">
            <Card.Header title="가격정보" />
            <div className="mt-4 grid gap-2">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted">{trade.unitLabel}</span>
                <PriceText value={trade.unitPrice} tone="primary" size="xl" />
              </div>
              <p className="m-0 flex flex-wrap items-center gap-2 text-sm text-muted">
                <span>
                  최소 <strong className="text-ink">{trade.minQty}개</strong>
                </span>
                <span>~</span>
                <span>
                  최대 <strong className="text-ink">{trade.maxQty}개</strong>
                </span>
              </p>
            </div>
          </Card>

          <Card padding="lg">
            <Card.Header title="상세설명" />
            <div className="mt-4 grid gap-2 text-[15px] leading-relaxed text-ink">
              {trade.description.map((line) => (
                <p key={line} className="m-0">
                  {line}
                </p>
              ))}
            </div>
          </Card>
        </section>

        <aside aria-label="결제 정보">
          <Card padding="lg" className="grid gap-5">
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <strong className="text-base font-black text-ink">구매 수량</strong>
                <div className="text-right text-sm text-muted">
                  <span className="mr-1">{qty}개</span>
                  <span aria-hidden="true" className="mr-1">
                    =
                  </span>
                  <strong className="text-ink">
                    {trade.itemType} {qty}개
                  </strong>
                </div>
              </div>
              <NumberStepper
                value={qty}
                min={1}
                max={trade.maxQty}
                onChange={setQty}
                className="w-full justify-between"
                aria-label="구매 수량"
              />
            </div>

            <FormField label="구매자 캐릭터명">
              <Input placeholder="물품을 전달 받으실 본인의 캐릭터명" />
            </FormField>

            <fieldset className="grid gap-2 rounded-2xl border border-line p-4">
              <legend className="px-1 text-sm font-black text-ink">구매자 안심서비스</legend>
              <label className="flex items-center gap-2 rounded-xl border border-line bg-primary-soft p-3 text-sm font-bold">
                <input type="radio" name="assurance" defaultChecked className="accent-primary" />
                <span>보증서비스 미사용</span>
              </label>
              <label className="flex items-center gap-2 rounded-xl border border-line bg-white p-3 text-sm font-bold">
                <input type="radio" name="assurance" className="accent-primary" />
                <span>
                  사고발생시 100% 보상 <small className="font-medium text-muted">(보증료 1.5%)</small>
                </span>
              </label>
            </fieldset>

            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <strong className="text-sm font-black text-ink">결제수단</strong>
                <AppLink route="mile-in" className="text-sm font-bold text-primary hover:underline">
                  마일리지 충전하기
                </AppLink>
              </div>
              <Tabs variant="segmented" aria-label="결제수단">
                {[
                  ["mileage", "마일리지"],
                  ["card", "신용카드"],
                  ["phone", "휴대폰"],
                ].map(([value, label]) => (
                  <Tabs.Item
                    key={value}
                    variant="segmented"
                    active={payMethod === value}
                    onClick={() => setPayMethod(value)}
                  >
                    {label}
                  </Tabs.Item>
                ))}
              </Tabs>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-sm font-black text-ink">적립금 사용</strong>
                  <p className="m-0 text-xs text-muted">(보유: {won(trade.point)})</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    size="sm"
                    className="!w-28 text-right"
                    value={point}
                    onChange={(event) =>
                      setPoint(
                        Math.min(Math.max(Number(event.target.value) || 0, 0), trade.point),
                      )
                    }
                  />
                  <Button
                    variant="soft"
                    size="sm"
                    onClick={() => setPoint(trade.point)}
                  >
                    전액사용
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
                <span className="text-muted">보유 마일리지</span>
                <PriceText value={trade.mileage} tone="blue" size="md" />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-sm font-black text-ink">총 결제금액</span>
              <PriceText value={finalPrice} tone="primary" size="2xl" />
            </div>

            <div className="grid grid-cols-[1fr_2fr] gap-2">
              <Button variant="outline" route="chat" size="lg">
                채팅
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => alert("외부 결제 연동 전 데모 화면입니다.")}
              >
                결제
              </Button>
            </div>
          </Card>
        </aside>
      </div>
    </Page>
  );
}

export function TradeWritePage({ params }) {
  const isBuy = params.get("status") === "buy";
  const initialGame = writeGames.find((game) => game.gm === params.get("gm")) || writeGames[0];
  const [game, setGame] = useState(initialGame);
  const [server, setServer] = useState(params.get("krserver") || initialGame.servers[0]);
  const [itemType, setItemType] = useState(initialGame.itemRows[0]);

  return (
    <Page>
      <Card padding="lg" className="grid gap-6">
        <SectionTitle
          eyebrow={isBuy ? "BUY REQUEST" : "SELL REQUEST"}
          title={isBuy ? "구매등록" : "판매등록"}
          description="백엔드 API 개발 전까지 등록 내용은 저장하지 않고 데모 알림만 표시합니다."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <PickerColumn
            title="게임선택"
            items={writeGames.map((item) => ({ key: item.gm, label: item.name, value: item }))}
            isActive={(value) => game.gm === value.gm}
            onSelect={(value) => {
              setGame(value);
              setServer(value.servers[0]);
              setItemType(value.itemRows[0]);
            }}
          />
          <PickerColumn
            title="서버선택"
            items={game.servers.map((item) => ({ key: item, label: item, value: item }))}
            isActive={(value) => server === value}
            onSelect={setServer}
          />
          <PickerColumn
            title="물품종류"
            items={game.itemRows.map((item) => ({ key: item, label: item, value: item }))}
            isActive={(value) => itemType === value}
            onSelect={setItemType}
          />
        </div>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            alert(
              `${game.name} ${server} ${itemType} ${isBuy ? "구매" : "판매"} 등록 데모입니다.`,
            );
          }}
        >
          <FormField label="제목" required>
            <Input
              required
              name="title"
              placeholder={`${game.name} ${itemType} ${isBuy ? "삽니다" : "팝니다"}`}
            />
          </FormField>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="단가" required>
              <Input required name="price" type="number" min="1" placeholder="거래 단가" suffix="원" />
            </FormField>
            <FormField label="수량" required>
              <Input
                required
                name="qty"
                type="number"
                min="1"
                placeholder="최소 거래 수량"
                suffix="개"
              />
            </FormField>
          </div>
          <FormField label="상세설명">
            <Textarea name="description" rows={6} placeholder="거래 조건과 가능 시간을 입력해주세요." />
          </FormField>
          <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">
            {game.name} › {server} › {itemType}
          </div>
          <Button type="submit" variant="primary" size="lg" fullWidth>
            {isBuy ? "구매등록" : "판매등록"}
          </Button>
        </form>
      </Card>
    </Page>
  );
}

function PickerColumn({ title, items, isActive, onSelect }) {
  return (
    <div className="grid gap-2 rounded-2xl border border-line bg-slate-50 p-4">
      <strong className="text-sm font-black text-ink">{title}</strong>
      <div className="grid gap-2">
        {items.map(({ key, label, value }) => {
          const active = isActive(value);
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(value)}
              className={`rounded-xl border bg-white px-3 py-2.5 text-left text-sm font-bold transition-colors ${
                active
                  ? "border-primary text-primary"
                  : "border-line text-ink hover:border-primary/60"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function GameSelectPage() {
  const [keyword, setKeyword] = useState("");
  const filtered = accountGames.filter((game) => game.name.includes(keyword));

  return (
    <Page>
      <SectionTitle
        title="계정거래 게임 선택"
        description="더미 게임 목록에서 계정거래 화면으로 이동합니다."
        className="mb-6"
      />
      <Card padding="md" className="mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="게임명을 검색하세요"
          />
          <Button variant="primary">검색</Button>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {filtered.map((game) => (
          <AppLink
            key={game.name}
            route="account"
            params={{ game: game.name }}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-5 text-center text-ink no-underline shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40"
          >
            <img
              className="h-16 w-auto object-contain"
              src={assetPath(game.image)}
              alt=""
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <strong className="text-sm font-black">{game.name}</strong>
          </AppLink>
        ))}
        {!filtered.length && (
          <div className="col-span-full">
            <EmptyState
              title="검색 결과가 없습니다."
              description="다른 게임명으로 검색해 보세요."
            />
          </div>
        )}
      </div>
    </Page>
  );
}

export function AuthPage({ mode }) {
  const titles = {
    login: "로그인",
    join: "회원가입",
    "find-id": "아이디 찾기",
    "find-pw": "비밀번호 찾기",
  };

  return (
    <Page>
      <div className="mx-auto max-w-md">
        <Card padding="lg" className="grid gap-5">
          <SectionTitle
            title={titles[mode]}
            description="인증/회원 API 연동 전까지 데모 폼으로 동작합니다."
          />
          <form
            className="grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              alert(`${titles[mode]} 데모입니다.`);
            }}
          >
            {mode !== "find-id" && (
              <FormField label="아이디" required>
                <Input type="text" placeholder="아이디" required />
              </FormField>
            )}
            {mode !== "find-id" && mode !== "join" && (
              <FormField label="비밀번호" required>
                <Input type="password" placeholder="비밀번호" required />
              </FormField>
            )}
            {(mode === "find-id" || mode === "join") && (
              <FormField label="휴대폰 번호" required>
                <Input type="tel" placeholder="010-0000-0000" required />
              </FormField>
            )}
            {mode === "join" && (
              <FormField label="이메일" required>
                <Input type="email" placeholder="example@email.com" required />
              </FormField>
            )}
            <Button variant="primary" size="lg" fullWidth type="submit">
              {titles[mode]}
            </Button>
          </form>
          <div className="flex flex-wrap justify-center gap-3 text-sm font-bold text-muted">
            <AppLink className="hover:text-primary" route="find-id">
              아이디 찾기
            </AppLink>
            <span>·</span>
            <AppLink className="hover:text-primary" route="find-pw">
              비밀번호 찾기
            </AppLink>
            <span>·</span>
            <AppLink className="hover:text-primary" route="join">
              회원가입
            </AppLink>
          </div>
        </Card>
      </div>
    </Page>
  );
}

export function MyPage() {
  return (
    <Page>
      <SidebarLayout aside={<MemberCard />}>
        <Card padding="lg" className="grid gap-6">
          <SectionTitle
            title="마이룸"
            description="회원 상태와 거래 현황을 더미 데이터로 표시합니다."
          />
          <SummaryGrid columns={3}>
            <StatCard label="보유 마일리지" value={won(member.mileage)} tone="primary" />
            <StatCard label="보유 적립금" value={won(member.point)} />
            <StatCard label="진행 중 거래" value="0건" />
          </SummaryGrid>
          <div className="quick-grid">
            <AppLink route="member-modify">
              <i>수정</i>
              <span>회원정보</span>
            </AppLink>
            <AppLink route="mile-in">
              <i>충전</i>
              <span>마일리지</span>
            </AppLink>
            <AppLink route="sales-history">
              <i>판매</i>
              <span>판매내역</span>
            </AppLink>
            <AppLink route="purchase-history">
              <i>구매</i>
              <span>구매내역</span>
            </AppLink>
            <AppLink route="mywrite">
              <i>게시</i>
              <span>내게시글</span>
            </AppLink>
            <AppLink route="member-exit">
              <i>탈퇴</i>
              <span>회원탈퇴</span>
            </AppLink>
          </div>
        </Card>
      </SidebarLayout>
    </Page>
  );
}

export function MyWritePage() {
  const visibleTrades = trades.slice(0, 2);
  return (
    <Page>
      <SectionTitle
        title="내게시글"
        description="등록 API가 없어서 현재는 샘플 거래만 표시합니다."
        className="mb-6"
      />
      <div className="grid gap-3">
        {visibleTrades.map((trade) => (
          <TradeListItem key={trade.id} trade={trade} />
        ))}
        {!visibleTrades.length && (
          <EmptyState title="등록한 게시글이 없습니다." description="판매/구매 등록을 시도해 보세요." />
        )}
      </div>
    </Page>
  );
}

export function TradeHistoryPage({ type }) {
  const isSell = type === "sell";
  const pageTitle = isSell ? "판매내역" : "구매내역";
  const filteredTrades = trades.filter((trade) => trade.type === type);
  const totalAmount = filteredTrades.reduce(
    (sum, trade) => sum + trade.unitPrice * trade.minQty,
    0,
  );

  return (
    <Page>
      <div className="grid gap-6">
        <PageHero
          eyebrow={isSell ? "SELL HISTORY" : "BUY HISTORY"}
          title={pageTitle}
          description={
            isSell
              ? "판매 등록 및 거래 진행 내역을 확인합니다."
              : "구매 요청 및 결제 진행 내역을 확인합니다."
          }
          aside={
            <SummaryGrid columns={3} gap="sm">
              <StatCard label="총 거래" value={`${filteredTrades.length}건`} />
              <StatCard label="거래 예정 금액" value={won(totalAmount)} tone="primary" />
              <StatCard
                label="진행 상태"
                value={filteredTrades.length ? "진행중" : "대기없음"}
              />
            </SummaryGrid>
          }
        />

        <Card padding="none" className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h3 className="m-0 text-lg font-black text-ink">{pageTitle} 목록</h3>
            <Button
              variant="soft"
              size="sm"
              route="trade-write"
              params={{ status: isSell ? "sell" : "buy" }}
            >
              {isSell ? "판매등록" : "구매등록"}
            </Button>
          </div>
          <div className="grid">
            {filteredTrades.map((trade) => (
              <TradeListItem key={trade.id} trade={trade} variant="history" />
            ))}
            {!filteredTrades.length && (
              <EmptyState
                title={`${pageTitle}이 없습니다.`}
                description="새 거래를 등록하면 이곳에 표시됩니다."
              />
            )}
          </div>
        </Card>
      </div>
    </Page>
  );
}

export function MemberModifyPage() {
  return (
    <Page>
      <div className="mx-auto max-w-md">
        <Card padding="lg" className="grid gap-5">
          <SectionTitle title="회원정보 수정" />
          <form
            className="grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              alert("회원정보 수정 데모입니다.");
            }}
          >
            <FormField label="닉네임">
              <Input defaultValue={member.id} placeholder="닉네임" />
            </FormField>
            <FormField label="휴대폰">
              <Input defaultValue={member.phone} placeholder="휴대폰" />
            </FormField>
            <FormField label="이메일">
              <Input defaultValue={member.email} placeholder="이메일" />
            </FormField>
            <Button variant="primary" size="lg" fullWidth type="submit">
              수정하기
            </Button>
          </form>
        </Card>
      </div>
    </Page>
  );
}

export function MemberExitPage() {
  return (
    <Page>
      <div className="mx-auto max-w-md">
        <Card padding="lg" className="grid gap-5">
          <SectionTitle title="회원탈퇴" description="실제 탈퇴 처리는 API 개발 후 연결됩니다." />
          <Button
            variant="primary"
            size="lg"
            onClick={() => alert("회원탈퇴 데모입니다.")}
          >
            탈퇴 신청
          </Button>
        </Card>
      </div>
    </Page>
  );
}

export function WalletPage({ kind }) {
  const titles = {
    mileage: "마일리지",
    "mile-in": "마일리지 충전",
    "mile-out": "마일리지 출금",
    "mile-history": "마일리지 내역",
    point: "적립금",
  };

  if (kind === "mile-in" || kind === "mile-out") {
    return <MileageActionPage kind={kind} />;
  }

  if (kind === "point") {
    return <PointPage />;
  }

  if (kind === "mile-history") {
    return <MileHistoryPage />;
  }

  return (
    <Page>
      <SectionTitle
        title={titles[kind]}
        description="외부 결제 및 은행 연동 없이 더미 잔액으로 표시합니다."
        className="mb-6"
      />
      <SummaryGrid columns={3}>
        <StatCard label="마일리지" value={won(member.mileage)} tone="primary" />
        <StatCard label="적립금" value={won(member.point)} />
        <StatCard label="처리 대기" value="0원" />
      </SummaryGrid>
    </Page>
  );
}

function MileageActionPage({ kind }) {
  const isCharge = kind === "mile-in";
  const title = isCharge ? "마일리지 충전" : "마일리지 출금";
  const primaryLabel = isCharge ? "충전 신청" : "출금 신청";
  const guideItems = isCharge
    ? [
        "입금자명과 신청 금액이 일치해야 빠르게 처리됩니다.",
        "외부 결제 연동 전까지 실제 충전은 발생하지 않는 데모 화면입니다.",
      ]
    : [
        "출금은 본인 명의 계좌 기준으로 처리됩니다.",
        "은행 API 연동 전까지 실제 출금은 발생하지 않는 데모 화면입니다.",
      ];

  return (
    <Page>
      <div className="grid gap-6">
        <PageHero
          eyebrow={isCharge ? "MILEAGE CHARGE" : "MILEAGE WITHDRAW"}
          title={title}
          description={
            isCharge
              ? "거래에 사용할 마일리지를 충전 신청합니다."
              : "보유 마일리지를 등록 계좌로 출금 신청합니다."
          }
          aside={
            <SummaryGrid columns={3} gap="sm">
              <StatCard label="보유 마일리지" value={won(member.mileage)} tone="primary" />
              <StatCard
                label={isCharge ? "최소 충전" : "최소 출금"}
                value={won(1000)}
              />
              <StatCard label="처리 대기" value={won(0)} />
            </SummaryGrid>
          }
        />

        <Card padding="none" className="overflow-hidden">
          <div className="grid gap-0 md:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.65fr)]">
            <form
              className="grid gap-4 p-7"
              onSubmit={(event) => {
                event.preventDefault();
                alert(`${title} 데모입니다.`);
              }}
            >
              <h3 className="m-0 text-xl font-black text-ink">{primaryLabel}</h3>
              <FormField label="신청 금액" required>
                <Input
                  type="number"
                  min="1000"
                  step="1000"
                  placeholder="금액을 입력하세요"
                  suffix="원"
                  required
                />
              </FormField>
              {isCharge ? (
                <FormField label="입금자명" required>
                  <Input type="text" placeholder="입금자명을 입력하세요" required />
                </FormField>
              ) : (
                <>
                  <FormField label="은행" required>
                    <Select defaultValue="국민은행" required>
                      <option>국민은행</option>
                      <option>신한은행</option>
                      <option>하나은행</option>
                      <option>우리은행</option>
                    </Select>
                  </FormField>
                  <FormField label="계좌번호" required>
                    <Input type="text" placeholder="계좌번호를 입력하세요" required />
                  </FormField>
                </>
              )}
              <Button
                type="submit"
                variant={isCharge ? "primary" : "info"}
                size="lg"
                fullWidth
              >
                {primaryLabel}
              </Button>
            </form>

            <aside className="grid gap-4 border-l border-slate-100 bg-slate-50 p-7">
              <h3 className="m-0 text-xl font-black text-ink">이용 안내</h3>
              <ul className="m-0 grid list-disc gap-2 pl-5 text-sm leading-relaxed text-slate-600">
                {guideItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="grid gap-1 rounded-2xl bg-white p-4 shadow-card">
                <span className="text-xs font-black text-muted">
                  {isCharge ? "입금 계좌" : "출금 수수료"}
                </span>
                <strong className="text-base font-black text-ink">
                  {isCharge ? "국민 000000-00-000000" : won(1000)}
                </strong>
              </div>
              <Button variant="soft" route="mile-history">
                충전/출금 내역 보기
              </Button>
            </aside>
          </div>
        </Card>
      </div>
    </Page>
  );
}

function PointPage() {
  const pointHistory = [
    { title: "거래 결제 적립", date: "2026.05.26", amount: 3000, status: "지급완료" },
    { title: "이벤트 참여 적립", date: "2026.05.22", amount: 1000, status: "지급완료" },
    { title: "거래 상세 결제 사용", date: "2026.05.20", amount: -1000, status: "사용완료" },
  ];

  return (
    <Page>
      <div className="grid gap-6">
        <PageHero
          eyebrow="GAME MARKET POINT"
          title="적립금"
          description="거래 보상과 이벤트로 지급된 적립금을 확인하고, 결제 단계에서 사용할 수 있습니다."
        />

        <SummaryGrid columns={3}>
          <StatCard
            label="사용 가능 적립금"
            value={won(member.point)}
            description="결제 시 보유 금액 내에서 즉시 차감됩니다."
            tone="primary"
          />
          <StatCard
            label="이번 달 적립"
            value={won(4000)}
            description="데모 데이터 기준 누적 적립금입니다."
          />
          <StatCard
            label="이번 달 사용"
            value={won(1000)}
            description="거래 결제에서 사용된 금액입니다."
          />
        </SummaryGrid>

        <Card padding="lg">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="m-0 text-lg font-black text-ink">적립금 사용 안내</h3>
              <p className="m-0 mt-1 text-sm text-muted">
                실제 정책과 만료일은 백엔드 API 연동 후 내려받도록 예정되어 있습니다.
              </p>
            </div>
            <Button variant="primary" route="trade">
              거래하러 가기
            </Button>
          </div>
        </Card>

        <Card padding="none" className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h3 className="m-0 text-lg font-black text-ink">적립금 내역</h3>
            <span className="text-xs font-bold text-muted">최근 3건</span>
          </div>
          <div className="grid">
            {pointHistory.map((item) => (
              <div
                key={`${item.title}-${item.date}`}
                className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-4 last:border-b-0"
              >
                <div className="grid gap-1">
                  <strong className="text-ink">{item.title}</strong>
                  <span className="text-xs text-muted">
                    {item.date} · {item.status}
                  </span>
                </div>
                <PriceText
                  value={item.amount}
                  tone={item.amount > 0 ? "primary" : "blue"}
                  size="md"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Page>
  );
}

function MileHistoryPage() {
  const history = [
    { title: "더미 충전 신청", date: "2026.05.20", amount: 50000 },
    { title: "거래 결제", date: "2026.05.21", amount: -15500 },
    { title: "적립금 사용", date: "2026.05.22", amount: -3000 },
  ];
  return (
    <Page>
      <SectionTitle title="마일리지 내역" className="mb-6" />
      <Card padding="none" className="overflow-hidden">
        <div className="grid">
          {history.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-4 last:border-b-0"
            >
              <div className="grid gap-1">
                <strong className="text-ink">{item.title}</strong>
                <span className="text-xs text-muted">{item.date}</span>
              </div>
              <PriceText
                value={item.amount}
                tone={item.amount > 0 ? "primary" : "blue"}
                size="md"
              />
            </div>
          ))}
        </div>
      </Card>
    </Page>
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
              <AppLink
                className="notice-board-item"
                route="notice-detail"
                params={{ id: notice.id }}
              >
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
          <AppLink className="notice-board-back" route="notice-list">
            ← 목록으로
          </AppLink>
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
          <div className="notice_title_info">
            <div className="notice_title_info_row">
              <span>- 1:1상담은 카카오채널 채팅으로 아침 9시부터 새벽 1시까지 가능합니다.</span>
              <AppLink route="chat">1:1채널톡 문의</AppLink>
            </div>
          </div>
        </div>
        <div className="faq_list_wrap">
          <div className="faq_tabs_row">
            <ul className="tabs" role="tablist">
              {faqGroups.map((item) => (
                <li
                  role="tab"
                  className={`tab-link ${active === item.id ? "current" : ""}`}
                  aria-selected={active === item.id}
                  tabIndex={active === item.id ? 0 : -1}
                  key={item.id}
                  onClick={() => setActive(item.id)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
            <span className="tab-link-bottom" aria-hidden="true"></span>
          </div>
          <div className="tab-content current" role="tabpanel">
            <ul className="faq_list">
              {group.items.map((item) => (
                <li key={item.q}>
                  <details className="faq-acc-item">
                    <summary className="question">
                      <div>
                        <img src={assetPath("faq_question_icon.svg")} alt="" />
                        <span>{item.q}</span>
                      </div>
                      <img className="faq-chevron" src={assetPath("faq_down_icon.svg")} alt="" />
                    </summary>
                    <div className="answer">
                      <div className="answer-inner">
                        <p>{item.a}</p>
                      </div>
                    </div>
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
    <Page>
      <SectionTitle
        title={`${game} 계정거래`}
        description="계정거래 상세 조건은 더미 데이터로 구성되어 있습니다."
        className="mb-6"
      />
      <SummaryGrid columns={3} className="mb-6">
        <StatCard label="실명인증" value="OK" description="판매자 인증 정보 표시" />
        <StatCard label="안전결제" value="OK" description="구매확정 전 결제금 보관" />
        <StatCard
          label="채팅상담"
          value="DEMO"
          description="외부 채팅 연동 전 placeholder"
        />
      </SummaryGrid>
      <Button variant="primary" route="trade-write" params={{ status: "sell", krgame: game }}>
        계정 판매등록
      </Button>
    </Page>
  );
}

export function ChatPage() {
  return (
    <Page>
      <div className="mx-auto max-w-md">
        <Card padding="lg" className="grid gap-4">
          <SectionTitle
            title="채팅"
            description="외부 채팅 서비스는 아직 연동하지 않았습니다. 현재는 placeholder 화면입니다."
          />
          <Button variant="primary" size="lg" route="notice-list">
            고객센터로 이동
          </Button>
        </Card>
      </div>
    </Page>
  );
}
