import { QuestionSet } from "@/types/definition";
import { Button, Card } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export default function BankCard({
  questionSet,
}: {
  questionSet: QuestionSet;
}) {
  const navigate = useNavigate();

  function goDetails() {
    navigate(`/question-bank/details`, {
      state: questionSet,
    });
  }

  return (
    <Card
      className="w-72"
      cover={
        <img
          src={`https://www.jianlizhizuo.cn/static/${questionSet.pic}`}
          alt={questionSet.name}
        />
      }
    >
      <Meta
        title={questionSet.name}
        description={dayjs(questionSet.createTime).format("YYYY-MM-DD")}
      />
      <p className="my-4 text-slate-500">浏览量：{questionSet.browse}</p>
      <Button type="primary" onClick={goDetails} ghost block>
        开始学习
      </Button>
    </Card>
  );
}
