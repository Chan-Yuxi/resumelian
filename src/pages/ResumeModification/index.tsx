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

import { getTemplate } from "@/api/template";
import { Template, Theme } from "@/@type/definition";

type T = Theme;
type D = HTMLDivElement;
type E = Nullable<VditorInstance>;
type P = {
  username: string;
};

/**
 *
 *
 * getDeriveTheme(customTheme, theme) => {colors, style, family, getter, enableAvatar, avatarPosition}: derivedTheme;
 *
 * initialThemeMapToState(derivedTheme) => void;
 *
 * save(value, derivedTheme) => void
 *
 *
 */

/**
 * 如果没有模板 ID，从 LocalStorage 中取得
 * 如果有模板 ID 没有简历 ID，从模板 template-resume 中取值
 * 如果有简历 ID，从服务器取值
 *
 *
 */

const ResumeModification: React.FC<P> = ({ username }) => {
  const {
    message: { success, error, warning },
  } = App.useApp();
  const { t } = useTranslation();

  const { resumeId: rid, themeId: tid } = useParams();

  const [value, setValue] = useState("");
  const [theme, setTheme] = useState<Theme>();
  const [style, setStyle] = useState("");

  const [editor, setEditor] = useState<E>(null);
  const [previewLoading, setPreviewLoading] = useState(true);

  const context = useRef<D>(null);
  const preview = useRef<D>(null);

  // 初始化编辑器
  useEffect(() => {
    context.current && createVditor(context.current, (v) => setEditor(v));
  }, []);

  useLayoutEffect(() => {
    preview.current && render(preview.current, value);
  }, [value]);

  const [colors, setColors] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<boolean>(false);
  const [family, setFamily] = useState("Arial");

  /**
   * 重要，间隔 // useReducer
   */

  useEffect(() => {
    console.log(theme);
    let style = generateCustomStyle(colors, family);
    if (theme) {
      style = style.concat(theme.style);
    }
    setStyle(style);
  }, [colors, family, theme]);

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

  /**
   *
   * 从路由获取 {resumeId，themeId} = useParam()
   *
   * 挂载完了
   * 现在有 Vditor 对象
   *
   *
   * 没有主题
   *     从 localStorage 中取得主题和文本
   *
   * 请求模板
   *     setDisable
   *     setPreviewLoading
   *
   *     得到模板了，现在有了 { colors, family ... }
   *     如果
   *
   *
   *
   *
   *
   *
   *
   */

  // 从服务器（如果存在 Rid）或者从 Redux 或者 localStorage 中取 ?
  const requestResume = useCallback(async () => {
    if (rid) {
      editor?.setValue("");
      const resume = await getResume(rid);

      return resume ? resume.resumeText : "";
    } else {
      // redux or localStorage
      return "";
    }
  }, [editor, rid]);

  const requestTheme = useCallback(async () => {
    if (tid) {
      const template = await getTemplate(tid);
      if (template) {
        // console.log(template);
        resolveTemplate(template);
      }
    }
  }, [tid]);

  function resolveTemplate(template: Template) {
    const { content } = template;
    const theme = JSON.parse(content) as Theme;
  }

  function getDeriveTheme(customTheme: Theme, theme: Theme): Theme {
    return theme;
  }

  /**
   * In general, there are three types of triggering actions for users before they come to the resume editing page
   * Click on the template on the resume template page to jump to it
   * Click on my resume page to redirect to my resume
   * Return from other pages
   * In the first scenario, the template loading theme should be obtained by requesting the server to load it
   * In the second scenario, the resume content and custom themes should be obtained and applied in the first scenario
   * In the third scenario, the last saved content should be loaded
   */
  const requestThemeAndValue = useCallback(
    async (
      editor: NonNullable<E>
    ): Promise<{
      theme: T;
      value: string;
    }> => {
      let theme: T;
      let value: string;

      theme = {} as T;
      value = "get from localStorage";

      if (tid) {
        editor.disabled();
        const template = await getTemplate(tid);
        if (template) {
          // you should try catch here to avoid parse error
          theme = JSON.parse(template.content) as T;
          value = template["default"];

          if (rid) {
            const resume = await getResume(rid);
            if (resume) {
              const { resumeText, customTheme } = resume;
              theme = getDeriveTheme(JSON.parse(customTheme) as Theme, theme);
              value = resumeText;
            }
          }
        }
        setPreviewLoading(false);
        editor.enable();
      } else {
        setPreviewLoading(false);
      }
      return {
        theme,
        value,
      };
    },
    [tid, rid]
  );

  function setupTheme(theme: Theme) {
    if (theme) {
      setColors(theme.colors || []);
      // TODO
      setTheme(theme);
    }
  }

  useEffect(() => {
    if (!editor) return;

    requestThemeAndValue(editor).then(({ theme, value }) => {
      setupTheme(theme);
      editor.setValue(value);
    });

    return createWorker(() => setValue(editor.getHTML()));
  }, [editor, requestThemeAndValue]);

  return (
    <main
      className="flex items-stretch"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <aside className="basis-[535px]">
        <div className="rounded-none" ref={context} />
      </aside>

      <aside className="grow flex flex-col">
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

        <div className="grow flex justify-center bg-gray-200">
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
