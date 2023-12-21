import React from "react";

const Logo: React.FC<{ className: string }> = ({ className }) => {
  return (
    <img
      className={className.concat(" me-4 aspect-square")}
      style={{ width: "40px" }}
      src="/logo.png"
      alt="logo"
    />
  );
};

export default Logo;
