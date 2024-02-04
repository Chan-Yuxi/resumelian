import { Course, CourseChapter } from "@/type/definition";
import http from "@/utils/http";

export const getCourseList = () => {
  return http.request<Course[]>({
    url: `/video/getCourseList`,
    method: "post",
  });
};

export const getCourseTopThreeList = () => {
  return http.request<Course[]>({
    url: `/video/getHotCourseList`,
    method: "post",
  });
};

export const getCourseLatestThreeList = () => {
  return http.request<Course[]>({
    url: `/video/getNewCourseList`,
    method: "post",
  });
};

export const getCourseChapters = (id: number) => {
  return http.request<CourseChapter[]>({
    url: `/video/getChapter?id=${id}`,
    method: "post",
  });
};

export const getWxQRCodeUrl = (
  username: string,
  money: number,
  subject: number
) => {
  return http.request<{ code_url: string }>({
    url: `/pay/coursewxPay?userId=${username}&money=${1}&subject=${subject}`,
    method: "post",
  });
};

export const getAliQRCodeUrl = (
  username: string,
  money: number,
  subject: number
) => {
  return http.request<{ code_url: string }>({
    url: `/pay/coursealiPay?userId=${username}&money=${
      money * 100
    }&subject=${subject}`,
    method: "post",
  });
};

export const alreadyBuy = (username: string) => {
  return http.request<{ userId: string; Course: string[] }[]>({
    url: `/video/getUserCourseList?userId=${username}`,
    method: `post`,
  });
};
