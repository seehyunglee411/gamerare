import { useState } from "react";
import { assetPath } from "../data/mockData.js";

const searchLogoOverrides = {
  "바람의나라 클래식": "account/game/바람의나라클래식.png",
  "패스오브엑자일2": "account/game/POE2.png",
  리니지m: "account/game/리니지M.png",
  "디아블로2:레저렉션": "account/game/디아블로2 레저럭션.png",
  메이플스토리M: "account/game/메이플스토리m.png",
  "바람의나라:연": "account/game/바람의나라 연.png",
  리니지클래식: "account/game/리니지 클래식.png",
};

export function SearchGameLogo({ game, className = "" }) {
  const [imageFailed, setImageFailed] = useState(false);
  const image = game.image || searchLogoOverrides[game.name] || `account/game/${game.name}.png`;
  const showImage = image && !imageFailed;

  return (
    <span className={`search-game-logo ${className}`} aria-hidden="true">
      {showImage && (
        <img
          src={assetPath(image)}
          alt=""
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      )}
      <span className={showImage ? "search-game-logo-fallback" : ""}>{game.logoText}</span>
    </span>
  );
}
