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

export function deriveChildren(html: string) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.children;
}
