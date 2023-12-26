import { useEffect, useState } from "react";
import ResumeCard from "./ResumeCard";
import { getResumeAll } from "@/api/resume";
import { Resume } from "@/type/definition";

const MyResume = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    getResumeAll().then((resumes) => {
      if (resumes) {
        setResumes(resumes);
      }
    });
  }, []);

  return (
    <div>
      <h1 className="text-lg text-slate-700 pb-2 border border-0 border-b border-solid border-zinc-100">
        我的简历
      </h1>
      <div className="flex flex-wrap my-8 gap-6">
        {resumes.map((resume) => {
          return <ResumeCard key={resume.id} resume={resume} />;
        })}
      </div>
    </div>
  );
};

export default MyResume;
