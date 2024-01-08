import type { RootState } from "@/store";
import type { VditorInstance } from "@/utils/vditor";
import type { Resume, Theme } from "@/type/definition";
import type { Nullable } from "@/type/toolkit";

import React, {
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";

import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { App } from "antd";

import dayjs from "dayjs";

import { createWorker, isEmpty } from "@/utils";
import { createVditor } from "@/utils/vditor";
import { exportPage2PDF } from "@/utils/page-export";
import { render } from "@/utils/render";
import { reducer, initialTheme, setupTheme } from "./reducer";

import { createResume, getResume, modifyResume } from "@/api/resume";
import { getTemplate } from "@/api/template";

import StyleInjection from "./StyleInjection";
import ToolkitBar from "./ToolkitBar";
import PreviewSkeleton from "./PreviewSkeleton";
import Avatar from "./Avatar";
import ChatGPTPanel from "./ChatGPTPanel";

type R = HTMLDivElement;
type E = Nullable<VditorInstance>;
type P = {
  username: string;
};

function createResumeInstance(
  id: string,
  name: string,
  value: string,
  tid: string | undefined,
  theme: Theme
): Resume {
  if (!tid) tid = "0";
  return {
    id,
    name: name,
    text: value,
    theme: tid,
    customTheme: JSON.stringify(theme),
  };
}

function fileName(username: string) {
  return `${username}-${dayjs().format("DD/MM/YYYY")}.pdf`;
}

const ResumeModification: React.FC<P> = ({ username }) => {
  const { message } = App.useApp();
  const { success, warning, error } = message;
  const { t } = useTranslation();

  // hValue is an HTML value, which is the corresponding HTML text generated by the editor based on the markdown
  // when it changes, render it to the preview element
  const [hValue, setHValue] = useState<string>();
  const [editor, setEditor] = useState<E>(null);

  const context = useRef<R>(null);
  const preview = useRef<R>(null);

  useEffect(() => {
    context.current && createVditor(context.current, (v) => setEditor(v));
  }, []);

  useLayoutEffect(() => {
    preview.current && render(preview.current, hValue);
  }, [hValue]);

  // the theme determines the appearance of the preview area
  // due to the large amount of theme content, reducer and dynamic style tags are used to achieve
  const [theme, dispatch] = useReducer(reducer, initialTheme);

  const { templateId: tid, resumeId: rid } = useParams();
  const requestThemeAndValue = useCallback(async (): Promise<{
    value: string;
    theme: Nullable<Theme>;
  }> => {
    let value: string;
    let theme: Nullable<Theme> = null;

    value = "";

    if (tid) {
      const template = await getTemplate(tid === "undefined" ? "0" : tid);
      if (template) {
        try {
          theme = JSON.parse(template.content) as Theme;
          value = theme["default"];
        } catch (e) {
          // it's possible that the theme is a default theme, which have no any content
          // trigger parsing error
        }

        if (rid) {
          const resume = await getResume(rid);
          if (resume) {
            const { text, customTheme, name } = resume;
            setName(name);
            theme = Object.assign({}, theme, JSON.parse(customTheme) as Theme);
            value = text;
          }
        }
      }
    }

    return {
      theme,
      value,
    };
  }, [tid, rid]);

  // after the ResumeModification Component mounting is completed and the editor is ready
  // request theme and resume content, and initialize
  // enable polling to detect changes
  const [previewLoading, setPreviewLoading] = useState(true);
  useEffect(() => {
    if (editor === null) {
      return;
    }

    editor.disabled();
    requestThemeAndValue()
      .then(({ theme, value }) => {
        theme && dispatch(setupTheme(theme));
        editor.setValue(value);
      })
      .finally(() => {
        editor.enable();
        setPreviewLoading(false);
      });

    return createWorker(() => setHValue(editor.getHTML()));
  }, [editor, requestThemeAndValue]);

  // User export and save processing
  const [exportLoading, setExportLoading] = useState(false);
  function handleExport() {
    setExportLoading(true);
    exportPage2PDF(fileName(username))
      .then(() => success(t("resumeModification:Resume exported successfully")))
      .catch((e: string) => error(e))
      .finally(() => setExportLoading(false));
  }

  const [name, setName] = useState(dayjs().format());
  const [id, setId] = useState(rid);

  const [saveLoading, setSaveLoading] = useState(false);
  function handleSave() {
    const value = editor?.getValue();

    if (isEmpty(value)) {
      warning(
        t("resumeModification:Your resume content is empty and cannot be saved")
      );
      return;
    }

    setSaveLoading(false);
    const resume = createResumeInstance(id || "", name, value, tid, theme);

    if (id) {
      modifyResume(resume).then((resume) => {
        resume
          ? success(
              t("resumeModification:Your resume has been successfully saved")
            )
          : error(t("resumeModification:Save failed"));
      });
    } else {
      createResume(resume).then((resume) => {
        if (!resume) error(t("resumeModification:Save failed"));
        else {
          setId(resume.id);
          success(
            t("resumeModification:Your resume has been successfully saved")
          );
        }
      });
    }
  }

  // ChatGPT
  const [open, setOpen] = useState(false);
  function handleAIResponse(dialogue: string, type: string) {
    console.log(type);
    if (editor) {
      editor.setValue(editor.getValue() + dialogue);
    }
  }

  return (
    <main className="flex h-reach-bottom">
      <aside className="overflow-scroll" style={{ width: "535px" }}>
        <div className="rounded-none" ref={context} />
      </aside>
      <aside className="relative grow flex flex-col">
        <ToolkitBar
          onExport={handleExport}
          exportLoading={exportLoading}
          onSave={handleSave}
          saveLoading={saveLoading}
          onChatGPTButtonClick={() => setOpen(!open)}
          theme={theme}
          dispatch={dispatch}
        />
        <div className="overflow-scroll flex justify-center bg-gray-200">
          <article className="mt-5 relative w-[825px]">
            <StyleInjection theme={theme} />

            <Avatar
              url="/default_avatar.jpg"
              position={theme.avatarPosition}
              enable={theme.enableAvatar}
              dispatch={dispatch}
            />
            <PreviewSkeleton loading={previewLoading}>
              <div ref={preview} id="preview" className="preview" />
            </PreviewSkeleton>
          </article>
        </div>

        <ChatGPTPanel
          open={open}
          onClose={() => setOpen(false)}
          onAIResponse={handleAIResponse}
        />
      </aside>
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(ResumeModification);
