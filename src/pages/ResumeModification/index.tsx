import type { Nullable } from "@/@type/toolkit";

import React, { useEffect, useState } from "react";
import { message } from "antd";

import { Vditor, createVditor } from "@/utils/vditor";
import { render } from "@/utils/render";
import { export2PDF } from "@/utils/page-export";

import Toolkit from "./Toolkit";
import { RootState } from "@/store";
import { connect } from "react-redux";

const refreshDelay = 250;
const defaultColor = {
  pryColor: "#3b82f6",
  subColor: "#075985",
  thrColor: "#d97706",
};

type P = {
  username: string;
};

const ResumeModification: React.FC<P> = ({ username }) => {
  /**
   *
   */
  const [pryColor, setPryColor] = useState(defaultColor.pryColor);
  const [subColor, setSubColor] = useState(defaultColor.subColor);
  const [thrColor, setThrColor] = useState(defaultColor.thrColor);

  const [vditor, setVditor] = useState<Nullable<Vditor>>(null);
  const [value, setValue] = useState("");
  const [style, setStyle] = useState({});
  const [enableAvator, setEnableAvator] = useState(false);

  useEffect(() => {
    createVditor("vditor-element", (vditor) => setVditor(vditor));
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setValue(vditor?.getHTML() as string),
      refreshDelay
    );
    return () => clearInterval(timer);
  }, [vditor]);

  useEffect(() => {
    render("preview", value);
  }, [value]);

  useEffect(() => {
    setStyle({
      "--pry-color": `${pryColor}`,
      "--sub-color": `${subColor}`,
      "--thr-color": `${thrColor}`,
    });
  }, [pryColor, subColor, thrColor]);

  const [messageApi, contextHolder] = message.useMessage();
  function handleExport() {
    export2PDF(".page", `${username}-resume.pdf`).catch((error) =>
      messageApi.error(error as string)
    );
  }

  return (
    <>
      {contextHolder}
      <div className="flex h-full">
        <div className="h-full" style={{ flexBasis: "535px" }}>
          <div id="vditor-element"></div>
        </div>
        <div className="grow">
          <Toolkit
            pryColor={pryColor}
            subColor={subColor}
            thrColor={thrColor}
            onPryColorChange={setPryColor}
            onSubColorChange={setSubColor}
            onThrColorChange={setThrColor}
            enableAvator={enableAvator}
            onEnableAvatarChange={setEnableAvator}
            onExport={handleExport}
          />
          <div className="h-full flex justify-center bg-slate-400">
            <div className="px-5 m-5 overflow-scroll">
              <div id="preview" style={{ width: "794px", ...style }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProp = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProp)(ResumeModification);
