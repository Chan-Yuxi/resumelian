import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";

import { getItem } from "@/utils/storage";

export function requestBefore(request: InternalAxiosRequestConfig) {
  const token = getItem("token");
  request.headers["Authorization"] = token;
  return request;
}

export function responseSuccess<T>(response: AxiosResponse<T>): T | "error" {
  return response.data;
}

export function responseFailure(e: unknown) {
  return e;
}
