import type { ResumeResponse } from "@/@type";

import http from "@/utils/http";
import { nanoid } from "@reduxjs/toolkit";

/**
 * 创建简历的接口
 */
export const createResume = (userId: string, value: string, theme: string) => {
  const id = nanoid();
  return http.request<ResumeResponse>({
    url: `/home/addresume?userId=${userId}`,
    method: "post",
    data: {
      userId: userId,
      resumeText: value,
      resumeName: `template-${id}`,
      resumeTheme: theme,
    },
  });
};

/**
 * 获取所有简历的接口
 */
export const getResumeAll = (userId: string) => {
  // TODO
  return http.request<Array<ResumeResponse>>({
    url: `/home/getresume?userId=${userId}`,
    method: "get",
  });
};

/**
 * 获取简历的接口
 */
export const getResume = (userId: string, resumeId: string) => {
  // TODO
  return http.request<ResumeResponse>({
    url: `/home/getresumeone?userId=${userId}&id=${resumeId}`,
    method: "get",
  });
};

/**
 * 保存简历的接口
 */
export const modifyResume = (userId: string, value: string, id: string) => {
  // TODO
  return http.request<ResumeResponse>({
    url: `/home/updateresume?userId=${userId}&id=${id}`,
    method: "put",
    data: {
      id: id,
      userId: userId,
      resumeText: value,
      resumeName: `template-${id}`,
    },
  });
};

export const deleteResume = (userId: string, resumeId: string) => {
  return http.request<null>({
    url: `/home/deleteresume?userId=${userId}&id=${resumeId}`,
    method: "delete",
  });
};
