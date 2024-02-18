import type { Template, PageInfo } from "@/types/definition";

import http from "@/utils/http";

/**
 * 获取主题列表
 *
 * @returns
 */
export const getTemplatesOfPage = (pageNum: number, pageSize: number) => {
  return http.request<PageInfo<Template>>({
    url: `/home/getrusumetheme?pageNum=${pageNum}&pageSize=${pageSize}`,
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
