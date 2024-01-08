import http from "@/utils/http";
import { getItem } from "@/utils/storage";

export const chatGPT = (content: string, industry: string, module: string) => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  }
  return http.request<string>({
    url: `/openai/chat?content=${content}&industry=${industry}&module=${module}&userId=${username}`,
    method: "post",
  });
};
