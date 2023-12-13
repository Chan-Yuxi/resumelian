import React from "react";

type P = {
  // ...
};

const Guard: React.FC<React.PropsWithChildren<P>> = ({ children }) => {
  return children;
};

export default Guard;
