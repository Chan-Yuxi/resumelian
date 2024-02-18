import type { User, ConsumptionRecord } from "@/types/definition";
import http from "@/utils/http";

export const retrieveUserInfo = (username: string) => {
  return http.request<User>({
    url: `/WeChat/selectuser?userId=${username}`,
    method: "post",
  });
};

export const updateUserInfo = (user: User, username: string) => {
  return http.request<User>({
    url: `/WeChat/updateuser?userId=${username}`,
    method: "post",
    data: user,
  });
};

export const getConsumptionRecord = (username: string) => {
  return http.request<ConsumptionRecord[]>({
    url: `/pay/wxConsumptionRecords?userId=${username}`,
    method: "post",
  });
};
