import type { Vditor } from "@/utils/vditor";
import type { Nullable } from "@/@type/toolkit";
import type { RootState } from "@/store";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { message } from "antd";

import { createVditor } from "@/utils/vditor";
import { render } from "@/utils/render";
import { generateCustomStyle } from "@/utils";
import { export2PDF as toExport } from "@/utils/page-export";

import Toolkit from "./Toolkit";
import StyleInjection from "./StyleInjection";

import DefaultStyleConfig from "@/config/preview-styles-default.json";

type P = {
  username: string;
};

const ResumeModification: React.FC<P> = ({ username }) => {
  const refreshDelay = 250;
  const { colors: defaultColors, family: defaultFamily } = DefaultStyleConfig;

  const [colors, setColors] = useState(defaultColors);
  const [avator, setAvator] = useState(false);
  const [family, setFamily] = useState("");
  const [getter, setGutter] = useState("1rem 0");

  const [value, setValue] = useState("");
  const [style, setStyle] = useState("");
  const [vditor, setVditor] = useState<Nullable<Vditor>>(null);

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
    setStyle(generateCustomStyle(colors, family));
  }, [colors, family]);

  const [messageApi, contextHolder] = message.useMessage();
  function doExport() {
    toExport(".page", `${username}-resume.pdf`).catch((error) =>
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
            enableAvator={avator}
            onEnableAvatarChange={setAvator}
            colors={colors}
            onColorsChange={setColors}
            family={family}
            onFamilyChange={setFamily}
            onExport={doExport}
          />

          <div className="h-full flex justify-center bg-slate-400">
            <div className="px-5 m-5 overflow-scroll">
              <StyleInjection style={style} />
              <div id="preview" style={{ width: "794px" }}></div>
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
