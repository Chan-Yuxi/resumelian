import { Question } from "@/types/definition";
import { combineClassNames } from "@/utils";
import { Button, Divider, Progress } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

function seq(start: number, end: number) {
  const seq = [];
  for (let i = start; i <= end; i++) {
    seq.push(i);
  }
  return seq;
}

export default function AnswerSheet({
  questions,
  onFinish,
  onSwitch,
}: {
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

  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setSeconds(seconds + 1);
    }, 1000);
  }, [seconds]);

  return (
    <div className="grow shadow rounded p-4 flex flex-col">
      <h3 className="text-lg text-slate-500">我的答题信息</h3>
      <Divider className="my-3" />
      <div className="flex justify-between">
        <div>
          <h4 className="text-base">
            <span className="text-slate-500">用时-</span>
            <span> {dayjs(seconds * 1000).format("mm:ss")}</span>
          </h4>
        </div>
        <div>
          <Progress size={80} type="circle" percent={progress} />
        </div>
      </div>
      <Divider className="my-3" />
      <ul className="flex mb-32 justify-start gap-2 flex-wrap">
        {list.map((i) => (
          <li
            key={i}
            onClick={() => onSwitch(i - 1)}
            className={combineClassNames(
              "inline-block w-8 h-8 leading-8 text-center rounded-full border-base cursor-pointer hover:bg-blue-200 hover:text-blue-500",
              questions[i - 1].result
                ? "!border-blue-500 bg-blue-200 text-blue-500"
                : "!border-slate-300"
            )}
          >
            {i}
          </li>
        ))}
      </ul>
      <Button block onClick={() => onFinish(seconds)}>
        交卷
      </Button>
    </div>
  );
}
