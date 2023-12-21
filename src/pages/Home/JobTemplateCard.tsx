import React from "react";
import { Button } from "antd";

type P = {
  picture: string;
  text: string;
};

const JobTemplateCard: React.FC<P> = ({ picture, text }) => {
  return (
    <figure
      className="relative w-[180px] aspect-[3/4] rounded-xl bg-center bg-[length:110%] hover:bg-[length:125%] transition-all duration-300 shadow-lg"
      style={{ backgroundImage: `url(${picture})` }}
    >
      <figcaption className="absolute w-full bottom-0 p-4 text-center">
        <Button
          type="primary"
          className="rounded-full border-0 text-white px-12"
        >
          {text}
        </Button>
      </figcaption>
    </figure>
  );
};

export default JobTemplateCard;
