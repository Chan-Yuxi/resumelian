import http from "@/utils/http";

export const saveResume = (value: string, userId: string) => {
  return http.request({
    url: `/home/addresume?userId=${userId}`,
    method: "post",
    data: {
      user_id: userId,
      resume_text: value,
    },
  });
};
