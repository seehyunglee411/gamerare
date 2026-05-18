#!/usr/bin/env python3
"""One-off FAQ body generator — run once then delete if desired."""

from pathlib import Path

ICONS = "../../assets/images"

_common_fee = """<p><strong>상품별 보증수수료 및 보상 기준</strong></p>
<p>&nbsp;</p>
<p><strong>※ 게임머니, 아이템 거래 시</strong></p>
<p>- 보증수수료 1% : 거래금액의 70% 보상 / 보상한도 300만원</p>
<p>- 보증수수료 1.5% : 거래금액의 100% 보상 / 보상한도 300만원</p>
<p>- 보증수수료 2% : 거래금액의 200% 보상 / 보상한도 300만원</p>
<p>&nbsp;</p>
<p><strong>※ 모바일게임 계정 거래 시</strong></p>
<p>- 보증수수료 3% : 3개월 내 사고 발생시 구매금액 전액 보상 / 보상한도 3,000만원</p>
<p>- 보증수수료 5% : 6개월 내 사고 발생시 구매금액 전액 보상 / 보상한도 3,000만원</p>
<p>- 보증수수료 8% : 12개월 내 사고 발생시 구매금액 전액 보상 / 보상한도 3,000만원</p>
<p>- 보증수수료 14% : 12개월 내 사고 발생시 구매금액 200% 보상 / 보상한도 6,000만원</p>
<p>- 보증수수료 28% : 24개월 내 사고 발생시 구매금액 200% 보상 / 보상한도 6,000만원</p>
<p>&nbsp;</p>"""

_crit_item = """<p><strong>※ 보상 기준 안내(게임머니, 아이템)</strong></p>
<p>- 게임머니, 아이템이 해킹물품임을 입증할 게임사의 블럭사유서가 있어야 합니다.</p>
<p>- 정상 물품 구매 완료 건에 한 합니다.(예약거래 및 서비스로 받은 물품은 제외하며, 비 관련 물품 및 비공식 서버 물품도 제외 됩니다.)</p>
<p>- 구매 완료 후 31일 이내에 보상 신청 가능합니다.</p>
<p>- 구매시 사용한 마일리지와 쇼핑포인트를 구분하여 보상 지급되며, 보상한도 초과시 쇼핑포인트를 우선으로 차감하여 보상해 드립니다.</p>
<p>- 보상적용 기간 내에 사고 접수 후 35일 이내 관련 서류 접수가 이루어져야 보상이 진행됩니다.</p>
<p>&nbsp;</p>"""

_crit_acct = """<p><strong>※ 보상 기준 안내(계정)</strong></p>
<p>- 정상 물품 구매 완료 건에 한 합니다.(예약거래 및 서비스로 받은 물품은 제외하며, 비 관련 물품 및 비공식 서버 거래도 제외 됩니다.)</p>
<p>- 보상 적용 기간은 계정양도확인서 동의 완료 시점이 아닌 구매 완료 시점부터 적용됩니다.</p>
<p>- 구매시 사용한 마일리지와 쇼핑포인트를 구분하여 보상 지급되며, 보상한도 초과시 쇼핑포인트를 우선으로 차감하여 보상해 드립니다.</p>
<p>- 보상적용 기간 내에 사고 접수 후 35일 이내 관련 서류 접수가 이루어져야 보상이 진행됩니다.</p>
<p>&nbsp;</p>"""

_exclude = """<p><strong>※ 보상 제외 기준(공통)</strong></p>
<p>- 판매자 환불/보상의사가 명확하여 게임사측 제재 통보일로부터 14일 이내 판매자가 환불 및 보상한 경우는 제외 됩니다.</p>
<p>- 보상액 지급완료 이후 수사대 접수 취하는 불가 합니다.</p>
<p>- 고의적 사고로 인한 보상신청으로 확인되는 경우 관리자 판단으로 보상 취소 가능합니다.</p>
"""

fee_block = _common_fee + _crit_item + _exclude
fee_block_buy = _common_fee + _crit_item + _crit_acct + _exclude


def qa_item(q_text: str, paragraphs: list[str]) -> str:
    paras = "".join(f"<p>{p}</p>" for p in paragraphs)
    return f"""                <li>
                  <details class="faq-acc-item">
                    <summary class="question">
                      <div>
                        <img src="{ICONS}/faq_question_icon.svg" alt="">
                        <span>{q_text}</span>
                      </div>
                      <img class="faq-chevron" src="{ICONS}/faq_down_icon.svg" alt="">
                    </summary>
                    <div class="answer">
                      <div class="answer-inner">{paras}</div>
                    </div>
                  </details>
                </li>"""


def qa_raw(q_text: str, inner_html: str) -> str:
    return f"""                <li>
                  <details class="faq-acc-item">
                    <summary class="question">
                      <div>
                        <img src="{ICONS}/faq_question_icon.svg" alt="">
                        <span>{q_text}</span>
                      </div>
                      <img class="faq-chevron" src="{ICONS}/faq_down_icon.svg" alt="">
                    </summary>
                    <div class="answer">
                      <div class="answer-inner">{inner_html}</div>
                    </div>
                  </details>
                </li>"""


TAB1 = [
    qa_item(
        "사이트 수수료는 얼마인가요?",
        ["구매수수료 0원, 판매수수료 최대 3% (최대 3만원), 출금수수료 1,000원, 입금수수료 1,000원으로 업계 최저 수준입니다."],
    ),
    qa_item("고액 출금처리가 되지 않아요", ["100만원 이상 출금은 관리자가 확인 후 처리해 드리고 있습니다 ! 1~2시간 이내 출금 가능"]),
    qa_item("돈을 두번 나눠서 보냈어요", ["돈을 나눠서 보낸 경우에는 고객센터로 문의 주시면 신속하게 처리해 드리겠습니다"]),
    qa_item(
        "구매를 취소한건 마일리지 환급이 언제쯤 될까요?",
        [
            "구매취소요청을 하시면 5분뒤 취소되고 취소가되면 자동으로 마일리지로 환급처리됩니다.",
            "마일리지는 출금 및 다시 사용 가능합니다",
        ],
    ),
]

TAB2 = [
    qa_item(
        "거래등급에 대해 알려 주세요.",
        [
            "거래등급은 브론즈 등급부터 VIP 등급까지 총 5개 등급으로 구분되어 있으며, 각 등급은 회원님의 판매와 구매 점수를 더한 거래점수를 기준으로 적용하고 있습니다.",
            "안전거래 진행 시 거래 완료 1회당 1점이 부여됩니다.",
            "브론즈 - 거래점수 5점 미만",
            "실버 - 거래점수 5점 이상",
            "골드 - 거래점수 51점 이상",
            "플래티넘 - 거래점수 101점 이상, 최근 3개월 점수 5점 이상",
            "VIP - 거래점수 301점 이상, 최근 3개월 점수 10점 이상",
            "(플래티넘, VIP 등급은 두 조건을 모두 충족해야 합니다.)",
        ],
    ),
    qa_item("회원탈퇴 바로 되나요?", ["회원탈퇴를 진행하시면 자동으로 1주일 뒤 계정은 삭제됩니다. 추후 재가입도 가능합니다."]),
]

TAB3 = [
    qa_item("타인명의로 충전이 가능한가요?", ["본인 이름으로 입금이 온것만 자동으로 충전되며 타인명의로 입금한 경우 고객센터로 문의주시면 즉각 충전처리 하겠습니다"]),
    qa_item(
        "마일리지와 적립금은 무엇인가요?",
        [
            "마일리지는 아이템 안전거래 시 사용 가능한 캐시입니다.",
            "마일리지는 사용하지 않고 마일리지 출금 메뉴를 통해 본인명의 계좌로 출금이 가능하며 출금 시 1회당 1,000원의 수수료가 부과됩니다.",
            "적립금은 마일리지와 동일하게 장터/상품권마켓에서 사용 가능하지만 출금은 불가능합니다.",
            "적립금은 이벤트 또는 사이트 활동을 통해 얻을 수 있습니다.",
        ],
    ),
    qa_item(
        "적립금도 출금 처리가 가능한가요?",
        ["적립금으로 게임재화 및 계정을 구매할 수 있습니다 , 다만 출금처리는 불가능합니다,"],
    ),
]

TAB4 = [
    qa_raw(
        "물품등록 유료 서비스의 이용방법을 알려주세요.",
        """<p>겜마톡 물품등록의 유료 서비스의 종류 및 이용방법 입니다.</p>
<p>&nbsp;</p><p>&nbsp;</p><p><strong>1. 물품 상단 고정 서비스</strong></p>
<p>- 등록하신 물품을 상단 고정 해드리는 서비스 입니다.</p>
<p>- 물품 한개당 상단 고정은 1일(8,000원), 7일(19,000원), 30일(48,000원), 90일(118,000원)입니다.</p>
<p>&nbsp;</p><p><strong>2. 200%보상물품 등록 서비스</strong></p>
<p>- 등록하는 판매 물품에 200%보상 마크와 안내를 달아드립니다.</p>
<p>- 해당 마크가 활성화된 물품은 구매자가 구매안전 서비스 결제를 하지 않아도 자동으로 200% 보상이 적용됩니다.</p>
<p>- 월 이용료는 75,000원이며, 거래점수 10점 이상의 회원만 심사를 통해 이용 가능합니다.</p>
<p>&nbsp;</p><p>유료등록 서비스의 이용은 고객센터로 문의 주시기 바랍니다.</p>""",
    ),
    qa_raw(
        "200%보상 물품은 무엇인가요?",
        f"""<p>겜마톡의 200%보상 물품은 게임머니, 아이템 구매 후 구매한 물품이 해킹물품으로 계정 정지 및 물품을 회수 당한 경우 거래금액의 200%보상서비스에 자동 가입되는 서비스 입니다.</p>
<p>&nbsp;</p>{fee_block}""",
    ),
    qa_raw(
        "구매안전 서비스는 무엇인가요?",
        f"""<p>겜마톡 구매안전 서비스는 게임머니, 아이템, 계정 거래 후 발생하는 해킹사고 및 계정 회수로 인해 손해가 발생한 경우 지불하신 수수료에 따라 거래금액을 보상해 드리는 서비스 입니다.</p>
<p>&nbsp;</p>{fee_block_buy}""",
    ),
    qa_item("이제까지 판매했던 기록은 어디서 보나요?", ["마이룸 > 판매중인거래 > 전체보기를 통해 판매기록 및 구매기록을 확인할 수 있습니다."]),
    qa_item("현금영수증 처리는 가능한가요?", ["현금영수증은 판매에 대해서만 발급 가능하며, 구매에는 적용되지 않습니다."]),
    qa_item("거래는 어떻게 진행해야하는건가요?", ["게임마켓 메인페이지 상단의 이용안내를 통해 구매 및 판매 절차를 한눈에 확인할 수 있습니다."]),
    qa_item("상대방이 인수 인계를 안눌러요", ["상대방이 인수 또는 인계 버튼을 누르지 않을 경우 고객센터로 문의주시면 1분 안에 처리 도와드립니다."]),
    qa_item("100% 환불 시스템은 어떤건가요?", ["게임마켓의 보증 시스템으로, 해킹·사기 재화를 거래한 경우 수사통지서를 제출하시면 100% 보상해드립니다. 계정 회수 시에도 동일하게 적용됩니다."]),
    qa_item("출금 계좌가 없으면 거래 자체가 불가능한가요?", ["출금계좌 없이도 구매·판매 이용이 가능합니다. 다만 출금 처리는 출금계좌가 있어야 가능합니다."]),
    qa_item(
        "거래가능여부가 무엇인가요?",
        [
            "거래 전 거래가능여부 물어보기 기능합니다 , 판매 혹은 구매 게시글에 거래가능하기 여부를 누르면 상대방에게 문자가갑니다 상대방은 거래가능 여부를 클릭하면 거래가능합니다 신청주세요 라는 문자가 옵니다 그때 신청을 하시면 최대한 빠른 거래가 가능합니다",
        ],
    ),
    qa_item("사이트에서 제공하는 안전거래는 무엇인가요?", ["안전거래란 게임마켓 에서 판매자와 구매자의 거래를 안전하게 중개 해드리는 서비스 입니다."]),
]

TAB5 = [
    qa_raw(
        "사기를 당하지 않으려면 어떻게 해야 하나요?",
        """<p>안전거래 중 사기 유도가 되지 않으려면 아래 내용을 꼭 숙지해 주시기 바랍니다.</p>
<p>&nbsp;</p><p>&nbsp;</p>
<p><strong>1.</strong> 게임내에서 먼저 약속을 하고 거래 진행하거나 메신저를 통해 대화를 나눈 뒤 거래 하지 않습니다.</p>
<p>&nbsp;</p><p><strong>2.</strong> 거래가 신청되었다는 문자 메시지가 전송 되었다면 [내정보] &gt; [판매(구매)내역]에서 실제로 거래중인 물품이 있는지 확인해야 합니다.</p>
<p>&nbsp;</p><p><strong>3.</strong> 거래중인 물품에 기재된 판매자/구매자의 연락처로 통화를 하여 서로에 대한 확인을 합니다.</p>
<p>&nbsp;</p><p><strong>4.</strong> 게임상에서 물품을 교환 할 때 판매자/구매자의 캐릭터명을 다시 한번 확인 후 교환신청을 합니다.</p>
<p>&nbsp;</p><p><strong>5.</strong> 교환을 신청 후 상대편에 교환신청이 되었는지, 교환창이 띄워졌는지 거래물품을 올린 후 구매자에게 거래하려는 수량이나 물품이 맞는지 지속적으로 확인을 해야 합니다.</p>
<p>&nbsp;</p><p><strong>6.</strong> 만약을 대비해 교환 당시의 내용을 확인할 수 있는 교환 당시 거래창과 완료창을 스크린샷 촬영해 두시는 게 좋습니다.</p>
<p>&nbsp;</p><p><strong>7.</strong> 물품을 받은 후 되돌려 주지 않도록 주의해 주시기 바랍니다.</p>
<p>&nbsp;</p><p>위 내용을 지키지 못해 문제가 발생했을 경우 불이익을 당할 수 있으니 참고 바랍니다.</p>""",
    ),
    qa_item(
        "경찰서에 신고한 후 가해자를 검거하게 되면 손해배상을 청구할 수 있나요?",
        ["가해자 검거 후 합의를 통해 손해배상을 받을 수 있으며, 합의가 안 될 경우 민사소송으로 청구 가능합니다. 자세한 절차는 대법원 나홀로소송 사이트를 참고하세요."],
    ),
    qa_raw(
        "여러 가지 사기 유형에 대해서 알고 싶어요.",
        """<p>[해킹 게임머니(아이템) 구매]</p>
<p>&nbsp;</p><p>판매자가 해킹/도용 아이템 또는 게임머니를 판매하여 구매자 계정이 정지되는 경우가 발생합니다.</p>
<p>&nbsp;</p><p>&nbsp;</p>
<p>[제 3자가 물품을 가로채는 사기]</p><p>구매자와 판매자 사이에 제 3자가 개입하여 구매자와 판매자를 기망하고 거래물품을 가로채는 사기입니다.</p><p>반드시 당사 홈페이지에서 상대방의 캐릭터명과 연락처를 확인 후 거래하시기 바랍니다.</p>
<p>&nbsp;</p><p>&nbsp;</p>
<p>[입금대기 사기]</p><p>물품 등록 시 연락처를 노출하거나 게임 내 또는 메신저를 통해 미리 약속을 하고 거래를 하는 경우 입금대기/거래대기 상태에서 물품을 인계하여 피해가 발생되는 사기입니다.</p><p>반드시 홈페이지를 통해 거래 진행 상황을 확인 후 거래하시기 바랍니다.</p>
<p>&nbsp;</p><p>&nbsp;</p>
<p>[휴대폰을 이용한 문자사기]</p><p>물품 등록 시 휴대폰 번호를 노출시켜 겜마톡에서 발송되는 문자와 유사 또는 동일하게 거래금액이 결제되었다는 내용의 허위 문자를 발송하여 물품을 받아가는 사기입니다.</p><p>반드시 홈페이지를 통해 거래 진행 상황을 확인 후 거래하시기 바랍니다.</p>
<p>&nbsp;</p><p>&nbsp;</p>
<p>[유사 캐릭터를 이용한 사기]</p><p>구매자 또는 제 3자가 구매자 캐릭터명 또는 전화, 1:1대화함 상으로 확인 된 캐릭터명과 유사한 캐릭터명으로 판매자에게 접근하여 구매자인척 물품을 받아가는 사기입니다.</p><p>반드시 당사 홈페이지에서 구매자의 캐릭터명과 연락처를 확인 후 거래하시기 바랍니다.</p>
<p>&nbsp;</p><p>&nbsp;</p>
<p>[거래 완료 후 물품을 되돌려달라고 하는 사기]</p><p>게임상에서 물품을 인계한 후 판매자 또는 판매자와 유사한 캐릭터명 생성하여 거래물품에 문제가 있다며 게임내 채팅상으로 대화를 한 뒤 거래물품을 다시 받아 가는 사기입니다.</p><p>이미 받은 물품을 돌려달라고하는 경우 돌려주기 전에 고객센터로 먼저 문의해 주시기 바랍니다.</p>""",
    ),
]


def main_inner() -> str:
    specs = [
        ("tab-1", "자주하는 질문", TAB1, True),
        ("tab-2", "회원정보", TAB2, False),
        ("tab-3", "마일리지/적립금", TAB3, False),
        ("tab-4", "거래", TAB4, False),
        ("tab-5", "사기 유형 및 법적문제", TAB5, False),
    ]
    lis = ""
    panels = ""
    for n, (tid, label, rows, cur) in enumerate(specs, start=1):
        trig = f"faq-tab-{n}"
        attrs = (
            f' role="tab" id="{trig}" aria-controls="{tid}"'
            + (' aria-selected="true" tabindex="0"' if cur else ' aria-selected="false" tabindex="-1"')
            + (' class="tab-link current"' if cur else ' class="tab-link"')
        )
        lis += f"\n              <li{attrs} data-tab=\"{tid}\" data-faq-trigger=\"{trig}\">{label}</li>"

        pcls = "tab-content current" if cur else "tab-content"
        h = "" if cur else " hidden"
        panels += (
            f'          <div id="{tid}" data-label="{label}" class="{pcls}" role="tabpanel" aria-labelledby="{trig}"{h}>'
            "\n"
            f'            <ul class=\"faq_list\">\n{chr(10).join(rows)}\n'
            "            </ul>\n"
            "          </div>\n"
        )

    tabs_header = f"""        <div class="faq_tabs_row">
          <ul class="tabs" role="tablist">
{lis}
          </ul>
          <span class="tab-link-bottom" aria-hidden="true"></span>
        </div>"""

    return f"""    <div class="notice_page_wrap">
      <div class="notice_title_wrap">
        <div class="notice_title">FAQ</div>
        <div class="notice_title_info">
          <div class="notice_title_info_row">
            <span>- 1:1상담은 카카오채널 채팅으로 아침 9시부터 새벽 1시까지 가능합니다.</span>
            <a href="../chat_iframe/chat_group_list/index.html">1:1채널톡 문의</a>
          </div>
        </div>
      </div>

      <div class="faq_list_wrap">
{tabs_header}

{panels}      </div>

      <div class="faq_none_space none_space"></div>
    </div>

"""


def splice_index():
    fp = Path(__file__).resolve().parent / "index.html"
    text = fp.read_text(encoding="utf-8")
    needle = '<main class="page-main">'
    if needle not in text:
        raise SystemExit('Could not find <main class="page-main">')
    head, _, rest = text.partition(needle)
    _, _, tail = rest.partition("</main>")
    footer_part = tail

    if "faq-page.js" not in footer_part:
        footer_part = footer_part.replace(
            '<script src="../../assets/js/search.js"></script>',
            '<script src="../../assets/js/faq-page.js"></script>\n  <script src="../../assets/js/search.js"></script>',
            1,
        )

    anchors = """    <section class="section content-section faq-page-anchors">
      <section class=\"data-card faq-anchor-card\" id=\"account-guide\" style=\"padding:22px\">
        <h2>계정거래가이드</h2>
        <p style=\"color:var(--muted);line-height:1.7\">계정거래는 판매자 인증, 거래 신청, 안전결제, 인수확인 순서로 진행됩니다. 거래 전 상대방 정보와 거래 상태를 반드시 홈페이지에서 확인하세요.</p>
      </section>
      <section class=\"data-card faq-anchor-card\" id=\"terms-service\" style=\"padding:22px\">
        <h2>이용약관</h2>
        <p style=\"color:var(--muted);line-height:1.7\">게임마켓 서비스 이용에 필요한 기본 약관 영역입니다.</p>
      </section>
      <section class=\"data-card faq-anchor-card\" id=\"terms-trade\" style=\"padding:22px\">
        <h2>아이템거래약관</h2>
        <p style=\"color:var(--muted);line-height:1.7\">아이템, 게임머니, 계정 거래 절차와 안전거래 기준을 안내합니다.</p>
      </section>
      <section class=\"data-card faq-anchor-card\" id=\"privacy\" style=\"padding:22px\">
        <h2>개인정보취급방침</h2>
        <p style=\"color:var(--muted);line-height:1.7\">회원가입, 본인인증, 거래 진행에 필요한 개인정보 처리 기준을 안내합니다.</p>
      </section>
    </section>

"""

    fp.write_text(
        head
        + '  <main id="wrap" class="page-main faq-board-page" style="background-color:#fff;">\n'
        + main_inner()
        + "\n"
        + anchors
        + "  </main>"
        + footer_part,
        encoding="utf-8",
    )


if __name__ == "__main__":
    splice_index()
