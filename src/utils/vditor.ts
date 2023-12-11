import Vditor from "vditor";
import "vditor/dist/index.css";

type Callback = (vditor: Vditor) => void;
type VditorInstance = Vditor;

const toolbarList = [
  "emoji",
  "headings",
  "bold",
  "italic",
  "strike",
  "|",
  "line",
  "list",
  "ordered-list",
  "check",
  "outdent",
  "indent",
  "code",
  "inline-code",
  "insert-after",
  "insert-before",
  "undo",
  "redo",
  "upload",
  "link",
  "both",
  "br",
];

function createVditor(element: string, callback: Callback) {
  const vditor = new Vditor(element, {
    minHeight: 400,
    height: "100%",
    tab: "  ",
    theme: "classic",
    mode: "ir",
    placeholder: "请填写您的简历",

    toolbar: toolbarList,
    resize: {
      enable: false,
    },

    focus: () => {
      //
    },
    blur: () => {
      //
    },

    after: () => {
      callback(vditor);
    },
  });
}

export type { VditorInstance };
export { createVditor };
