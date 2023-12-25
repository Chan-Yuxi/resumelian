import type { Resume } from "@/type/definition";

import http from "@/utils/http";
import { getItem } from "@/utils/storage";

/**
 * 创建简历
 *
 * @param resume
 * @returns
 */
export const createResume = (resume: Resume) => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  }
  return http.request<Resume>({
    url: `/home/addresume?userId=${username}`,
    method: "post",
    data: {
      ...resume,
      userId: username,
    },
  });
};

/**
 * 获取所有简历的接口
 *
 * @returns
 */
export const getResumeAll = () => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  }
  return http.request<Array<Resume>>({
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
  return http.request<Resume>({
    url: `/home/getresumeone?userId=${username}&id=${resumeId}`,
    method: "get",
  });
};

/**
 * 保存简历的接口
 *
 * @param resume
 * @returns
 */
export const modifyResume = (resume: Resume) => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  }
  return http.request<Resume>({
    url: `/home/updateresume?userId=${username}&id=${resume.id}`,
    method: "put",
    data: {
      ...resume,
      userId: username,
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
