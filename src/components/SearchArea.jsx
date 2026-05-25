import { useState } from "react";
import { games, popularGames } from "../data/mockData.js";
import { AppLink } from "./AppLink.jsx";
import { routeHref } from "../lib/router.js";
import { SearchGameLogo } from "./SearchGameLogo.jsx";

export function SearchArea() {
  const [type, setType] = useState("sell");
  const [keyword, setKeyword] = useState("");
  const filteredGames = games.filter((game) =>
    game.name.replace(/\s+/g, "").toLowerCase().includes(keyword.replace(/\s+/g, "").toLowerCase()),
  );

  const searchFirst = () => {
    const selected = filteredGames[0] || games[0];
    window.dispatchEvent(
      new CustomEvent("app:navigate", {
        detail: routeHref("trade", {
          gm: selected.gm,
          sv: selected.sv || "",
          krgame: selected.name,
          krserver: selected.server,
          type,
        }),
      }),
    );
  };

  return (
    <section className="search-area" aria-label="거래 검색">
      <div className="search-wrap">
        <div className="search-tabs" aria-label="거래 유형">
          {[
            ["sell", "팝니다"],
            ["buy", "삽니다"],
          ].map(([value, label]) => (
            <label className={`tab ${type === value ? "active" : ""}`} key={value}>
              <input
                type="radio"
                name="header-type"
                value={value}
                checked={type === value}
                onChange={() => setType(value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <div className="search-box">
          <input
            type="search"
            value={keyword}
            placeholder="게임명을 입력해주세요!"
            aria-label="게임명 검색"
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") searchFirst();
            }}
          />
          <button type="button" aria-label="검색" onClick={searchFirst}>
            검색
          </button>
        </div>
        <div className="search-dropdown">
          <div className="search_box">
            <ul className="game_list">
              {filteredGames.map((game) => (
                <li className={`game s${game.gm}`} key={`${game.gm}-${game.name}`}>
                  <AppLink
                    route="trade"
                    params={{
                      gm: game.gm,
                      sv: game.sv || "",
                      krgame: game.name,
                      krserver: game.server,
                      type,
                    }}
                  >
                    <SearchGameLogo game={game} />
                    <span>{game.name}</span>
                  </AppLink>
                </li>
              ))}
            </ul>
            <div id="server_list" className="server-list-panel">
              <div className="server-list-title">인기게임</div>
              <ul className="server_list server_list2">
                {popularGames.slice(0, 9).map((game) => (
                  <li className="server-game-card" key={game.gm}>
                    <AppLink route="trade" params={{ gm: game.gm, krgame: game.name, krserver: game.server, type }}>
                      <SearchGameLogo game={game} className="server-game-logo" />
                      <span className="server-game-name">{game.name}</span>
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
