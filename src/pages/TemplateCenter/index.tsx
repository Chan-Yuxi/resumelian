import type { Template } from "@/type/definition";

import { useEffect, useState } from "react";
import { getAllTemplate } from "@/api/template";

import TemplateCard from "@/components/TemplateCard";

const TemplateCenter = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    getAllTemplate().then((data) => {
      if (data) {
        setTemplates(data);
      }
    });
  }, []);

  return (
    <main className="bg-indigo-200">
      <div className="m-8">
        {templates.map((template) => {
          return <TemplateCard key={template.id} template={template} />;
        })}
      </div>
    </main>
  );
};

export default TemplateCenter;
