import type { Template } from "@/type/definition";

import http from "@/utils/http";

/**
 * 获取主题列表
 *
 * @returns
 */
export const getAllTemplate = () => {
  return http.request<Template[]>({
    url: `home/getrusumetheme`,
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
