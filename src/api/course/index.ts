import { Course, CourseChapter } from "@/type/definition";
import http from "@/utils/http";

export const getCourseList = () => {
  return http.request<Course[]>({
    url: `/video/getCourseList`,
    method: "post",
  });
};

export const getCourseChapters = (id: number) => {
  return http.request<CourseChapter[]>({
    url: `/video/getChapter?id=${id}`,
    method: "post",
  });
};
