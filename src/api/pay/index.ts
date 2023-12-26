import http from "@/utils/http";

export const getPayQRCode = (username: string, money = 1) => {
  return http.request<{
    out_trade_no: string;
    code_url: string;
    user_id: string;
  }>({
    url: `/pay/wxPay?userId=${username}&money=${money}`,
    method: "post",
  });
};
