import { getQuestionSetOfPage } from "@/api/question";
import { usePagination } from "@/hooks";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import BankCard from "../components/BankCard";
import Pagination from "@/components/Pagination";

export default function Home() {
  const [questionSetsLoading, questionSets, paginationProps] = usePagination(
    (pageNum, pageSize) => getQuestionSetOfPage(pageNum, pageSize)
  );

  return (
    <main className="generic-container flex flex-col p-9">
      {questionSetsLoading ? (
        <div className="flex justify-center items-center">
          <Spin indicator={<LoadingOutlined />} />
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap">
          {questionSets &&
            questionSets.map((questionSet) => (
              <BankCard key={questionSet.id} questionSet={questionSet} />
            ))}
        </div>
      )}
      <div className="mt-auto text-center">
        <Pagination {...paginationProps} />
      </div>
    </main>
  );
}
