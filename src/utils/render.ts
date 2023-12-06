/**
 * @author Chan
 * @date 2023/12/06
 */

const LEFT_START = "<p>::: left</p>";
const RIGHT_START = "<p>::: right</p>";
const END = "<p>:::</p>";

/**
 * 判断一个元素是否是调整布局的标志
 */
function isLRContainerStartFlag(child: Element) {
  return child.outerHTML === LEFT_START;
}

/**
 * 添加元素
 */
function append(
  parent: Element | DocumentFragment,
  child: Element,
  clone = false
) {
  parent.appendChild(clone ? child.cloneNode(true) : child);
}

/**
 * 解析符号是否合法，并返回下标
 */
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

  return domian.re === -1 ? false : domian;
}

function renderTo(id: string, htmlString: string) {
  const element = document.getElementById(id)!;
  element.innerHTML = "";
  element.appendChild(mapHtmlString(htmlString));
}

function mapHtmlString(htmlString: string) {
  const temp = document.createElement("div");
  temp.innerHTML = htmlString;
  const children = temp.children;

  let cursor = 0;
  let child;

  const mapped = document.createDocumentFragment();
  while (cursor < children.length) {
    child = children[cursor];

    if (isLRContainerStartFlag(child)) {
      const domain = resolveLRContainer(children, cursor);
      if (domain) {
        const lrc = createLRContainer();
        const l = createLeftDiv();
        const r = createRightDiv();

        append(lrc, l);

        const { ls, le, rs, re } = domain;
        for (let i = ls + 1; i <= re; i++) {
          if (i > ls && i < le) {
            append(l, children[i], true);
          }
          if (i > le && i < rs) {
            append(lrc, children[i], true);
          }
          if (i > rs && i < re) {
            append(r, children[i], true);
          }
        }

        lrc.appendChild(r);
        mapped.appendChild(lrc);
        cursor = re;
      } else {
        append(mapped, child, true);
      }
    } else {
      append(mapped, child, true);
    }
    cursor++;
  }
  return mapped;
}

function createLRContainer() {
  const lr_container_div = document.createElement("div");
  lr_container_div.classList.add("lr_container");
  return lr_container_div;
}

function createLeftDiv() {
  const l = document.createElement("div");
  l.classList.add("left");
  return l;
}

function createRightDiv() {
  const r = document.createElement("div");
  r.classList.add("right");
  return r;
}

export { renderTo };
