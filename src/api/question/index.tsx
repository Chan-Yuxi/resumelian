import http from "@/utils/http";
import { PageInfo, Question, QuestionSet } from "@/types/definition";

export const getQuestionSetOfPage = (pageNum: number, pageSize: number) => {
  return http.request<PageInfo<QuestionSet>>({
    url: `/question/question?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: "post",
  });
};

export const getAllQuestionsBySetId = (id: number) => {
  return http.request<Question[]>({
    url: `/question/alltypequestion?id=${id}`,
    method: "post",
  });
};
