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
    timeout: 60 * 1000,
    method: "post",
  });
};

export const translate = (content: string, lng: string) => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  }

  return http.request<string>({
    url: `/openai/${
      lng === "en" ? "ENtranslate" : "CNtranslate"
    }?userId=${username}`,
    method: "post",
    timeout: 60 * 1000,
    data: {
      text: content,
    },
  });
};
