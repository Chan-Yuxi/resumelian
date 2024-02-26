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

export const isQuestionCollected = (
  userId: string,
  setId: number,
  type: string,
  id: number
) => {
  // TODO
  return http.request<boolean>({
    url: `/question/getiscollect?userId=${userId}`,
    method: "post",
    data: {
      userId: userId,
      questionId: setId,
      topicType: type,
      topicId: id,
    },
  });
};

export const collectQuestion = (
  userId: string,
  setId: number,
  type: string,
  id: number
) => {
  return http.request({
    url: `/question/updateiscollect?userId=${userId}`,
    method: "post",
    data: {
      userId: userId,
      questionId: setId,
      topicType: type,
      topicId: id,
    },
  });
};
