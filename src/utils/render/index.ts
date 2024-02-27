import type { Parser } from "./resolver";

import { createElement, deriveChildren } from "@/utils";
import { Resolver } from "./resolver";

const LEFT_START = "<p>::: left</p>";
const RIGHT_START = "<p>::: right</p>";
const END = "<p>:::</p>";

/**
 * render HTML strings to the screen
 *
 * @param preview container
 * @param htmlString html string
 */
export function render(preview: HTMLElement, htmlString = "") {
  if (preview) {
    const resumeAvatar = document.getElementById("resume-avatar");
    preview.innerHTML = "";
    // 新建解析器
    const resolver = new Resolver(deriveChildren(htmlString));
    // 注册 LeftRightContent 解析方法
    resolver.register(LRCParser);
    // ...
    // ...
    // resolver.register(OtherParser);
    // ...

    // 获取 preview 宽度作为 page 宽度
    const pageW = preview.clientWidth;
    // 计算 page 的高度，使 page 的宽高比等于 A4 纸的宽高比
    const pageH = Math.floor(pageW * Math.sqrt(2));

    const newPage = () => {
      const pageWrapper = createElement("div", ["page-wrapper"], {
        width: `${pageW}px`,
        height: `${pageH}px`,
      });
      const page = createElement("div", ["page"]);

      pageWrapper.appendChild(page);
      preview.appendChild(pageWrapper);
      return page;
    };

    let page = newPage();
    let node: Element | null;
    // let finalReasonableHeight: number;

    // 移动头像到该节点
    resumeAvatar && page.appendChild(resumeAvatar);

    /**
     * 当一个元素大于
     */

    while ((node = resolver.next()) !== null) {
      // console.log(node);
      // finalReasonableHeight = page.offsetHeight;
      // console.log(finalReasonableHeight);
      page.appendChild(node.cloneNode(true));
      // 如果该 page 的高度超出了标准 page 高度，新建 page, 并将上一个尾元素移入新 page
      if (page.offsetHeight > pageH) {
        const adjust = page.lastChild!;

        // 拆分出来
        // console.log(page.offsetHeight);
        // console.log(adjust);
        // 递归子元素，找到

        // findLastAdaptedElement(finalReasonableHeight, adjust, pageH);

        // const [upperPart, lowerPart] = findLastAdaptedElement(finalReasonableHeight, adjust);

        page = newPage();
        page.appendChild(adjust);
      }
      // else
    }
  }
}

/**
 *
 * <ul>
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 * </ul>
 *
 *
 * 
 *
 *
 * // final ==>
 *
 * <ul>
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 * </ul>
 *
 * <ul>
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 *    <li />
 * </ul>
 *
 *
 *
 *
 *
 *
 *
 *
 */

// function findLastAdaptedElement(
//   startingHeight: number,
//   adjusted: ChildNode,
//   pageH: number
// ): [ChildNode, ChildNode] {
//   let currentHeight = startingHeight;

//   const children = adjusted.childNodes;
//   const upperPart = adjusted.cloneNode() as ChildNode;
//   for (const child of children) {
//     if (child.nodeName !== "#text") {
//       // 如果还有子元素，继续拆分
//       // 如果没有子元素

//       const offsetHeight = getOffsetHeight(child);
//       if (currentHeight + offsetHeight <= pageH) {
//         upperPart.appendChild(child);
//         currentHeight += startingHeight;
//       } else {
//         if ((child as HTMLElement).children.length) {
//           const [upper, lower] = findLastAdaptedElement(
//             currentHeight,
//             child,
//             pageH
//           );
//           upperPart.appendChild(upper);
//         }
//       }

      
//       // console.log(child);
//       // console.log((child as HTMLElement).offsetHeight);
//       // findLastAdaptedElement(startingHeight, child);
//     }
//     console.log('upperPart', upperPart);
//   }

//   return [upperPart, adjusted];
// }

// function getOffsetHeight(element: unknown) {
//   return (element as HTMLElement).offsetHeight;
// }

function resolveLRContainer(children: HTMLCollection, index: number) {
  const domain = {
    ls: index,
    le: -1,
    rs: -1,
    re: -1,
  };

  for (let i = index + 1; i < children.length; i++) {
    const child = children[i];
    if (child.outerHTML === END) {
      if (domain.le === -1) {
        domain.le = i;
      } else {
        if (domain.re === -1 && domain.rs !== -1) {
          domain.re = i;
          break;
        }
      }
    }
    if (child.outerHTML === RIGHT_START) {
      if (domain.rs === -1) {
        domain.rs = i;
      }
    }
  }

  if (domain.re === -1) {
    return null;
  } else {
    return domain;
  }
}

/**
 * 将
 * <p>::: left</p>
 * <p>Text1</p>
 * <p>:::</p>
 * <p>Text2</p>
 * <p>::: right</p>
 * <p>Text3</p>
 * <p>:::</p>
 * 转
 * <div class="lrc">
 *    <div class="l">
 *      <p>Text1</p>
 *    </div>
 *    <p>Text2</p>
 *    <div class="l">
 *      <p>Text3</p>
 *    </div>
 * </div>
 *
 * @param queue
 * @param child
 * @param index
 * @returns
 */
const LRCParser: Parser = (queue, child, index) => {
  let result = null;
  let span = 0;
  if (child.outerHTML === LEFT_START) {
    // 先遍历，确定存在有效的转化区域
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
