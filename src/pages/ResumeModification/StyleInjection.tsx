import React from "react";

type P = {
  styles: string;
};

const StyleInjection: React.FC<P> = ({ styles }) => {
  return (
    <div id="style-injection">
      <style>{styles}</style>
    </div>
  );
};

export default StyleInjection;
