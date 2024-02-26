import http from "@/utils/http";
import { PageInfo, Question, QuestionSet } from "@/types/definition";
import { getItem } from "@/utils/storage";

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

export const getErrorQuestions = (setId: number) => {
  return http.request<Question[]>({
    url: `/question/getmistakescollection?userId=123&questionId=${setId}`,
    method: "post",
  });
};

export const getCollectionQuestions = () => {
  //
};

export const isQuestionCollected = (
  userId: string,
  setId: number,
  type: string,
  id: number
) => {
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

export const updateQuestionInfo = (
  question: Question,
  userOption: string,
  studyDuration: string,
  questionId: number
) => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  }
  return http.request({
    url: `/question/updateuserquestionmessage?userId=${username}`,
    method: "post",
    data: Object.assign(question, {
      userOption,
      studyDuration,
      userId: username,
      topicId: question.id,
      topicName: question.question,
      questionType: question.type,
      questionId,
    }),
  });
};

export const getUserStatic = (setId: number) => {
  const username = getItem("username");
  if (!username) {
    return Promise.resolve(null);
  }
  return http.request<{
    userId: string;
    question_id: number;
    studyDuration: number;
    doQuestions: number;
    accuracy: number;
  }>({
    url: `/question/learningsituation?userId=${username}&id=${setId}`,
    method: "post",
  });
};
