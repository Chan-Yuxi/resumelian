import type { MutableRefObject, FunctionComponent } from "react";
import type { Nullable } from "@/@type/toolkit";

import { useRef } from "react";
import { useEventListener } from "@/hooks";

type P = {
  picture: string;
};

const Avatar: FunctionComponent<P> = ({ picture }) => {
  const avatar: MutableRefObject<Nullable<HTMLImageElement>> = useRef(null);

  function draggable(event: Event) {
    const { offsetX, offsetY } = event as MouseEvent;

    const target = event.target as HTMLElement;
    const parent = target.offsetParent as HTMLElement;

    const { offsetWidth, offsetHeight } = target;
    const { offsetWidth: parentOffsetWidth, offsetHeight: parentOffsetHeight } =
      parent;

    const xe = parentOffsetWidth - offsetWidth;
    const ye = parentOffsetHeight - offsetHeight;

    target.onmousemove = function (event) {
      const { clientX, clientY } = event;

      let x = clientX - offsetX;
      let y = clientY - offsetY;

      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > xe) x = xe;
      if (y > ye) y = ye;

      target.style.left = `${x}px`;
      target.style.top = `${y}px`;
    };

    target.onmouseup = function () {
      target.onmousemove = null;
      target.onmouseup = null;
    };
  }

  useEventListener(avatar.current as HTMLElement, "mousedown", draggable);

  return (
    <div className="absolute">
      <img src={picture} ref={avatar} className=""></img>
    </div>
  );
};

export default Avatar;
