import type { Method, AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

import { requestBefore, responseSuccess, responseFailure } from "./optimized";

export interface RequestConfig {
  // 请求方法
  method: Method;
  // 请求网址
  url: string;
  // 请求数据
  data?: unknown;
  // 请求参数
  params?: unknown;
  // 基本地址
  baseURL?: string;
}

export default class Request {
  private instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(requestBefore);
  }

  request<T>(config: RequestConfig): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<T>(config)
        .then((response) => {
          if (responseSuccess) {
            const result = responseSuccess(response);
            result === "error" ? resolve(undefined) : resolve(result);
            return;
          }
          reject("missing response processor");
        })
        .catch((e) => {
          if (responseFailure) {
            reject(responseFailure(e));
            return;
          }
          reject(e);
        });
    });
  }
}
