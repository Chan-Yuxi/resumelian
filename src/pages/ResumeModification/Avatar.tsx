import type { MutableRefObject, FunctionComponent } from "react";
import type { Nullable } from "@/@type/toolkit";

import { useRef } from "react";
import { useEventListener } from "@/hooks";

type P = {
  picture: string;
};

const Avatar: FunctionComponent<P> = ({ picture }) => {
  const avatar: MutableRefObject<Nullable<HTMLImageElement>> = useRef(null);

  const draggable = (event: Event) => {
    const { offsetX, offsetY } = event as MouseEvent;

    const target = event.target! as HTMLElement;
    const parent = target.offsetParent! as HTMLElement;

    function handleMouseMove(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const pointX = event.clientX - offsetX;
      const pointY = event.clientY - offsetY;

      if (
        pointX >= parent.offsetLeft &&
        pointX <= parent.offsetLeft + parent.offsetWidth
      ) {
        target.style.left = `${pointX}px`;
      }
      if (pointY > 0) {
        target.style.top = `${pointY}px`;
      }
    }

    function done() {
      target.removeEventListener("mousemove", handleMouseMove);
      target.removeEventListener("mouseup", done);
    }
    target.addEventListener("mousemove", handleMouseMove);
  };

  useEventListener(avatar.current as HTMLElement, "mousedown", draggable);

  return (
    <div className="absolute">
      <img
        src={picture}
        ref={avatar}
        className="bg-red"
        style={{ width: "100px", height: "100px" }}
      ></img>
    </div>
  );
};

export default Avatar;
