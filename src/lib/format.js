const numberFormat = new Intl.NumberFormat("ko-KR");

export const won = (value) => `${numberFormat.format(value)}원`;
