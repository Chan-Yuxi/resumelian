import React from "react";

type P = {
  text: string;
  className?: string;
};

const Label: React.FC<React.PropsWithChildren<P>> = ({
  text,
  className,
  children,
}) => {
  return (
    <label className="flex items-center">
      <span
        className={
          (className || "") +
          " px-4 me-2 bg-white border border-1 border-solid border-gray-300"
        }
      >
        {text}
      </span>
      <div>{children}</div>
    </label>
  );
};

export default Label;
