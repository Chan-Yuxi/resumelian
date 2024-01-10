import type { Resume } from "@/type/definition";

import { useState } from "react";
// import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { App, Button } from "antd";

import dayjs from "dayjs";

import { deleteResume } from "@/api/resume";

type P = {
  resume: Resume;
  reload: () => void;
};

const ResumeCard: React.FC<P> = ({ resume, reload }) => {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const { message } = App.useApp();
  const { success, error } = message;

  const { name, modifyTime, id: resumeId, theme: templateId } = resume;

  function handleEditClick() {
    navigate(`/resume-modification/${templateId}/${resumeId}`);
  }

  const [deleteLoading, setDeleteLoading] = useState(false);
  function handleDeleteClick() {
    setDeleteLoading(true);
    deleteResume(resumeId)
      .then((res) => {
        if (res) {
          success("删除成功");
          reload();
        } else {
          error("删除失败");
        }
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }

  return (
    <div className="flex gap-4 border border-solid  border-zinc-100 p-2 hover:shadow transition-all">
      <div className="bg-gradient-to-tl from-blue-300 shrink-0 to-blue-100 w-[150px] round aspect-a4">
        <img className="w-full h-full object-contain" src="/plan.png" alt="" />
      </div>
      <div className="w-[250px]">
        <h3 className="text-xl mb-1 w-full truncate ">{name}</h3>
        <h4 className="text-sm text-slate-500">
          更新于：{dayjs(modifyTime).format("YYYY/MM/DD HH:mm")}
        </h4>
        <div className="flex flex-col my-4">
          <Button className="text-left" type="link" onClick={handleEditClick}>
            编辑
          </Button>
          <Button
            className="text-left text-red-500"
            type="link"
            loading={deleteLoading}
            onClick={handleDeleteClick}
          >
            删除
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
