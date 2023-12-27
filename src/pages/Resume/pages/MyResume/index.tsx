import type { Resume } from "@/type/definition";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { getResumeAll } from "@/api/resume";
import ResumeCard from "./ResumeCard";

const MyResume = () => {
  const { t } = useTranslation();

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
        <div className="w-full h-full flex justify-center items-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      ) : (
        <div className="flex flex-wrap my-8 gap-6">
          {resumes.map((resume) => {
            return (
              <ResumeCard key={resume.id} resume={resume} reload={reload} />
            );
          })}
        </div>
      )}
    </>
  );
};

export default MyResume;
