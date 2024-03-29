export function createElement(
  tag: string,
  classList?: string[],
  styles?: Record<string, string>
) {
  const element = document.createElement(tag);
  if (classList) {
    element.classList.add(...classList);
  }
  if (styles) {
    Object.assign(element.style, styles);
  }
  return element;
}

export function getById(id: string) {
  return document.getElementById(id);
}

/**
 * 将 HTML 字符串变成 DOM 树，并获取其集合
 * @param html
 * @returns
 */
export function deriveChildren(html: string) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.children;
}

export function generateCustomStyle(
  colors: string[],
  family: string,
  gutter = "1rem"
) {
  return `
    #preview {
        font-family: ${family};
        --gutter: ${gutter};
        ${colors
          .map((color, i) => "--color-" + (i + 1).toString() + ": " + color)
          .join("; \n\t")};
    }
  `;
}

/**
 * This will replace the setInterval function to make the update frequency of the screen smoother.
 *
 * @param task a task to run at each frame
 * @returns cancelFunction
 */
export function createWorker(task: () => void) {
  let cancel = false;
  function run() {
    task();
    if (!cancel) requestAnimationFrame(run);
  }
  requestAnimationFrame(run);
  return () => {
    cancel = true;
  };
}

export function isEmpty(str: string | undefined | null): str is undefined {
  return str === null || str === undefined || str === "" || str === "\n";
}

export function combineClassNames(...classNames: (string | undefined)[]) {
  return classNames.reduce((prev, className, index) => {
    if (className) {
      return index === 0 ? className : prev! + " " + className;
    } else {
      return prev;
    }
  }, "");
}
