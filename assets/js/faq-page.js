(() => {
  const wrap = document.querySelector('.faq_list_wrap');
  if (!wrap) return;

  const tabShell = wrap.querySelector('.faq_tabs_row');
  const indicator = tabShell?.querySelector('.tab-link-bottom') ?? wrap.querySelector('.tab-link-bottom');
  const tabs = wrap.querySelectorAll('ul.tabs li.tab-link');
  const panels = wrap.querySelectorAll('.tab-content');

  function positionIndicator(li) {
    if (!indicator || !tabShell || !(li instanceof HTMLElement)) return;
    tabShell.offsetHeight;
    const shellRect = tabShell.getBoundingClientRect();
    const liRect = li.getBoundingClientRect();
    indicator.style.width = `${liRect.width}px`;
    indicator.style.left = `${liRect.left - shellRect.left}px`;
  }

  function activate(li) {
    if (!(li instanceof HTMLElement)) return;
    const tid = li.dataset.tab;
    tabs.forEach((el) => {
      const on = el === li;
      el.classList.toggle('current', on);
      el.setAttribute('aria-selected', on ? 'true' : 'false');
      el.setAttribute('tabindex', on ? '0' : '-1');
    });
    panels.forEach((p) => {
      const on = p.id === tid;
      p.classList.toggle('current', on);
      if (tid) p.hidden = !on;
    });
    positionIndicator(li);
  }

  const initial = wrap.querySelector('ul.tabs li.tab-link.current') || tabs[0];
  requestAnimationFrame(() => activate(initial));

  tabs.forEach((li) => {
    li.addEventListener('click', () => activate(li));
  });

  window.addEventListener('resize', () => {
    const cur = wrap.querySelector('ul.tabs li.tab-link.current');
    if (cur) positionIndicator(cur);
  });

  wrap.querySelectorAll('.faq_list').forEach((list) => {
    list.querySelectorAll('details.faq-acc-item').forEach((det) => {
      det.addEventListener('toggle', () => {
        if (!det.open) return;
        list.querySelectorAll('details.faq-acc-item').forEach((o) => {
          if (o !== det && o.open) o.removeAttribute('open');
        });
      });
    });
  });
})();
