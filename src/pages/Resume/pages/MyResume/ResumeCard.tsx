import { Button } from "antd";
import type { Resume } from "@/type/definition";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

type P = {
  resume: Resume;
};

const ResumeCard: React.FC<P> = ({ resume }) => {
  const {
    resumeName,
    modifyTime,
    id: resumeId,
    resumeTheme: templateId,
  } = resume;

  const navigate = useNavigate();

  function handleEditClick() {
    navigate(`/resume-modification/${templateId}/${resumeId}`);
  }

  return (
    <div className="flex gap-4 border border-solid  border-zinc-100 p-2 hover:shadow transition-all w-[400px]">
      <div className="bg-gradient-to-tl from-blue-300 shrink-0 to-blue-100 w-[150px] round aspect-a4">
        <img className="w-full h-full object-contain" src="/plan.png" alt="" />
      </div>
      <div className="">
        <h3 className="text-xl mb-1 truncate text-ellipsis">{resumeName}</h3>
        <h4 className="text-sm text-slate-500">
          更新于：{dayjs(modifyTime).format("YYYY/MM/DD HH:mm")}
        </h4>
        <div className="flex flex-col my-4">
          <Button type="link" onClick={handleEditClick}>
            编辑
          </Button>
          <Button type="link">复制</Button>
          <Button type="link">删除</Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
