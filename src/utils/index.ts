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

export function generateCustomStyle(colors: string[], family: string) {
  return `
    #preview {
        ${colors
          .map((color, i) => "--color-" + (i + 1).toString() + ": " + color)
          .join("; \n\t")};
        font-family: ${family};
    }
    #preview > * {
      font-family: inherit;
    }
  `;
}
