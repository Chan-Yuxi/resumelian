import type { LoginResponse } from "@/@type";

import http from "@/utils/http";

export const getAccess = () => {
  return http.request<string>({
    method: "get",
    url: "/WeChat/access",
  });
};

export const login = (ticket: string, code: string) => {
  return http.request<LoginResponse>({
    url: `/WeChat/login?code=${code}&Ticket=${ticket}`,
    method: "get",
  });
};
