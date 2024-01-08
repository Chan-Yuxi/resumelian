import http from "@/utils/http";
import { getItem } from "@/utils/storage";

export const chatGPT = (
  content: string,
  industry: string,
  module: string,
  language: string
) => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  }
  return http.request<string>({
    url: `/openai/chat?content=${content}&industry=${industry}&module=${module}&language=${language}&userId=${username}`,
    method: "post",
  });
};
