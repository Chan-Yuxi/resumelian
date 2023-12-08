import type { Nullable } from "@/@type/toolkit";

import { useEffect, useState } from "react";

import { Vditor, createVditor } from "@/utils/vditor";
import { render } from "@/utils/render";
import { export2PDF } from "@/utils/page-export";

import { Button } from "antd";

const ResumeModification = () => {
  const refreshRate = 250;

  const [vditor, setVditor] = useState<Nullable<Vditor>>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    createVditor("vditor-element", (vditor) => setVditor(vditor));
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setValue(vditor?.getHTML() as string),
      refreshRate
    );
    return () => clearInterval(timer);
  }, [vditor]);

  useEffect(() => {
    render("preview", value);
  }, [value]);

  function handleExport() {
    export2PDF(".page", "resume.pdf").catch((error) => console.log(error));
  }

  return (
    <div className="h-full flex">
      <div className="h-full" style={{ flexBasis: "535px" }}>
        <div id="vditor-element"></div>
      </div>
      <div className="grow">
        <div className="bg-slate-100 h-[36px] px-4">
          <div className="h-full flex items-center">
            <Button type="primary" size="small" onClick={handleExport}>
              导出PDF
            </Button>
          </div>
        </div>
        <div className="h-full flex justify-center bg-slate-400">
          <div className="p-5 m-5 overflow-scroll">
            <div id="preview" style={{ width: "794px" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModification;
