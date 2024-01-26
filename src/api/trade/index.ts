import http from "@/utils/http";
import { getItem } from "@/utils/storage";
import { Trade } from "@/type/definition";

export const getInformationList = () => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  } else {
    return http.request<Trade[]>({
      url: `/information/getInformationList?userId=${username}`,
      method: "post",
    });
  }
};

export const getAlreadyBuyList = (username: string) => {
  return http.request<
    {
      userId: string;
      Information: string[];
    }[]
  >({
    url: `/information/getUserInformationList?userId=${username}`,
    method: "post",
  });
};

export const getTradeWxPay = (username: string, id: string, price: number) => {
  return http.request<{
    out_trade_no: string;
    code_url: string;
    user_id: string;
  }>({
    url: `/pay/tradewxPay?userId=${username}&money=${
      price * 100
    }&subject=${id}`,
    method: "post",
  });
};

export const getTradeAliPay = (username: string, id: string, price: number) => {
  return http.request<{
    out_trade_no: string;
    code_url: string;
    user_id: string;
  }>({
    url: `/pay/tradealiPay?userId=${username}&money=${
      price * 100
    }&subject=${id}`,
    method: "post",
  });
};

export const getWanPanByTrade = (username: string, id: string) => {
  return http
    .request<Trade>({
      url: `/information/getInformationOne2?userId=${username}&id=${id}`,
      method: "post",
    })
    .then((data) => {
      return data ? data.netdisk : "";
    });
};
