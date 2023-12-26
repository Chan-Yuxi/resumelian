import type { Template } from "@/type/definition";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

type P = {
  template: Template;
};

const TemplateCard: React.FC<P> = ({ template }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { id, name, pic: picture } = template;
  const goResumeModification = () => navigate(`/resume-modification/${id}`);

  return (
    <div className="flex flex-col p-2 bg-white shadow">
      <figure
        className="w-[188px] aspect-a4 bg-cover shadow-inner"
        style={{
          backgroundImage: `url(https://jianlizhizuo.cn/home/getrusumethemepic2?id=${picture})`,
        }}
      >
        <figcaption className="h-full flex justify-center items-center">
          <Button
            className="rounded-none"
            type="primary"
            ghost
            onClick={goResumeModification}
          >
            {t("tc.use_this_template")}
          </Button>
        </figcaption>
      </figure>

      <div className="mt-2">
        <h5>{name}</h5>
      </div>
    </div>
  );
};

export default TemplateCard;
