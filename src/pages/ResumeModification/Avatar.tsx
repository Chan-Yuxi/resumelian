import { useRef } from "react";
import { useEventListener } from "@/hooks";

const Avatar = () => {
  const avatar = useRef<HTMLDivElement>(null);

  let startX = 0;
  let startY = 0;
  useEventListener(avatar.current, "mousedown", (event) => {
    const target = avatar.current!;
    const e = event as MouseEvent;
    e.preventDefault();

    startX = e.clientX - target.offsetLeft;
    startY = e.clientY - target.offsetLeft;
  });

  useEventListener(avatar.current, "mousemove", (event) => {
    const target = avatar.current!;
    const e = event as MouseEvent;
    e.preventDefault();

    const newX = e.clientX - startX;
    const newY = e.clientX - startY;

    target.style.top = `${newX}px`;
    target.style.left = `${newY}px`;
  });

  return (
    <div
      ref={avatar}
      className="absolute w-[120px] h-[150px] bg-slate-500 shadow"
    ></div>
  );
};

export default Avatar;
