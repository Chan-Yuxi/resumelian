import type { Template } from "@/type/definition";

import { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { getAllTemplate } from "@/api/template";
import TemplateCard from "@/components/TemplateCard";

const TemplateCenter = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllTemplate()
      .then((data) => data && setTemplates(data))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="grow flex flex-wrap items-start gap-4 p-6 sm:p-9 bg-gradient-to-br from-sky-500 via-blue-400 to-blue-500">
      {loading ? (
        <div className="grow self-stretch flex justify-center items-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      ) : (
        templates.map((template) => {
          // filter the default theme
          return template.id !== 0 ? (
            <TemplateCard key={template.id} template={template} />
          ) : null;
        })
      )}
    </main>
  );
};

export default TemplateCenter;
