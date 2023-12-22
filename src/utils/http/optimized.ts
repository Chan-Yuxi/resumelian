import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import type { Result } from "@/@type/definition";

import { getItem } from "@/utils/storage";

export enum Code {
  Success = 200,
  OtherInvalid = "code-is-not-200",
}

export function requestBefore(request: InternalAxiosRequestConfig) {
  const token = getItem("token");
  request.headers["Authorization"] = token;
  return request;
}

export function responseSuccess<T>(
  response: AxiosResponse<Result<T>>
): T | Code.OtherInvalid {
  const { code, message, data } = response.data;

  if (code !== 200) {
    return Code.OtherInvalid;
  } else {
    return data;
  }
}

export function responseFailure(e: unknown) {
  return e;
}
