import http from "@/utils/http";

type LoginResponse = {
  success: boolean;
  userName: string;
  token: string;
  data: number;
  msg: string;
};

/**
 * 获取公众号二维码
 * @returns 公众号二维码图片链接
 */
export const getAccess = () => {
  return http.request<string>({
    method: "get",
    url: "/WeChat/access",
  });
};

/**
 * 登录接口
 *
 * @param ticket 在链接中的票据
 * @param code 验证码
 * @returns 用户信息
 */
export const login = (ticket: string, code: string) => {
  return http.request<LoginResponse>({
    method: "get",
    url: `/WeChat/login?code=${code}&Ticket=${ticket}`,
  });
};
