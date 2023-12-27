import http from "@/utils/http";

export interface UserInfo {
  userId: string;
  resumeNumber: number;
  member: boolean;
  openId: string;
  remainDays: number;
  expireTime: string;
}

export const retrieveUserInfo = (username: string) => {
  return http.request<UserInfo>({
    url: `/WeChat/selectuser?userId=${username}`,
    method: "post",
  });
};
