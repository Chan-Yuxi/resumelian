import type { Nullable } from "@/@type/toolkit";
import type { VditorInstance, Callback } from "@/utils/vditor";
import type { RootState } from "@/store";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  Fragment,
} from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { Skeleton, message } from "antd";

import { createWorker, generateCustomStyle } from "@/utils";
import { createVditor } from "@/utils/vditor";
import { render } from "@/utils/render";
import { exportPage2PDF as toExport } from "@/utils/page-export";

import { saveResume } from "@/api/resume";

import ToolkitBar from "./ToolkitBar";
import StyleInjection from "./StyleInjection";

import DefaultStyleConfig from "@/config/preview-theme-default.json";

const Wrapper: React.FC<React.PropsWithChildren<{ loading: boolean }>> = (
  props
) => (
  <Skeleton
    className="h-full p-8 bg-white shadow"
    active
    loading={props.loading}
    title={{ width: 300 }}
    paragraph={{
      rows: 8,
      width: [500, 100, 700, 300, 300, 200, 500, 500],
    }}
  >
    {props.children}
  </Skeleton>
);

type D = HTMLDivElement;
type P = {
  username: string;
};

const ResumeModification: React.FC<P> = ({ username }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [value, setValue] = useState("");
  // const [theme, setTheme] = useState("");
  const [style, setStyle] = useState("");

  const [editor, setEditor] = useState<Nullable<VditorInstance>>(null);
  const [loading, setLoading] = useState(false);

  const vditorContainer = useRef<D>(null);
  const preview = useRef<D>(null);

  useLayoutEffect(() => {
    preview.current && render(preview.current, value);
  }, [value]);

  const { t } = useTranslation();
  const { resumeId, themeId } = useParams();

  useEffect(() => {
    vditorContainer.current &&
      createVditor(vditorContainer.current, ((vditor) =>
        setEditor(vditor)) as Callback);
  }, []);

  const [colors, setColors] = useState(DefaultStyleConfig.colors);
  const [avatar, setAvatar] = useState(false);
  const [family, setFamily] = useState("");

  useEffect(() => {
    setStyle(
      generateCustomStyle(colors, family).concat(DefaultStyleConfig.style)
    );
  }, [colors, family]);

  const requestResume = useCallback(
    async () =>
      /*(resumeId ? await getResume(resumeId) : "") */ await Promise.resolve(
        resumeId
      ),
    [resumeId]
  );

  const requestTheme = useCallback(
    async () => await Promise.resolve(themeId),
    [themeId]
  );

  const doSave = () => {
    saveResume(value, username).then((response) => {
      if (response) {
        message.success(t("rm.save_success"));
      }
    });
  };

  const doExport = () => {
    toExport(".page", `${username}-resume.pdf`)
      .then(() => messageApi.success(t("rm.export_success")))
      .catch((error: string) => messageApi.error(error));
  };

  useEffect(() => {
    if (!editor) return;
    const canceller = createWorker(() => setValue(editor.getHTML()));

    setLoading(true);
    editor.disabled();
    Promise.all([requestResume(), requestTheme()])
      .then((data) => data[0] && editor.setValue(data[0]))
      .finally(() => {
        setLoading(false);
        editor.enable();
      });

    return canceller;
  }, [editor, requestResume, requestTheme]);

  return (
    <Fragment>
      {contextHolder}
      <main className="h-full flex items-stretch">
        <aside className="basis-[535px]">
          <div className="rounded-none" ref={vditorContainer}></div>
        </aside>

        <aside className="grow">
          <ToolkitBar
            enableAvatar={avatar}
            onEnableAvatarChange={setAvatar}
            colors={colors}
            onColorsChange={setColors}
            family={family}
            onFamilyChange={setFamily}
            onSave={doSave}
            onExport={doExport}
          />
          <div
            className="flex justify-center overflow-scroll bg-gray-200"
            style={{ height: "calc(100% - 37px)" }}
          >
            <article className="mt-5 w-[825px]">
              <StyleInjection style={style} />

              <Wrapper loading={loading}>
                <div id="preview" ref={preview}></div>
              </Wrapper>
            </article>
          </div>
        </aside>
      </main>
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(ResumeModification);
