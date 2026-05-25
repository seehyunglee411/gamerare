import { member } from "../data/mockData.js";
import { won } from "../lib/format.js";
import { AppLink } from "./AppLink.jsx";
import { routeHref } from "../lib/router.js";

export function MemberCard() {
  return (
    <section className="trade-member-card">
      <div className="trade-member-id">
        <span className="grade-dot">{member.grade}</span>
        <strong>{member.id}</strong>
      </div>
      <div className="trade-id-row"><span>마일리지</span><AppLink className="blue" route="mileage">{won(member.mileage)}</AppLink></div>
      <div className="trade-id-row"><span>적립금</span><AppLink className="red" route="point">{won(member.point)}</AppLink></div>
      <div className="trade-id-links">
        <AppLink className="blue" route="mile-in">마일리지충전</AppLink>
        <AppLink className="red" route="mile-out">마일리지출금</AppLink>
        <AppLink route="mypage">내정보</AppLink>
        <AppLink route="mywrite">내게시글</AppLink>
      </div>
      <div className="trade-counts">
        <AppLink route="mywrite" href={`${routeHref("mywrite")}#sell`}><span>판매중인 거래</span><b>0</b>건</AppLink>
        <AppLink route="mywrite" href={`${routeHref("mywrite")}#buy`}><span>구매중인 거래</span><b>0</b>건</AppLink>
      </div>
    </section>
  );
}
