import type { User, ConsumptionRecord, PageInfo } from "@/types/definition";
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

export const getConsumptionRecord = (
  username: string,
  pageNum: number,
  pageSize: number
) => {
  return http.request<PageInfo<ConsumptionRecord>>({
    url: `/pay/wxConsumptionRecords?userId=${username}&pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "post",
  });
};
