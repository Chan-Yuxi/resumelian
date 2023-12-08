import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";

export function requestBefore(request: InternalAxiosRequestConfig) {
  return request;
}

export function responseSuccess<T>(response: AxiosResponse<T>): T | "error" {
  return response.data;
}

export function responseFailure(e: unknown) {
  return e;
}
