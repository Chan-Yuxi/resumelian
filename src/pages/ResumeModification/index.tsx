import type { Nullable } from "@/@type/toolkit";
import type { VditorInstance } from "@/utils/vditor";
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
import { App } from "antd";

import { createWorker, generateCustomStyle, isEmpty } from "@/utils";
import { createVditor } from "@/utils/vditor";
import { render } from "@/utils/render";
import { exportPage2PDF } from "@/utils/page-export";
import { createResume, getResume, modifyResume } from "@/api/resume";

import ToolkitBar from "./ToolkitBar";
import StyleInjection from "./StyleInjection";
import Avatar from "./Avatar";
import PreviewSkeleton from "./PreviewSkeleton";
import AskName from "./AskName";

import DefaultStyleConfig from "@/config/preview-theme-default.json";

type D = HTMLDivElement;
type E = Nullable<VditorInstance>;
type P = {
  username: string;
};

const ResumeModification: React.FC<P> = ({ username }) => {
  const { t } = useTranslation();
  const {
    message: { success, error, warning },
  } = App.useApp();

  const { resumeId: rid, themeId: tid } = useParams();

  const [value, setValue] = useState("");
  const [theme, setTheme] = useState("");
  const [style, setStyle] = useState("");

  const [editor, setEditor] = useState<E>(null);
  const [previewLoading, setPreviewLoading] = useState(true);

  const context = useRef<D>(null);
  const preview = useRef<D>(null);

  useEffect(() => {
    context.current && createVditor(context.current, (v) => setEditor(v));
  }, []);

  useLayoutEffect(() => {
    preview.current && render(preview.current, value);
  }, [value]);

  const [colors, setColors] = useState(DefaultStyleConfig.colors);
  const [avatar, setAvatar] = useState(false);
  const [family, setFamily] = useState("Arial");

  useEffect(() => {
    setStyle(generateCustomStyle(colors, family));
  }, [colors, family]);

  /** SAVE_RESUME **/

  const [open, setOpen] = useState(false);
  const [bindRid, setBindRid] = useState(rid);
  const [saveLoading, setSaveLoading] = useState(false);

  const doSave = () => {
    const markdown = editor?.getValue();

    if (isEmpty(markdown)) {
      warning(t("rm.empty_content"));
      return;
    }

    if (bindRid === undefined) {
      setOpen(true);
    } else {
      setSaveLoading(true);
      modifyResume(markdown, bindRid)
        .then((response) =>
          response ? success(t("rm.save_success")) : error(t("rm.save_failure"))
        )
        .finally(() => setSaveLoading(false));
    }
  };

  const handleAskNameDone = (name: string) => {
    const markdown = editor?.getValue();
    setOpen(false);
    setSaveLoading(true);

    createResume(markdown!, name, "1")
      .then((resume) => {
        if (!resume) error(t("rm.save_failure"));
        else {
          setBindRid(resume.id);
          success(t("rm.save_success"));
        }
      })
      .finally(() => setSaveLoading(false));
  };

  /** EXPORT_RESUME **/

  const doExport = () => {
    exportPage2PDF(`${username}-resume.pdf`)
      .then(() => success(t("rm.export_success")))
      .catch((e: string) => error(e));
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

  useEffect(() => {
    if (!editor) {
      return;
    }
    const canceller = createWorker(() => setValue(editor.getHTML()));
    editor.disabled();

    Promise.all([requestResume(), requestTheme()])
      .then((data) => {
        console.log(data);
        data[0] && editor.setValue(data[0]);
      })
      .finally(() => {
        setPreviewLoading(false);
        editor.enable();
      });

    return canceller;
  }, [editor, requestResume, requestTheme]);

  return (
    <main className="flex items-stretch">
      <aside className="basis-[535px]">
        <div className="rounded-none" ref={context} />
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

        <div className="flex justify-center bg-gray-200">
          <article className="mt-5 relative w-[825px]">
            <StyleInjection style={style} />
            <Avatar enable={avatar} />

            <PreviewSkeleton loading={previewLoading}>
              <div ref={preview} id="preview" className="preview" />
            </PreviewSkeleton>
          </article>
        </div>
      </aside>

      <AskName open={open} setOpen={setOpen} onOk={handleAskNameDone} />
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(ResumeModification);
