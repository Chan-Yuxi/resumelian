import React from "react";

type P = {
  text: string;
};

const Label: React.FC<React.PropsWithChildren<P>> = ({ text, children }) => {
  return (
    <div className="flex items-center">
      <span className="px-3 py-[2px] bg-white rounded shadow me-2">{text}</span>
      <div>{children}</div>
    </div>
  );
};

export default Label;
