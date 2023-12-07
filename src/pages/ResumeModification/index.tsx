import { useEffect, useState } from "react";

import { Vditor, createVditor } from "@/utils/vditor";
import { renderTo } from "@/utils/render";

// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

const ResumeModification = () => {
  const [vditor, setVditor] = useState<Vditor>();
  const [value, setValue] = useState("");

  useEffect(() => {
    createVditor("vditor-element", (vditor) => setVditor(vditor));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setValue(vditor?.getHTML() as string), 250);
    return () => clearInterval(timer);
  }, [vditor]);

  useEffect(() => {
    renderTo("preview", value);
  }, [value]);

  function handleExport() {
    // ...
  }

  return (
    <div className="h-full flex">
      <div className="h-full" style={{ flexBasis: "535px" }}>
        <div id="vditor-element"></div>
      </div>
      <div className="flex grow justify-center bg-slate-500">
        <div className="px-5 m-5 overflow-scroll">
          <div id="preview" style={{ width: "794px" }}></div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModification;
