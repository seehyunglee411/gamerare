(() => {
  document.querySelectorAll("[data-find-row]").forEach((row) => {
    const head = row.querySelector(".find_row_head");
    const chev = row.querySelector(".find_chevron");
    if (!head) return;
    head.addEventListener("click", () => {
      const open = row.classList.toggle("is-open");
      head.setAttribute("aria-expanded", open ? "true" : "false");
      chev?.classList.toggle("is-active", open);
    });
  });

  /** NICE 체크플러스 — 실제 배포 시 서버에서 내려준 EncodeData 필요 */
  window.fnPopup = function fnPopup() {
    const form = document.getElementById("form_chk");
    const enc = form?.querySelector('input[name="EncodeData"]')?.value?.trim();

    const spec = "width=500,height=550,scrollbars=yes,resizable=yes";
    if (!form || !enc) {
      window.alert(
        "본인인증(체크플러스) 연동 후 이용할 수 있습니다.\n운영 서버에서는 EncodeData를 발급받아 전송합니다.",
      );
      return;
    }

    window.name = "Parent_window";
    window.open("", "popupChk", spec);
    form.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
    form.target = "popupChk";
    form.submit();
  };

  document.getElementById("find_phone_btn")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.fnPopup();
  });
})();
