import React, { useRef } from "react";
import { useEventListener } from "@/hooks";

import defaultAvatar from "@/assets/image/default_avatar.jpg";

type P = {
  enable: boolean;
};

const Avatar: React.FC<P> = ({ enable }) => {
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
    startY = e.clientY - target.offsetTop;
    limitX = target.offsetParent!.clientWidth - target.offsetWidth;
    limitY = target.offsetParent!.clientHeight - target.offsetHeight;
    startMoving = true;
  });

  useEventListener(avatar.current, "mousemove", (event) => {
    if (startMoving) {
      const target = avatar.current!;
      const e = event as MouseEvent;
      e.preventDefault();

      let newX = e.clientX - startX;
      let newY = e.clientY - startY;

      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX > limitX) newX = limitX;
      if (newY > limitY) newY = limitY;

      target.style.left = `${newX}px`;
      target.style.top = `${newY}px`;
    }
  });

  useEventListener(avatar.current, "mouseup", () => {
    startMoving = false;
  });

  useEventListener(avatar.current, "mouseout", () => {
    startMoving = false;
  });

  return (
    <img
      style={{ display: enable ? "block" : "none" }}
      src={defaultAvatar}
      ref={avatar}
      id="resume-avatar"
      className="absolute w-[115px] border border-2 border-solid border-white bg-slate-500 shadow"
    ></img>
  );
};

export default Avatar;
