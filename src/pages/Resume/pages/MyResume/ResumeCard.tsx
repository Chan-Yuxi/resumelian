import type { Resume } from "@/types/definition";

import { useState } from "react";
// import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { App, Button, Modal } from "antd";

import { HighlightOutlined, DeleteOutlined } from "@ant-design/icons";

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
    setOpen(false);
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

  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-4 border border-solid w-full sm:w-[400px] border-zinc-100 p-2 hover:shadow transition-all">
      <div className="bg-gradient-to-tl from-blue-300 shrink-0 to-blue-100 w-1/3 round aspect-a4">
        <img className="w-full h-full object-contain" src="/plan.png" alt="" />
      </div>
      <div className="shrink-1">
        <h3 className="text-sm sm:text-lg mb-1">
          {dayjs(name).format("YYYY/MM/DD HH:mm")}
        </h3>
        <h4 className="text-sm text-slate-500">
          更新于：{dayjs(modifyTime).format("YYYY/MM/DD HH:mm")}
        </h4>
        <div className="flex flex-col my-4">
          <Button
            icon={<HighlightOutlined />}
            className="px-0 text-left"
            type="link"
            onClick={handleEditClick}
          >
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            className="px-0 text-left text-red-500"
            type="link"
            loading={deleteLoading}
            onClick={() => setOpen(true)}
          >
            删除
          </Button>
        </div>
      </div>
      <Modal
        centered
        open={open}
        onCancel={() => setOpen(false)}
        cancelText="取消"
        okText="确认"
        onOk={handleDeleteClick}
      >
        <div className="my-6">确定删除这条简历吗？</div>
      </Modal>
    </div>
  );
};

export default ResumeCard;
