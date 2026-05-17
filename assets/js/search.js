(() => {
  const updateType = (href, type) => {
    const [pathAndQuery, hash = ""] = href.split("#");
    const [path, query = ""] = pathAndQuery.split("?");
    const params = new URLSearchParams(query);
    params.set("type", type);
    return `${path}?${params.toString()}${hash ? `#${hash}` : ""}`;
  };

  document.querySelectorAll(".search-wrap").forEach((wrap) => {
    const input = wrap.querySelector('.search-box input[type="search"]');
    const button = wrap.querySelector(".search-box button");
    const items = Array.from(wrap.querySelectorAll(".game_list .game"));
    const links = Array.from(wrap.querySelectorAll(".search_box a[href]"));
    const radios = Array.from(wrap.querySelectorAll('.search-tabs input[type="radio"]'));

    const currentType = () => {
      const checked = radios.find((radio) => radio.checked);
      const labelText = checked?.closest("label")?.textContent?.trim();
      return labelText === "삽니다" ? "buy" : "sell";
    };

    const syncActiveTab = () => {
      radios.forEach((radio) => {
        radio.closest("label")?.classList.toggle("active", radio.checked);
      });
    };

    const syncLinks = () => {
      syncActiveTab();
      const type = currentType();
      links.forEach((link) => {
        link.href = updateType(link.getAttribute("href"), type);
      });
    };

    const filterGames = () => {
      const keyword = (input?.value || "").replace(/\s+/g, "").toLowerCase();
      items.forEach((item) => {
        const text = item.textContent.replace(/\s+/g, "").toLowerCase();
        item.hidden = Boolean(keyword) && !text.includes(keyword);
      });
    };

    input?.addEventListener("input", filterGames);
    radios.forEach((radio) => radio.addEventListener("change", syncLinks));
    wrap.addEventListener("pointerenter", syncLinks);
    input?.addEventListener("focus", syncLinks);
    syncActiveTab();

    button?.addEventListener("click", () => {
      syncLinks();
      filterGames();
      const firstVisible = items.find((item) => !item.hidden)?.querySelector("a");
      if (firstVisible) window.location.href = firstVisible.getAttribute("href");
    });
  });
})();
