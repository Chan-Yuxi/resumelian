import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { usePagination } from "@/hooks";
import { getTemplatesOfPage } from "@/api/template";

import Pagination from "@/components/Pagination";
import TemplateCard from "@/components/TemplateCard";

const TemplateCenter = () => {
  const [loading, data, paginationProps] = usePagination((pageNum, pageSize) =>
    getTemplatesOfPage(pageNum, pageSize)
  );

  return (
    <div className="generic-container p-6 sm:p-9 flex flex-col">
      <main className="grow flex flex-wrap items-start gap-4">
        {loading ? (
          <div className="grow self-stretch flex justify-center items-center">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          </div>
        ) : (
          data &&
          data.map((template) => {
            // filter the default theme
            return template.id !== 0 ? (
              <TemplateCard key={template.id} template={template} />
            ) : null;
          })
        )}
      </main>
      <div className="my-4 text-center">
        <Pagination {...paginationProps} />
      </div>
    </div>
  );
};

export default TemplateCenter;
