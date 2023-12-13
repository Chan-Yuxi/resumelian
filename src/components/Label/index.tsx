import React from "react";

type P = {
  text: string;
};

const Label: React.FC<React.PropsWithChildren<P>> = ({ text, children }) => {
  return (
    <label className="flex items-center">
      <span className="px-4 py-1 me-2 bg-white border border-1 border-solid border-gray-300">
        {text}
      </span>
      <div>{children}</div>
    </label>
  );
};

export default Label;
