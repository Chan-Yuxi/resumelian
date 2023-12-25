import type { Dispatch } from "react";

import { useRef } from "react";
import { useEventListener } from "@/hooks";
import { updateAvatarPosition } from "./reducer";

type P = {
  url: string;
  enable: boolean;
  position: { x: number; y: number };
  dispatch: Dispatch<{ type: string; payload: unknown }>;
};

const Avatar: React.FC<P> = ({ url, enable, position, dispatch }) => {
  const avatar = useRef<HTMLImageElement>(null);

  let startMoving = false;

  let startX = 0;
  let startY = 0;
  let limitX = 0;
  let limitY = 0;

  useEventListener(avatar.current, "mousedown", (event) => {
    const target = avatar.current!;
    const e = event as MouseEvent;
    e.preventDefault();

    startX = e.clientX - target.offsetLeft;
    startY = e.clientY -  target.offsetTop;
    
    limitX = target.offsetParent!.clientWidth  -  target.offsetWidth;
    limitY = target.offsetParent!.clientHeight - target.offsetHeight;
    startMoving = true;
  });

  useEventListener(avatar.current, "mousemove", (event) => {
    if (startMoving) {
      const e = event as MouseEvent;
      e.preventDefault();

      let x = e.clientX - startX;
      let y = e.clientY - startY;

      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > limitX) x = limitX;
      if (y > limitY) y = limitY;

      dispatch(updateAvatarPosition({ x, y }));
    }
  });

  function moveDone() {
    startMoving = false;
  }

  useEventListener(avatar.current,  "mouseup", moveDone);
  useEventListener(avatar.current, "mouseout", moveDone);

  return (
    <img
      id="resume-avatar"
      style={{
        display: enable ? "block" : "none",
        left: `${position.x}px`,
        top : `${position.y}px`,
      }}
      className={`absolute w-[115px] border border-2 border-solid border-white bg-slate-500 shadow`}
      src={url}
      ref={avatar}
    />
  );
};

export default Avatar;
