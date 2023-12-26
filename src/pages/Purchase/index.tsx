import { useEffect } from "react";
import PayCard from "./PayCard";
import QuestionAndAnswer from "./QuestionAndAnswer";

const descriptions = {
  有效期: "三个月",
  简历创建数量: "3次",
  简历下载版本: "多种格式下载",
  在线客服: "优先",
};

const Purchase = () => {
  return (
    <main>
      <div
        className="py-8 sm:py-0 mb-6 sm:mb-60"
        style={{ backgroundImage: "url(/index_background.png)" }}
      >
        <div className="text-center">
          <section className="inline-flex flex-wrap gap-6 sm:gap-12 justify-center sm:p-12 sm:bg-zinc-50 shadow-lg rounded-lg sm:translate-y-1/4">
            <PayCard name="三个月会员" price={25} descriptions={descriptions} />
            <PayCard name="六个月会员" price={55} descriptions={descriptions} />
            <PayCard name="一年会员" price={125} descriptions={descriptions} />
          </section>
        </div>
      </div>

      <div className="text-center mb-32">
        <div>
          <h3 className="text-xl">常见问题</h3>
        </div>
        <div>
          <div className="inline-flex flex-wrap gap-4 justify-center my-8 px-6 w-full sm:w-2/3">
            <QuestionAndAnswer />
            <QuestionAndAnswer />
            <QuestionAndAnswer />
            <QuestionAndAnswer />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Purchase;
