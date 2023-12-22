import { Theme } from "@/@type";
import React from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type P = {
  theme: Theme;
};

const TemplateCard: React.FC<P> = ({ theme }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { id, name, pic } = theme;

  const goResumeModification = () => {
    navigate(`/resume-modification/${id}`);
  };

  return (
    <div className="w-[200px] aspect-a4 inline-flex flex-col p-2 shadow">
      <div className="grow bg-red-300">
        <div className="h-full flex justify-center items-center [--show-btn:none] hover:[--show-btn:block]">
          <Button
            type="primary"
            ghost
            className="rounded-none [display:--show-btn]"
          >
            使用模板
          </Button>
        </div>
      </div>
      <div className="mt-2 ">
        <h5>XX Template</h5>
      </div>
    </div>
  );
};

export default TemplateCard;
