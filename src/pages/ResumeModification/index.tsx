import type { Nullable } from "@/@type/toolkit";
import type { VditorInstance, Callback } from "@/utils/vditor";
import type { RootState } from "@/store";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";

import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Skeleton, message } from "antd";

import { createWorker, generateCustomStyle, isEmpty } from "@/utils";
import { createVditor } from "@/utils/vditor";
import { render } from "@/utils/render";
import { exportPage2PDF as toExport } from "@/utils/page-export";
import { createResume, getResume, modifyResume } from "@/api/resume";

import ToolkitBar from "./ToolkitBar";
import StyleInjection from "./StyleInjection";
import Avatar from "./Avatar";

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
  const { resumeId: rid, themeId: tid } = useParams();

  useEffect(() => {
    vditorContainer.current &&
      createVditor(vditorContainer.current, ((vditor) =>
        setEditor(vditor)) as Callback);
  }, []);

  const [colors, setColors] = useState(DefaultStyleConfig.colors);
  const [avatar, setAvatar] = useState(false);
  const [family, setFamily] = useState("Arial");

  useEffect(() => {
    setStyle(
      generateCustomStyle(colors, family).concat(DefaultStyleConfig.style)
    );
  }, [colors, family]);

  // BINDRID: 简历创建后，指向新创建的简历 ID，以供后续更新使用
  // 此处为创建和更新的处理
  // 如果 ID 为空，发起创建简历请求
  // 否则，发起更新简历请求
  const [bindRid, setBindRid] = useState(rid);
  const [saveLoading, setSaveLoading] = useState(false);

  const doSave = () => {
    const markdown = editor?.getValue();

    // 如果文本为空，不予保存
    if (isEmpty(markdown)) {
      message.warning(t("rm.empty_content"));
      return;
    }

    setSaveLoading(true);
    if (bindRid === undefined) {
      createResume(markdown, "temp:theme-id")
        .then((createdResume) => {
          if (!createdResume) {
            message.error(t("rm.fail_to_save_resume"));
          } else {
            // Show Model to setup a name
            message.success(t("rm.save_success"));
            setBindRid(createdResume.id);
          }
        })
        .finally(() => setSaveLoading(false));
    } else {
      modifyResume(markdown, bindRid)
        .then((response) => {
          response
            ? message.success(t("rm.save_success"))
            : message.error(t("rm.fail_to_save_resume"));
        })
        .finally(() => setSaveLoading(false));
    }
  };

  const doExport = () => {
    toExport(`${username}-resume.pdf`)
      .then(() => messageApi.success(t("rm.export_success")))
      .catch((error: string) => messageApi.error(error));
  };

  const requestResume = useCallback(async () => {
    if (rid) {
      editor?.setValue("");
      const resume = await getResume(rid);

      return resume ? resume.resumeText : "";
    } else {
      return "";
    }
  }, [editor, rid]);

  const requestTheme = useCallback(
    async () => await Promise.resolve(tid),
    [tid]
  );

  // 挂载时，启动任务实时更新简历预览
  useEffect(() => {
    if (!editor) return;
    const canceller = createWorker(() => setValue(editor.getHTML()));

    setLoading(true);
    editor.disabled();
    Promise.all([requestResume(), requestTheme()])
      .then((data) => {
        data[0] && editor.setValue(data[0]);
      })
      .finally(() => {
        setLoading(false);
        editor.enable();
      });

    return canceller;
  }, [editor, requestResume, requestTheme]);

  return (
    <>
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
            saveLoading={saveLoading}
            onExport={doExport}
          />
          <div
            className="flex justify-center overflow-scroll bg-gray-200"
            style={{ height: "calc(100% - 37px)" }}
          >
            <article className="mt-5 relative w-[825px]">
              <StyleInjection style={style} />
              <Avatar enable={avatar} />

              <Wrapper loading={loading}>
                <div id="preview" ref={preview}></div>
              </Wrapper>
            </article>
          </div>
        </aside>
      </main>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(ResumeModification);
