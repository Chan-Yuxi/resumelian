import http from "@/utils/http";
import { PageInfo, Trade } from "@/types/definition";

export const getInformationList = (pageNum: number, pageSize: number) => {
  return http.request<PageInfo<Trade>>({
    url: `/information/getInformationList?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "post",
  });
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

export const getHotInformation = () => {
  return http.request<Trade[]>({
    url: `/information/getHotInformationList`,
    method: "post",
  });
};
