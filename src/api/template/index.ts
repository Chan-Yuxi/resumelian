import type { Template } from "@/type/definition";

import http from "@/utils/http";
import { getItem } from "@/utils/storage";
import axios from "axios";

/**
 * 获取主题列表
 *
 * @returns
 */
export const getAllTemplate = () => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  }

  return http.request<Template[]>({
    url: `home/getrusumetheme?userId=${username}`,
    method: "get",
  });
};

/**
 * 查询单个模板
 *
 * @param id
 * @returns
 */
export const getTemplate = (id: string) => {
  return http.request<Template>({
    url: `/home/getonerusumetheme?id=${id}`,
    method: "get",
  });
};
