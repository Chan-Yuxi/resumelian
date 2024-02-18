import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import type { Result } from "@/types/definition";

import { message as messageApi } from "antd";
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

/**
 * intransitive verb 后面不能接名词，因为它是不及物的，go => vi. I go school (×), I go (to school 动词不定式，作副词用，修饰 go)
 * transitive verb 及物动词后面必须接名词
 *
 * this is the reason which he was late for
 *
 *
 */

export function responseSuccess<T>(
  response: AxiosResponse<Result<T>>
): T | Code.OtherInvalid {
  const { code, data, message } = response.data;

  if (code !== 200) {
    messageApi.warning(message);
    return Code.OtherInvalid;
  } else {
    return data;
  }
}

export function responseFailure(e: string) {
  messageApi.warning(e);
  return e;
}
