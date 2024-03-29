import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

type Language = "zh" | "en";
type P = {
  loading: boolean;
  onChange: (lng: Language) => void;
};

const active = "bg-blue-500 text-white";
const inactive = "bg-slate-100 text-black";

const LanguageToggle: React.FC<P> = ({ loading, onChange }) => {
  const [lng, setLng] = useState<Language>("zh");

  function toggleLng(lng: Language) {
    if (loading) {
      return;
    }
    setLng(lng);
    onChange(lng);
  }

  return (
    <div className="absolute inset-x-0 top-[5px] sm:top-10 sm:top-[37px]">
      <div className="flex justify-end sm:justify-start px-6 sm:px-[35px] py-4">
        <div className="cursor-pointer">
          <span
            onClick={() => toggleLng("zh")}
            className={(lng === "zh" ? active : inactive) + " px-2 py-1 shadow"}
          >
            {lng === "zh" && loading ? (
              <LoadingOutlined className="me-2" />
            ) : null}
            <span>中文</span>
          </span>
          <span
            onClick={() => toggleLng("en")}
            className={(lng === "en" ? active : inactive) + " px-2 py-1 shadow"}
          >
            {lng === "en" && loading ? (
              <LoadingOutlined className="me-2" />
            ) : null}
            <span>English</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LanguageToggle;
