import http from "@/utils/http";

export const upload = (userId: string, formData: FormData) => {
  return http.request({
    url: `/home/upload?userId=${userId}`,
    method: "post",
    headers: {
      "Content-Type": "application/multipart-formdata",
    },
    data: formData,
  });
};
