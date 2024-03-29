import type {
  CreateAxiosDefaults,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import type { Result } from "@/types/definition";
import type { Nullable } from "@/types/toolkit";

import axios from "axios";
import nprogress from "nprogress";

import {
  Code,
  requestBefore,
  responseSuccess,
  responseFailure,
} from "./optimized";

export default class Request {
  private instance: AxiosInstance;

  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(requestBefore);
  }

  request<T>(config: AxiosRequestConfig): Promise<Nullable<T>> {
    nprogress.start();

    return new Promise((resolve, reject) => {
      this.instance
        .request<Result<T>>(config)
        .then((response) => {
          if (responseSuccess) {
            const result = responseSuccess<T>(response);
            result === Code.OtherInvalid ? resolve(null) : resolve(result);
            return;
          }

          reject("missing response processor");
        })
        .catch((e: string) => {
          if (responseFailure) {
            responseFailure(e);
            resolve(null);
            return;
          }
          reject("missing error response processor");
        })
        .finally(() => {
          nprogress.done();
        });
    });
  }
}
