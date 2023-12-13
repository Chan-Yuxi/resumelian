import type { VditorInstance } from "@/utils/vditor";
import type { Nullable } from "@/@type/toolkit";
import type { RootState } from "@/store";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { message } from "antd";

import { createVditor } from "@/utils/vditor";
import { render } from "@/utils/render";
import { generateCustomStyle } from "@/utils";
import { export2PDF as toExport } from "@/utils/page-export";

// import Avatar from "./Avatar";
import ToolkitBar from "./ToolkitBar";
import StyleInjection from "./StyleInjection";

import DefaultStyleConfig from "@/config/preview-theme-default.json";
import { useParams } from "react-router-dom";

type P = {
  username: string;
};

const ResumeModification: React.FC<P> = ({ username }) => {
  const { resumeId } = useParams();
  console.log(resumeId);

  const [messageApi, contextHolder] = message.useMessage();

  const refreshDelay = 250;
  const { colors: defaultColors, style: themeStyle } = DefaultStyleConfig;

  const [colors, setColors] = useState(defaultColors);
  const [avatar, setAvatar] = useState(false);
  const [family, setFamily] = useState("");
  // const [getter, setGutter] = useState("1rem");

  const [value, setValue] = useState("");
  const [style, setStyle] = useState("");

  const [vditor, setVditor] = useState<Nullable<VditorInstance>>(null);

  useEffect(() => {
    console.log('mounted')
    createVditor("vditor-element", (vditor) => setVditor(vditor));
  }, []);

  useEffect(() => {
    const worker = setInterval(
      () => setValue(vditor?.getHTML() as string),
      refreshDelay
    );
    return () => clearInterval(worker);
  }, [vditor]);

  useEffect(() => {
    render("preview", value);
  }, [value]);

  useEffect(() => {
    setStyle(generateCustomStyle(colors, family).concat(themeStyle));
  }, [colors, family, themeStyle]);

  function doExport() {
    toExport(".page", `${username}-resume.pdf`).catch((error) =>
      messageApi.error(error as string)
    );
  }

  return (
    <React.Fragment>
      {contextHolder}
      <div className="flex h-full">
        <div className="h-full" style={{ flexBasis: "535px" }}>
          <div className="rounded-none" id="vditor-element"></div>
        </div>

        <div className="grow">
          <ToolkitBar
            enableAvatar={avatar}
            onEnableAvatarChange={setAvatar}
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
    </React.Fragment>
  );
};

const mapStateToProp = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProp)(ResumeModification);
