import type { ResumeResponse } from "@/@type";

import http from "@/utils/http";
import { getItem } from "@/utils/storage";
import { nanoid } from "@reduxjs/toolkit";

/**
 * 创建简历的接口
 */
export const createResume = (value: string, theme: string) => {
  const id = nanoid();
  const username = getItem("username");

  if (!username) {
    return Promise.resolve(null);
  }

  return http.request<ResumeResponse>({
    url: `/home/addresume?userId=${username}`,
    method: "post",
    data: {
      userId: username,
      resumeText: value,
      resumeName: `template-${id}`,
      resumeTheme: theme,
    },
  });
};

/**
 * 获取所有简历的接口
 */
export const getResumeAll = () => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  }
  return http.request<Array<ResumeResponse>>({
    url: `/home/getresume?userId=${username}`,
    method: "get",
  });
};

/**
 * 获取简历的接口
 */
export const getResume = (resumeId: string) => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  }
  return http.request<ResumeResponse>({
    url: `/home/getresumeone?userId=${username}&id=${resumeId}`,
    method: "get",
  });
};

/**
 * 保存简历的接口
 */
export const modifyResume = (value: string, id: string) => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  }
  return http.request<ResumeResponse>({
    url: `/home/updateresume?userId=${username}&id=${id}`,
    method: "put",
    data: {
      id: id,
      userId: username,
      resumeText: value,
      resumeName: `template-${id}`,
    },
  });
};

export const deleteResume = (resumeId: string) => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  }
  return http.request<null>({
    url: `/home/deleteresume?userId=${username}&id=${resumeId}`,
    method: "delete",
  });
};
