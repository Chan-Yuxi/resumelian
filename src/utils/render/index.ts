import type { Parser } from "./resolver";

import { createElement, deriveChildren, getById } from "@/utils";
import { Resolver } from "./resolver";

const LEFT_START = "<p>::: left</p>";
const RIGHT_START = "<p>::: right</p>";
const END = "<p>:::</p>";

export function renderTo(id: string, htmlString: string) {
  const preview = getById(id);

  if (htmlString && preview) {
    preview.innerHTML = "";
    const resolver = new Resolver(deriveChildren(htmlString));
    resolver.register(LRCParser);

    const pageW = preview.clientWidth;
    const pageH = Math.floor(pageW * Math.sqrt(2));

    const newPage = () => {
      const pageWrapper = createElement("div", ["page-wrapper"], {width: `${pageW}px`, height: `${pageH}px`});
      const page = createElement("div", ["page"]);

      pageWrapper.appendChild(page);
      preview.appendChild(pageWrapper);
      return page;
    };

    let page = newPage();
    let node: Element | null;

    while ((node = resolver.next()) !== null) {
      if (page.offsetHeight > pageH - 20 * 2) {
        const adjust = page.lastChild!;
        page = newPage();
        page.appendChild(adjust);
      } else {
        page.appendChild(node.cloneNode(true));
      }
    }
  }
}

function resolveLRContainer(children: HTMLCollection, index: number) {
  const domian = {
    ls: index,
    le: -1,
    rs: -1,
    re: -1,
  };

  for (let i = index + 1; i < children.length; i++) {
    const child = children[i];
    if (child.outerHTML === END) {
      if (domian.le === -1) {
        domian.le = i;
      } else {
        if (domian.re === -1 && domian.rs !== -1) {
          domian.re = i;
          break;
        }
      }
    }
    if (child.outerHTML === RIGHT_START) {
      if (domian.rs === -1) {
        domian.rs = i;
      }
    }
  }

  if (domian.re === -1) {
    return null;
  } else {
    return domian;
  }
}

const LRCParser: Parser = (queue, child, index) => {
  let result = null;
  let span = 0;
  if (child.outerHTML === LEFT_START) {
    const domain = resolveLRContainer(queue, index);

    if (domain) {
      const c = createElement("div", ["lrc"]);
      const l = createElement("div", ["l"]);
      const r = createElement("div", ["r"]);
      c.appendChild(l);

      const { ls, le, rs, re } = domain;

      for (let i = ls + 1; i <= re; i++) {
        if (i > ls && i < le) l.appendChild(queue[i].cloneNode(true));
        if (i > le && i < rs) c.appendChild(queue[i].cloneNode(true));
        if (i > rs && i < re) r.appendChild(queue[i].cloneNode(true));
      }
      c.appendChild(r);
      result = c;
      span = re - ls + 1;
    }
  }
  return [result, span];
};
