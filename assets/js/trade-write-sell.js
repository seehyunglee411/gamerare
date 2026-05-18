(() => {
  const GAMES = [
    {
      gm: '16',
      sv: '36',
      name: '던전앤파이터',
      servers: ['전체서버', '디레지에', '테스트', '바칼', '카인'],
      itemRows: [
        { label: '게임머니', selltype: '머니' },
        { label: '아이템', selltype: '아이템' },
        { label: '기타', selltype: '기타' },
        { label: '계정', selltype: '계정', isAccount: true }
      ]
    },
    {
      gm: '15',
      sv: '',
      name: '메이플스토리',
      servers: ['전체서버', '스카니아', '루나', '크로아', '오로라', '베라', '엘리시움', '리부트'],
      itemRows: [
        { label: '메소', selltype: '머니' },
        { label: '아이템', selltype: '아이템' },
        { label: '기타', selltype: '기타' },
        { label: '계정', selltype: '계정', isAccount: true }
      ]
    },
    {
      gm: '14',
      sv: '',
      name: '로스트아크',
      servers: ['전체서버', '카제로스', '아브렐슈드'],
      itemRows: [
        { label: '골드', selltype: '머니' },
        { label: '아이템', selltype: '아이템' },
        { label: '기타', selltype: '기타' },
        { label: '계정', selltype: '계정', isAccount: true }
      ]
    }
  ];

  const params = new URLSearchParams(window.location.search);
  const isBuy = params.get('status') === 'buy';

  /** @typedef {typeof GAMES[0]} GameDef */

  function parseCommaInt(v) {
    const n = String(v || '').replace(/,/g, '').replace(/\s/g, '');
    const num = Number.parseInt(n, 10);
    return Number.isFinite(num) ? num : 0;
  }

  function isMoneySelltype(st) {
    return st === '머니' || st === '게임머니' || st === '바돈';
  }

  function escapeHtml(t) {
    return String(t)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * @param {{ isBuyPage: boolean, previewChip: string, cfg: Record<string, string> }} opts
   */
  function tradeWriteController(opts) {
    const { isBuyPage, previewChip, cfg } = opts;
    /** @type {GameDef | null} */
    let selectedGame = null;
    let selectedServer = '';
    /** @type {GameDef['itemRows'][number] | null} */
    let selectedItem = null;

    const formEl = document.getElementById(cfg.form);
    const catInput = document.getElementById(cfg.catInput);
    const serverListPanel = document.getElementById(cfg.serverPanel);
    const gameUl = document.getElementById(cfg.gameUl);
    const serverUl = document.getElementById(cfg.serverUl);
    const itemUl = document.getElementById(cfg.itemUl);
    const summaryEl = document.getElementById(cfg.summary);
    const hiddenGm = document.getElementById(cfg.gm);
    const hiddenSv = document.getElementById(cfg.sv);
    const hiddenKrGame = document.getElementById(cfg.krgame);
    const hiddenKrServer = document.getElementById(cfg.krserver);
    const hiddenSelltype = document.getElementById(cfg.selltype);

    function setUnitsForSelltype(st) {
      if (!formEl) return;
      const showMoney = isMoneySelltype(st);
      formEl.querySelectorAll('.tw-unit-money').forEach((el) => el.classList.toggle('hidden', !showMoney));
      formEl.querySelectorAll('.tw-unit-item').forEach((el) => el.classList.toggle('hidden', showMoney || !st));
      formEl.querySelectorAll('.tw-unit-money-split').forEach((el) => el.classList.toggle('hidden', !showMoney));
      formEl.querySelectorAll('.tw-unit-item-split').forEach((el) => el.classList.toggle('hidden', showMoney || !st));
    }

    /** @param {GameDef['itemRows'][number] | null} row */
    function applyItemChoice(row) {
      const itemKindBlock = document.getElementById(cfg.itemKindBlock);
      const splitSec = document.getElementById(cfg.splitSec);
      const once = document.getElementById(cfg.once);
      const split = document.getElementById(cfg.split);

      /** @type {HTMLElement[]} */
      const accBlocks =
        cfg.accountBlocks?.split(',').map((id) => document.getElementById(id)).filter(Boolean) || [];

      function hideAccounts() {
        accBlocks.forEach((el) => el.setAttribute('hidden', ''));
      }

      function showAccounts() {
        accBlocks.forEach((el) => el.removeAttribute('hidden'));
      }

      if (!row || !row.selltype) {
        itemKindBlock?.setAttribute('hidden', '');
        splitSec?.setAttribute('hidden', '');
        once?.classList.add('hidden');
        split?.classList.add('hidden');
        hideAccounts();
        setUnitsForSelltype('');
        return;
      }

      itemKindBlock?.setAttribute('hidden', '');
      hideAccounts();

      if (row.isAccount) {
        setUnitsForSelltype('');
        splitSec?.setAttribute('hidden', '');
        if (isBuyPage && accBlocks.length) {
          showAccounts();
          once?.classList.add('hidden');
          split?.classList.add('hidden');
        } else {
          once?.classList.remove('hidden');
          split?.classList.add('hidden');
        }
        return;
      }

      splitSec?.removeAttribute('hidden');
      once?.classList.remove('hidden');
      setUnitsForSelltype(row.selltype);
      togglePanels();

      const kindName = cfg.kindRadioName || 'kind';
      const subKind = row.selltype === '머니' ? 'money' : row.label === '기타' ? 'etc' : 'item';
      formEl.querySelectorAll(`input[name="${kindName}"]`).forEach((radio) => {
        if (radio instanceof HTMLInputElement) radio.checked = radio.value === subKind;
      });
    }

    function togglePanels() {
      if (!formEl) return;
      const splitOn = formEl.querySelector(`input[name="${cfg.buyTypeName}"][value="2"]`)?.checked;
      const hasItem = Boolean(hiddenSelltype?.value) && !selectedItem?.isAccount;
      const onceEl = document.getElementById(cfg.once);
      const splitEl = document.getElementById(cfg.split);
      if (onceEl) onceEl.classList.toggle('hidden', Boolean(splitOn && hasItem));
      if (splitEl) splitEl.classList.toggle('hidden', !splitOn || !hasItem);
    }

    function renderGames(filter) {
      if (!gameUl) return;
      const kw = (filter || '').replace(/\s+/g, '').toLowerCase();
      gameUl.innerHTML = '<li><span class="stitle">게임선택</span></li>';
      GAMES.filter((g) => !kw || g.name.replace(/\s+/g, '').toLowerCase().includes(kw)).forEach((game) => {
        const li = document.createElement('li');
        li.textContent = game.name;
        li.className = 'tw-pick-li';
        li.dataset.game = game.name;
        li.addEventListener('click', () => selectGame(game));
        gameUl.appendChild(li);
      });
    }

    /** @param {GameDef} game */
    function selectGame(game) {
      selectedGame = game;
      selectedServer = '';
      selectedItem = null;
      Array.from(gameUl.querySelectorAll('li.tw-pick-li')).forEach((li) => {
        li.classList.toggle('active', li.dataset.game === game.name);
      });

      if (hiddenGm) hiddenGm.value = game.gm;
      if (hiddenKrGame) hiddenKrGame.value = game.name;
      if (hiddenSv) hiddenSv.value = game.sv !== undefined && game.sv !== '' ? game.sv : '';

      renderServers(game);
      clearItemUl();
      updateCategorySummary();
      serverListPanel?.removeAttribute('hidden');
      applyItemChoice(null);
    }

    /** @param {GameDef} game */
    function renderServers(game) {
      if (!serverUl) return;
      serverUl.innerHTML = '<li><span class="stitle">서버선택</span></li>';
      game.servers.forEach((srv) => {
        const li = document.createElement('li');
        li.textContent = srv;
        li.className = 'tw-pick-li';
        li.addEventListener('click', () => {
          highlightList(serverUl, li);
          selectedServer = srv;
          if (hiddenKrServer) hiddenKrServer.value = srv;
          if (game.name === '던전앤파이터' && game.sv && hiddenSv) hiddenSv.value = game.sv;
          renderItems(game);
          updateCategorySummary();
        });
        serverUl.appendChild(li);
      });
    }

    function clearItemUl() {
      if (!itemUl) return;
      itemUl.innerHTML = '<li><span class="stitle">물품종류</span></li>';
      if (hiddenSelltype) hiddenSelltype.value = '';
    }

    /** @param {GameDef} game */
    function renderItems(game) {
      clearItemUl();
      game.itemRows.forEach((row) => {
        const li = document.createElement('li');
        li.className = 'tw-pick-li';
        if (row.isAccount) {
          const nw = document.createElement('span');
          nw.className = 'tw-new-tag';
          nw.textContent = 'NEW ';
          li.appendChild(nw);
        }
        li.appendChild(document.createTextNode(row.label));
        li.addEventListener('click', () => {
          highlightList(itemUl, li);
          selectedItem = row;
          if (hiddenSelltype) hiddenSelltype.value = row.selltype;
          updateCategorySummary();
          applyItemChoice(row);
          serverListPanel?.setAttribute('hidden', '');
        });
        itemUl.appendChild(li);
      });
    }

    /** @param {HTMLUListElement | null} ul */
    /** @param {HTMLElement} activeLi */
    function highlightList(ul, activeLi) {
      if (!ul) return;
      ul.querySelectorAll('.tw-pick-li').forEach((el) => el.classList.toggle('active', el === activeLi));
    }

    function updateCategorySummary() {
      if (!summaryEl) return;
      if (!selectedGame) {
        summaryEl.textContent = '게임을 검색하거나 선택해 주세요.';
        if (catInput) catInput.value = '';
        return;
      }
      const parts = [selectedGame.name];
      if (selectedServer) parts.push(selectedServer);
      if (selectedItem) parts.push(selectedItem.label);
      if (catInput) catInput.value = parts.join(' > ');
      summaryEl.textContent = parts.join(' › ');
    }

    function splitCountInput() {
      return cfg.splitCountSel ? document.querySelector(cfg.splitCountSel) : null;
    }

    function minQtyEl() {
      return document.getElementById(cfg.minQtyId);
    }

    function maxQtyEl() {
      return document.getElementById(cfg.maxQtyId);
    }

    function stepMin(which, delta) {
      const unitSrc = splitCountInput();
      const unitRaw = parseCommaInt(unitSrc instanceof HTMLInputElement ? unitSrc.value : '1') || 1;
      const minEl = minQtyEl();
      const maxEl = maxQtyEl();
      if (which === 'min' && minEl) {
        const cur = parseCommaInt(minEl.value);
        const base = cur || unitRaw;
        const next = delta > 0 ? base + unitRaw : Math.max(unitRaw, base - unitRaw);
        minEl.value = next ? next.toLocaleString('ko-KR') : '';
      }
      if (which === 'max' && maxEl) {
        const cur = parseCommaInt(maxEl.value);
        const base = cur || unitRaw;
        const next = delta > 0 ? base + unitRaw : Math.max(unitRaw, base - unitRaw);
        maxEl.value = next ? next.toLocaleString('ko-KR') : '';
      }
    }

    function wireHelpTriggers() {
      formEl.querySelectorAll('.tw-help-trigger').forEach((btn) => {
        const tid = btn.getAttribute('aria-controls');
        const panel = tid ? document.getElementById(tid) : null;
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const open = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', String(!open));
          if (panel) panel.hidden = open;
        });
      });

      document.addEventListener('click', (ev) => {
        if (!(ev.target instanceof HTMLElement)) return;
        if (!(formEl.contains(ev.target))) return;
        if (ev.target.closest('.tw-help-trigger') || ev.target.closest('.tw-help-bubble')) return;
        formEl.querySelectorAll('.tw-help-trigger').forEach((btn) => {
          btn.setAttribute('aria-expanded', 'false');
          const tid = btn.getAttribute('aria-controls');
          const p = tid ? document.getElementById(tid) : null;
          if (p) p.hidden = true;
        });
      });
    }

    function wireSellMethodRadios() {
      formEl.querySelectorAll(`input[name="${cfg.buyTypeName}"]`).forEach((r) =>
        r.addEventListener('change', togglePanels)
      );
    }

    function wirePremiumRadios() {
      formEl.querySelectorAll(cfg.premiumRadioClass).forEach((r) =>
        r.addEventListener('change', () => {
          const prem = formEl.querySelector(`input[name="${cfg.premiumRadioName}"]:checked`);
          const box = document.getElementById(cfg.premiumExtraId);
          if (box) box.classList.toggle('hidden', !prem || prem.value !== '2');
        })
      );
    }

    function bindCount(input, counter, max, onInput) {
      if (!(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)) return;
      if (!(counter instanceof HTMLElement)) return;
      const upd = () => {
        counter.textContent = `${input.value.length} / ${max}`;
        input.closest('.trade_write_input')?.classList.toggle('has-value', input.value.trim().length > 0);
        onInput?.();
      };
      input.addEventListener('input', upd);
      upd();
    }

    function updatePreview(txt, previewEl) {
      if (!(previewEl instanceof HTMLElement)) return;
      const trimmed = txt.trim();
      if (!trimmed) {
        previewEl.innerHTML = '<p class="tw-first-preview__empty">메시지를 입력하면 미리보기가 표시됩니다</p>';
        return;
      }
      const chipCls = previewChip === '구' ? 'tw-prev-chip tw-prev-chip--buy' : 'tw-prev-chip';
      previewEl.innerHTML = `
      <div class="tw-prev-chat">
        <div class="${chipCls}">${escapeHtml(previewChip)}</div>
        <div class="tw-prev-bubble">${escapeHtml(trimmed)}</div>
      </div>`;
    }

    function wireCounters() {
      const ch = document.getElementById(cfg.charInputId);
      const chc = document.getElementById(cfg.charCountId);
      bindCount(ch, chc, 12);

      const ttl = document.getElementById(cfg.tradeTitleId);
      bindCount(ttl, document.getElementById(cfg.titleCountId), 30);

      const first = document.getElementById(cfg.firstMsgId);
      const prev = document.getElementById(cfg.previewId);
      const fmc = document.getElementById(cfg.firstMsgCountId);
      if (first instanceof HTMLTextAreaElement) {
        bindCount(first, fmc, 200, () => updatePreview(first.value, prev));
      }
      updatePreview('', prev);
    }

    function hydrateFromURL() {
      const gm = params.get('gm');
      const kg = params.get('krgame');
      const ks = params.get('krserver');
      const sv = params.get('sv');

      let game = GAMES.find((g) => gm && String(g.gm) === gm);
      if (!game && kg) game = GAMES.find((g) => g.name === kg);
      if (!game) return;

      renderGames('');
      selectedGame = game;
      if (hiddenGm) hiddenGm.value = game.gm;
      if (hiddenKrGame) hiddenKrGame.value = game.name;
      if (game.sv && hiddenSv) hiddenSv.value = game.sv;
      if (sv && hiddenSv) hiddenSv.value = sv;

      Array.from(gameUl.querySelectorAll('li.tw-pick-li')).forEach((li) => {
        li.classList.toggle('active', li.dataset.game === game.name);
      });

      renderServers(game);
      if (ks && serverUl) {
        const match = Array.from(serverUl.querySelectorAll('.tw-pick-li')).find(
          (node) => node.textContent?.trim() === ks
        );
        if (match) {
          highlightList(serverUl, match);
          selectedServer = ks;
          if (hiddenKrServer) hiddenKrServer.value = ks;
        }
      }

      renderItems(game);
      updateCategorySummary();
      catInput?.addEventListener('focus', () => {}, { once: true });
    }

    function wireCategoryPanelDismiss() {
      document.addEventListener('click', (ev) => {
        if (!(ev.target instanceof HTMLElement)) return;
        if (ev.target.closest(`#${cfg.serverPanel}`) || ev.target.closest(`#${cfg.catInput}`)) return;
        serverListPanel?.setAttribute('hidden', '');
      });
    }

    function wireQtySteppers() {
      formEl.querySelectorAll(cfg.stepMinSel).forEach((btn) => {
        btn.addEventListener('click', () => {
          stepMin('min', btn.getAttribute('data-tw-buy-min') === 'plus' || btn.getAttribute('data-tw-min') === 'plus' ? 1 : -1);
        });
      });
      formEl.querySelectorAll(cfg.stepMaxSel).forEach((btn) => {
        btn.addEventListener('click', () => {
          stepMin('max', btn.getAttribute('data-tw-buy-max') === 'plus' || btn.getAttribute('data-tw-max') === 'plus' ? 1 : -1);
        });
      });
    }

    function wireSubmitCancel() {
      document.getElementById(cfg.cancelBtnId)?.addEventListener('click', () => {
        if (window.history.length > 1) window.history.back();
        else window.location.href = '../trade/index.html';
      });

      formEl.addEventListener('submit', (ev) => {
        ev.preventDefault();
        if (
          !(hiddenGm && hiddenGm.value) ||
          !(hiddenKrServer && hiddenKrServer.value) ||
          !(hiddenSelltype && hiddenSelltype.value)
        ) {
          window.alert('카테고리에서 게임, 서버, 물품종류까지 모두 선택해 주세요.');
          serverListPanel?.removeAttribute('hidden');
          catInput?.focus();
          return;
        }
        window.alert('정적 데모입니다. 등록은 백엔드 연동 후 가능합니다.');
      });
    }

    function wireInputs() {
      catInput?.addEventListener('focus', () => {
        renderGames(catInput.value);
        serverListPanel?.removeAttribute('hidden');
      });
      catInput?.addEventListener('input', () => {
        renderGames(catInput.value);
        serverListPanel?.removeAttribute('hidden');
      });
      catInput?.addEventListener('click', () => {
        renderGames(catInput.value);
        serverListPanel?.removeAttribute('hidden');
      });
    }

    function init() {
      if (!formEl) return;

      wireHelpTriggers();
      wireSellMethodRadios();
      wirePremiumRadios();
      wireCounters();
      wireQtySteppers();
      wireInputs();
      wireCategoryPanelDismiss();
      wireSubmitCancel();

      renderGames('');
      hydrateFromURL();

      togglePanels();
      const premChecked = formEl.querySelector(`input[name="${cfg.premiumRadioName}"]:checked`);
      const premiumBox = document.getElementById(cfg.premiumExtraId);
      premiumBox?.classList.toggle('hidden', !premChecked || premChecked.value !== '2');
    }

    return { init };
  }

  /** @enum {Record<string,string>} */

  function setBuySellMode() {
    document.body.classList.toggle('trade-write-buy-mode', isBuy);
    document.title = isBuy ? '구매등록 | 게임마켓' : '판매등록 | 게임마켓';

    const sellForm = document.getElementById('trade-write-sell-form');
    const buyForm = document.getElementById('trade-write-buy-form');
    if (sellForm instanceof HTMLElement) sellForm.hidden = Boolean(isBuy);
    if (buyForm instanceof HTMLElement) buyForm.hidden = !isBuy;

    document.querySelector('.trade-write-sell-link')?.toggleAttribute('aria-current', !isBuy);
    document.querySelector('.trade-write-buy-link')?.toggleAttribute('aria-current', isBuy);

    const strip = document.querySelector('.mobile-trade-register-strip');
    if (strip) {
      strip.querySelectorAll('a').forEach((a) => {
        const href = a.getAttribute('href') || '';
        const active = href.includes('status=buy') ? isBuy : !isBuy;
        a.toggleAttribute('aria-current', active);
      });
    }
  }

  const sellCtl = tradeWriteController({
    isBuyPage: false,
    previewChip: '판',
    cfg: {
      form: 'trade-write-sell-form',
      gm: 'tw-gm',
      sv: 'tw-sv',
      krgame: 'tw-krgame',
      krserver: 'tw-krserver',
      selltype: 'tw-selltype',
      catInput: 'tw-select-game-input',
      serverPanel: 'tw-sell-server-list',
      gameUl: 'tw-game-ul',
      serverUl: 'tw-server-ul',
      itemUl: 'tw-item-ul',
      summary: 'tw-category-summary',
      itemKindBlock: 'tw-item-kind-block',
      splitSec: 'tw-sell-method-section',
      once: 'tw-price-once',
      split: 'tw-price-split',
      kindRadioName: 'kind',
      buyTypeName: 'buy_type',
      premiumRadioName: 'premium',
      premiumRadioClass: '.tw-prem-radio',
      premiumExtraId: 'tw-premium-extra',
      minQtyId: 'min_qty',
      maxQtyId: 'max_qty',
      splitCountSel: '#sell_count_split',
      cancelBtnId: 'tw-btn-cancel',
      charInputId: 'charactername',
      charCountId: 'char-count',
      tradeTitleId: 'trade-title',
      titleCountId: 'title-count',
      firstMsgId: 'first_message',
      previewId: 'first_message_preview',
      firstMsgCountId: 'first-msg-count',
      stepMinSel: '[data-tw-min]',
      stepMaxSel: '[data-tw-max]'
    }
  });

  const buyCtl = tradeWriteController({
    isBuyPage: true,
    previewChip: '구',
    cfg: {
      form: 'trade-write-buy-form',
      gm: 'tw-buy-gm',
      sv: 'tw-buy-sv',
      krgame: 'tw-buy-krgame',
      krserver: 'tw-buy-krserver',
      selltype: 'tw-buy-selltype',
      catInput: 'tw-buy-select-game-input',
      serverPanel: 'tw-buy-sell-server-list',
      gameUl: 'tw-buy-game-ul',
      serverUl: 'tw-buy-server-ul',
      itemUl: 'tw-buy-item-ul',
      summary: 'tw-buy-category-summary',
      itemKindBlock: 'tw-buy-item-kind-block',
      splitSec: 'tw-buy-method-section',
      once: 'tw-buy-price-once',
      split: 'tw-buy-price-split',
      kindRadioName: 'buy_kind',
      buyTypeName: 'buy_buy_type',
      premiumRadioName: 'premium_buy',
      premiumRadioClass: '.tw-prem-radio-buy',
      premiumExtraId: 'tw-buy-premium-extra',
      minQtyId: 'tw-buy-min-qty',
      maxQtyId: 'tw-buy-max-qty',
      splitCountSel: '#tw-buy-sell-count-split',
      cancelBtnId: 'tw-buy-btn-cancel',
      charInputId: 'tw-buy-charactername',
      charCountId: 'tw-buy-char-count',
      tradeTitleId: 'tw-buy-trade-title',
      titleCountId: 'tw-buy-title-count',
      firstMsgId: 'tw-buy-first_message',
      previewId: 'tw-buy-first_message_preview',
      firstMsgCountId: 'tw-buy-first-msg-count',
      stepMinSel: '[data-tw-buy-min]',
      stepMaxSel: '[data-tw-buy-max]',
      accountBlocks:
        'tw-buy-acc-link,tw-buy-acc-channel,tw-buy-acc-dual,tw-buy-acc-price'
    }
  });

  setBuySellMode();
  if (isBuy) buyCtl.init();
  else sellCtl.init();
})();
