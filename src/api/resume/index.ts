import http from "@/utils/http";

export const saveResume = (value: string, userId: string) => {
  return http.request({
    url: `/home/addresume?userId=${userId}`,
    method: "post",
    data: {
      userId: userId,
      resumeText: value,
      resumeName: "template",
      resumeTheme: "xx",
    },
  });
};
