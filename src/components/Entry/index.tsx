import React from "react";

type P = {
  leftText: string;
  rightText: string;
};

const Entry: React.FC<P> = ({ leftText, rightText }) => {
  return (
    <div className="flex justify-between text-white">
      <span>{leftText}</span>
      <span>{rightText}</span>
    </div>
  );
};

export default Entry;
