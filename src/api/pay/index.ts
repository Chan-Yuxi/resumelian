import http from "@/utils/http";

export const getPayQRCode = (username: string, money: number) => {
  return http.request<{
    out_trade_no: string;
    code_url: string;
    user_id: string;
  }>({
    url: `/pay/wxPay?userId=${username}&money=${money * 100}`,
    method: "post",
  });
};

export const getAliPayQRCode = (username: string, money: number) => {
  return http.request<{
    orderNo: string;
    code_url: string;
    user_id: string;
  }>({
    url: `/pay/aliPay?userId=${username}&money=${money}`,
    method: "post",
  });
};
