import { Button, Divider } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import {
  BookmarkX,
  Star,
  LibraryBig,
  NotebookPen,
  ScrollText,
  Rocket,
} from "lucide-react";
import { useRequest } from "@/hooks";
import {
  collectQuestion,
  getAllQuestionsBySetId,
  isQuestionCollected,
} from "@/api/question";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Question, QuestionSet } from "@/types/definition";

import Choice from "../components/questionTypes/choice";
import AnswerSheet from "../components/AnswerSheet";
import { getItem } from "@/utils/storage";
import { combineClassNames } from "@/utils";

function startWithZero(num: number) {
  return num < 10 ? "0" + String(num) : num;
}

export enum Mode {
  Practice,
  Examination,
  Quick,
}

export default function Details() {
  // 获取视频集合信息
  const location = useLocation();
  const questionSet = location.state as QuestionSet;

  // 当前题目索引
  const [currentIndex, setCurrentIndex] = useState(0);
  // 当前使用题目集合
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);

  // 切换上一题
  function nextQuestion() {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  // 切换下一题
  function pervQuestion() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  const [isCurrentQuestionCollected, setIsCurrentQuestionCollected] =
    useState(false);

  const currentQuestion = activeQuestions[currentIndex];
  const username = getItem("username");

  useEffect(() => {
    if (username && currentQuestion) {
      isQuestionCollected(
        username,
        questionSet.id,
        currentQuestion.type,
        currentQuestion.id
      ).then((data) => {
        if (data !== null) {
          setIsCurrentQuestionCollected(data);
        }
      });
    }
    // eslint-disable-next-line
  }, [currentIndex]);

  // 获取视频集合题库
  // eslint-disable-next-line
  const [_, questions] = useRequest(() =>
    getAllQuestionsBySetId(questionSet.id)
  );

  // 根据题目计算分数
  const [score, setScore] = useState(0);
  useEffect(() => {
    const score = activeQuestions.reduce((score, q) => {
      return score + (q.answer === q.result ? 5 : 0);
    }, 0);
    setScore(score);
  }, [activeQuestions]);

  // 题目组件，根据类型自动切换
  const QuestionComponent = (
    <Choice question={currentQuestion} onResultChange={onResultChange} />
  );

  // 响应回答事件
  function onResultChange(answer: string) {
    const newQuestion = Object.assign({}, currentQuestion, {
      result: answer,
    });
    const newActiveQuestions = [...activeQuestions];
    newActiveQuestions[currentIndex] = newQuestion;
    setActiveQuestions(newActiveQuestions);
  }

  const [mode, setMode] = useState<Mode>(Mode.Practice);
  const [showAnswer, setShowAnswer] = useState(mode === Mode.Practice);

  // 过滤指定题目
  useEffect(() => {
    if (questions) {
      setActiveQuestions(questions);
    }
  }, [questions]);

  useEffect(() => {
    if (mode === Mode.Practice) {
      setShowAnswer(true);
    } else {
      setShowAnswer(false);
    }
  }, [mode]);

  // 收藏题目
  function doCollect() {
    if (username && collectQuestion) {
      collectQuestion(
        username,
        questionSet.id,
        currentQuestion.type,
        currentQuestion.id
      ).then((data) => {
        if (data) {
          setIsCurrentQuestionCollected(!isCurrentQuestionCollected);
        }
      });
    }
  }

  // function sendQuestion2Server() {}

  return (
    <main>
      <div className="p-16 px-64 bg-gray-800 flex justify-between">
        <div className="p-8 bg-white rounded w-2/5">
          <div className="flex text-slate-500">
            <span>本章做题</span>
            <span className="ms-auto">数据中心</span>
          </div>
          <div className="flex py-4">
            <div className="grow text-center">
              <p className="text-4xl font-bold">1143</p>
              <p className="mt-2 text-slate-500">做题数</p>
            </div>
            <div className="grow text-center">
              <p className="text-4xl font-bold">78%</p>
              <p className="mt-2 text-slate-500">正确率</p>
            </div>
            <div className="grow text-center">
              <p className="text-4xl font-bold">3.5h</p>
              <p className="mt-2 text-slate-500">学习时长</p>
            </div>
          </div>
          <Divider className="my-2" />
          <div className="flex py-4 ext-slate-500">
            <div className="grow text-center group cursor-pointer">
              <BookmarkX size={44} className="group-hover:fill-red-500" />
              <p className="mt-2 group-hover:font-bold">错题集</p>
            </div>
            <div className="grow text-center group cursor-pointer">
              <Star size={44} className="group-hover:fill-yellow-500" />
              <p className="mt-2 group-hover:font-bold">收藏夹</p>
            </div>
            <div className="grow text-center group cursor-pointer">
              <LibraryBig size={44} className="group-hover:fill-green-500" />
              <p className="mt-2 group-hover:font-bold">做题记录</p>
            </div>
          </div>
        </div>
        <div className="p-8 flex flex-col bg-white rounded w-1/6">
          <div className="text-center">
            <NotebookPen className="stroke-orange-500" size={64} />
            <p className="text-lg font-bold mt-8">章节练习</p>
            <p className="text-slate-500">教程解析，节节练习</p>
          </div>
          <Button
            className="mt-auto"
            type="primary"
            block
            icon={<ThunderboltOutlined />}
            onClick={() => setMode(Mode.Practice)}
          >
            立即刷题
          </Button>
        </div>
        <div className="p-8 flex flex-col bg-white rounded w-1/6">
          <div className="text-center">
            <ScrollText className="stroke-orange-500" size={64} />
            <p className="text-lg font-bold mt-8">模拟考试</p>
            <p className="text-slate-500">海量题库，押题密卷</p>
          </div>
          <Button
            className="mt-auto"
            type="primary"
            block
            icon={<ThunderboltOutlined />}
            onClick={() => setMode(Mode.Examination)}
          >
            立即刷题
          </Button>
        </div>
        <div className="p-8 flex flex-col bg-white rounded w-1/6">
          <div className="text-center">
            <Rocket className="stroke-orange-500" size={64} />
            <p className="text-lg font-bold mt-8">快速做题</p>
            <p className="text-slate-500">强化冲刺，快速通关</p>
          </div>
          <Button
            className="mt-auto"
            type="primary"
            block
            disabled
            icon={<ThunderboltOutlined />}
          >
            暂不支持
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-28 py-16 px-64">
        <div className="w-2/3 shrink-0">
          <div>
            <Button type="primary">返回题库</Button>
          </div>
          <h2 className="text-2xl font-bold my-4">
            央国企严选高频笔试模拟题-论证推理
          </h2>
          <h3 className="text-slate-500">
            时长：25分钟 / 总分：60分 / 通过分：36分
          </h3>
          <Divider />
          <div className="flex items-center my-4">
            <div>
              <Button
                type="primary"
                onClick={pervQuestion}
                ghost
                disabled={currentIndex === 0}
              >
                上一题
              </Button>
              <Button
                type="primary"
                onClick={nextQuestion}
                ghost
                className="ms-4"
                disabled={currentIndex === activeQuestions.length - 1}
              >
                下一题
              </Button>
            </div>
            <div
              className="ms-auto me-4"
              style={{ transform: "translateY(13px)" }}
            >
              <Star
                className={combineClassNames(
                  "cursor-pointer stroke-transparent fill-slate-300 hover:fill-yellow-500",
                  isCurrentQuestionCollected ? "fill-yellow-500" : ""
                )}
                onClick={doCollect}
              />
            </div>
            <div className="inline-block">
              <span className="text-2xl">
                {startWithZero(currentIndex + 1)}&nbsp;/&nbsp;
              </span>
              <span className="text-5xl ">
                {startWithZero(activeQuestions.length)}
              </span>
            </div>
          </div>
          <section className="h-min-[300px]">{QuestionComponent}</section>
          {showAnswer && currentQuestion && currentQuestion.result != null && (
            <section className="mb-32">
              <h1 className="text-blue-500">
                答案解析：{currentQuestion.answer}
              </h1>
            </section>
          )}
        </div>
        <AnswerSheet
          mode={mode}
          score={score}
          currentIndex={currentIndex}
          onSwitch={(i) => setCurrentIndex(i)}
          onFinish={() => undefined}
          questions={activeQuestions}
        />
      </div>
    </main>
  );
}
