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
import { getAllQuestionsBySetId } from "@/api/question";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AnswerSheet from "../components/AnswerSheet";
import Choice from "../components/questionTypes/choice";
import { Question, QuestionSet } from "@/types/definition";

function startWithZero(num: number) {
  return num < 10 ? "0" + String(num) : num;
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

  // 获取视频集合题库
  // eslint-disable-next-line
  const [_, questions] = useRequest(() =>
    getAllQuestionsBySetId(questionSet.id)
  );

  // 过滤指定题目
  useEffect(() => {
    if (questions) {
      setActiveQuestions(questions);
    }
  }, [questions]);

  console.log(activeQuestions);

  // id               题目ID
  // type             题目类型
  // question         题目
  // annex            附加
  // answerContent    内容
  // answer           答案
  // result           回答
  // score            分数
  //

  // QuestionComponent -> onAnswerChange -> updateResult ->

  // 响应回答事件

  const currentQuestion = activeQuestions[currentIndex];
  const QuestionComponent = (
    <Choice question={currentQuestion} onResultChange={onResultChange} />
  );

  function onResultChange(answer: string) {
    const newQuestion = Object.assign({}, currentQuestion, {
      result: answer,
    });
    const newActiveQuestions = [...activeQuestions];
    newActiveQuestions[currentIndex] = newQuestion;
    setActiveQuestions(newActiveQuestions);
  }

  return (
    <main>
      <div className="p-16 px-64 bg-gray-800 flex justify-between">
        <div className="p-8 bg-white rounded w-2/5">
          <div className="flex text-slate-500">
            <span>本周做题</span>
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
            icon={<ThunderboltOutlined />}
          >
            立即刷题
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
              <Button type="primary" onClick={pervQuestion} ghost>
                上一题
              </Button>
              <Button
                type="primary"
                onClick={nextQuestion}
                ghost
                className="ms-4"
              >
                下一题
              </Button>
            </div>
            <div className="ms-auto inline-block">
              <span className="text-2xl">
                {startWithZero(currentIndex + 1)}&nbsp;/&nbsp;
              </span>
              <span className="text-5xl ">{questions?.length}</span>
            </div>
          </div>
          <section className="h-[500px]">{QuestionComponent}</section>
        </div>
        <AnswerSheet
          onSwitch={(i) => setCurrentIndex(i)}
          onFinish={() => undefined}
          questions={activeQuestions}
        />
      </div>
    </main>
  );
}
