(() => {
  const blackBg = document.querySelector(".modify-black-bg");
  const pops = () => document.querySelectorAll(".modify_pop_wrap");

  function popClose() {
    blackBg?.classList.remove("is-open");
    pops().forEach((el) => el.classList.remove("is-open"));
    document.body.classList.remove("modify-pop-lock");
  }

  function popOpen(cls) {
    popClose();
    const pop = document.querySelector(`.modify_pop_wrap.${cls}`);
    if (!pop) return;
    blackBg?.classList.add("is-open");
    pop.classList.add("is-open");
    document.body.classList.add("modify-pop-lock");
    const focus = pop.querySelector("input, textarea, button");
    focus?.focus();
  }

  document.querySelectorAll("[data-modify-pop]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const cls = el.getAttribute("data-modify-pop");
      if (cls) popOpen(cls);
    });
  });

  document.querySelectorAll("[data-modify-pop-close]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      popClose();
    });
  });

  blackBg?.addEventListener("click", popClose);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") popClose();
  });

  window.modifyPopOpen = popOpen;
  window.modifyPopClose = popClose;

  function updateCharCounter(input) {
    const max = parseInt(input.getAttribute("maxlength"), 10) || 0;
    const row = input.closest(".modify_pop_input, .phone_pop_input");
    const label = row?.querySelector(".chk_txt");
    if (!label || !max) return;
    const n = input.value.length;
    label.textContent = `${n} / ${max}`;
  }

  document.querySelectorAll(".word_chk").forEach((input) => {
    if (input.classList.contains("no-counter")) return;
    input.addEventListener("input", () => updateCharCounter(input));
    updateCharCounter(input);
  });

  const phoneEl = document.getElementById("phone");
  if (phoneEl) {
    window.cvtPhoneNumber(phoneEl);
  }

  window.preview_profile_image = function preview_profile_image(ev) {
    const file = ev.target?.files?.[0];
    const wrap = document.getElementById("profile-preview-wrap");
    const img = document.getElementById("profile-preview-image");
    if (!file || !img || !wrap) return;
    const url = URL.createObjectURL(file);
    img.onload = () => URL.revokeObjectURL(url);
    img.src = url;
    wrap.hidden = false;
  };

  const idCardState = { file: null };

  const idInput = document.getElementById("id-card-file-input");
  const idPreviewShell = document.getElementById("id-card-preview-container");

  idInput?.addEventListener("change", () => {
    const f = idInput.files?.[0];
    idPreviewShell.innerHTML = "";
    idCardState.file = f || null;
    if (!f) return;
    const box = document.createElement("div");
    box.className = "modify-id-preview-box";
    const img = document.createElement("img");
    img.alt = "";
    const url = URL.createObjectURL(f);
    img.onload = () => URL.revokeObjectURL(url);
    img.src = url;
    const rm = document.createElement("button");
    rm.type = "button";
    rm.className = "modify-id-preview-remove";
    rm.setAttribute("aria-label", "첨부 삭제");
    rm.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    rm.addEventListener("click", () => {
      idCardState.file = null;
      idInput.value = "";
      idPreviewShell.innerHTML = "";
    });
    box.appendChild(img);
    box.appendChild(rm);
    idPreviewShell.appendChild(box);
  });

  document.querySelector('[data-id-card-trigger="1"]')?.addEventListener("click", () => {
    idInput?.click();
  });

  window.handle_update_id_card = function handle_update_id_card(e) {
    e.preventDefault();
    if (!idCardState.file) {
      window.alert("신분증 이미지를 업로드해 주세요.");
      return;
    }
    window.alert("신분증 등록은 서버 연동 후 가능합니다.");
    popClose();
  };

  window.go_update = function go_update(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    const status = form.querySelector('input[name="status"]');
    if (status) status.value = formId;

    if (formId === "update_new_pw") {
      const cur = form.querySelector('[name="current_password"]')?.value?.trim();
      const nw = form.querySelector('[name="new_password"]')?.value?.trim();
      const re = form.querySelector('[name="re_password"]')?.value?.trim();
      if (!cur || !nw || !re) {
        window.alert("비밀번호를 모두 입력해 주세요.");
        return;
      }
      if (nw !== re) {
        window.alert("새 비밀번호가 일치하지 않습니다.");
        return;
      }
    }

    window.alert("회원 정보 수정은 서버 연동 후 저장됩니다.");
    popClose();
  };

  window.go_update_img = function go_update_img() {
    const input = document.getElementById("fileInput");
    if (!input?.files?.length) {
      window.alert("이미지를 선택해 주세요.");
      return;
    }
    window.alert("프로필 이미지 변경은 서버 연동 후 저장됩니다.");
    popClose();
  };

  window.go_sms_auth = function go_sms_auth() {
    window.alert("번호 인증은 서버 연동 후 이용할 수 있습니다.");
  };

  window.go_sms_chk = function go_sms_chk() {
    const ok = window.confirm("데모: 인증에 성공한 것으로 처리할까요?");
    const hidden = document.getElementById("sms_chk");
    if (hidden) hidden.value = ok ? "1" : "0";
    if (ok) window.alert("인증번호가 확인되었습니다. (데모)");
  };

  /** 휴대폰번호: 숫자·하이픈 외 문자 제거 후 자동 포맷 */
  window.isNumberOrHyphen = function isNumberOrHyphen(inp) {
    inp.value = inp.value.replace(/[^0-9-]/g, "");
  };

  window.cvtPhoneNumber = function cvtPhoneNumber(inp) {
    const d = inp.value.replace(/\D/g, "").slice(0, 11);
    let out = d;
    if (d.length > 7) out = `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
    else if (d.length > 3) out = `${d.slice(0, 3)}-${d.slice(3)}`;
    inp.value = out;
    const counter = inp.closest(".phone_pop_input")?.querySelector(".chk_txt");
    if (counter) counter.textContent = `${d.length} / 11`;
  };
})();
