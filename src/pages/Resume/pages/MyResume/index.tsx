import type { Resume } from "@/type/definition";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Spin, Button } from "antd";
import { LoadingOutlined, CopyOutlined } from "@ant-design/icons";

import { getResumeAll } from "@/api/resume";
import ResumeCard from "./ResumeCard";
import { useNavigate } from "react-router-dom";

const MyResume = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);

  function reload() {
    setLoading(true);
    getResumeAll()
      .then((resumes) => resumes && setResumes(resumes))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    reload();
  }, []);

  return (
    <>
      <h1 className="text-lg text-slate-700 pb-2 border border-0 border-b border-solid border-zinc-100">
        {t("resume:My Resume")}
      </h1>
      {loading ? (
        <div className="w-full h-80 flex justify-center items-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      ) : resumes.length > 0 ? (
        <div className="flex flex-wrap my-8 gap-6">
          {resumes.map((resume) => {
            return (
              <ResumeCard key={resume.id} resume={resume} reload={reload} />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col h-80 justify-center items-center">
          <div className="mt-8 text-slate-500">
            <span>简历列表为空</span>
          </div>
          <Button
            className="mt-4 px-8"
            type="primary"
            icon={<CopyOutlined />}
            ghost
            onClick={() => navigate("/resume-modification")}
          >
            去创建
          </Button>
        </div>
      )}
    </>
  );
};

export default MyResume;
