import http from "@/utils/http";

export const getAccess = () => {
  return http.request<string>({
    method: "get",
    url: "/WeChat/access",
  });
};
