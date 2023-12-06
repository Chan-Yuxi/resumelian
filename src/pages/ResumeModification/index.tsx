import { useEffect, useState } from "react";
import { Row, Col } from "antd";

import { Vditor, createVditor } from "@/utils/vditor";
import { renderTo } from "@/utils/render";

const ResumeModification = () => {
  const [vditor, setVditor] = useState<Vditor>();
  const [value, setValue] = useState("");

  useEffect(() => {
    createVditor("vditor-element", (vditor) => setVditor(vditor));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setValue(vditor?.getHTML() as string);
    }, 500);
    return () => clearInterval(timer);
  }, [vditor]);

  useEffect(() => {
    renderTo("preview", value);
  }, [value]);

  return (
    <div className="m-5">
      <Row gutter={12}>
        <Col span={12}>
          <div id="vditor-element"></div>
        </Col>
        <Col span={12}>
          <div className="border border-solid border-slate-200 bg-slate-400 rounded p-3">
            <div>
              <div id="preview"></div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ResumeModification;
