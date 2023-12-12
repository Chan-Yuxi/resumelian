import React from "react";

type P = {
  style: string;
};

const StyleInjection: React.FC<P> = ({ style }) => (
  <style id="style-injection" lang="scss">
    {style}
  </style>
);

export default StyleInjection;
