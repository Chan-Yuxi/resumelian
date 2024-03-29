import { Question } from "@/types/definition";
import { combineClassNames } from "@/utils";
import { Button, Divider, Progress } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Mode } from "../pages/Details";

function seq(start: number, end: number) {
  const seq = [];
  for (let i = start; i <= end; i++) {
    seq.push(i);
  }
  return seq;
}

export default function AnswerSheet({
  score,
  currentIndex,
  questions,
  onFinish,
  onSwitch,
  mode,
}: {
  mode: Mode;
  score: number;
  currentIndex: number;
  questions: Question[];
  onFinish: (seconds: number) => void;
  onSwitch: (index: number) => void;
}) {
  const list = seq(1, questions.length);
  const progress = Number(
    (
      (questions.filter((q) => q.result != null).length / questions.length) *
      100
    ).toFixed(0)
  );

  useEffect(() => {
    setSeconds(0);
  }, [questions]);

  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [seconds]);

  return (
    <div className="grow shadow rounded p-4 flex flex-col">
      <h3 className="text-lg text-slate-500">我的答题信息</h3>
      <Divider className="my-3" />
      <div className="flex justify-between">
        {mode === Mode.Examination && (
          <div>
            <h4 className="text-base">
              <span className="text-slate-500">用时-</span>
              <span> {dayjs(seconds * 1000).format("mm:ss")}</span>
            </h4>
            <h4 className="text-base">
              <span className="text-slate-500">得分-</span>
              <span> {score}</span>
            </h4>
          </div>
        )}
        <div className="ms-auto">
          <Progress size={80} type="circle" percent={progress} />
        </div>
      </div>
      <Divider className="my-3" />
      <ul className="flex mb-32 justify-start gap-2 flex-wrap">
        {list.map((i, index) => (
          <li
            key={i}
            onClick={() => onSwitch(index)}
            className={combineClassNames(
              "inline-block w-8 h-8 leading-8 text-center rounded-full border-base cursor-pointer hover:bg-blue-200 hover:text-blue-500",
              questions[index].result
                ? "!border-blue-500 bg-blue-200 text-blue-500"
                : currentIndex === index
                ? "!border-blue-500 text-blue-500"
                : "!border-slate-300"
            )}
          >
            {i}
          </li>
        ))}
      </ul>
      {/* number -> valueOf -> toString    string -> toString -> valueOf */}
      {mode === Mode.Examination && (
        <Button block onClick={() => onFinish(seconds)}>
          交卷
        </Button>
      )}
    </div>
  );
}
