import type { ColorPickerProps } from "antd";

import React from "react";
import { useTranslation } from "react-i18next";
import { Space, Switch, Button, Select, ColorPicker } from "antd";

import Label from "@/components/Label";

type OCC = ColorPickerProps["onChange"];
type P = {
  enableAvator: boolean;
  onEnableAvatarChange: (enable: boolean) => void;
  colors: string[];
  onColorsChange: (colors: string[]) => void;
  onExport: () => void;
};

// enableAvator
// styles
// customStyles
// colors
// fontFamily
// fontSize
// space

const Toolkit: React.FC<P> = (props) => {
  const { t } = useTranslation();

  const {
    enableAvator,
    onEnableAvatarChange,
    colors,
    onColorsChange,
    onExport,
  } = props;

  const generateColorChangeHanlder =
    (index: number): OCC =>
    (color) => {
      const newColors = [...colors];
      newColors[index] = color.toHexString();
      onColorsChange(newColors);
    };

  return (
    <div className="flex px-[35px] items-center bg-slate-100 h-[36px] border-0 border-b border-solid border-slate-300 shadow">
      <Space size={32}>
        <Label text={t("rm.generate_avatar")}>
          <Switch value={enableAvator} onChange={onEnableAvatarChange} />
        </Label>
        <Label text={t("rm.theme")}>
          <Space size={6}>
            {colors.map((color, i) => (
              <ColorPicker
                key={i}
                value={color}
                format="hex"
                size="small"
                onChange={generateColorChangeHanlder(i)}
              />
            ))}
          </Space>
        </Label>
        <Label text={t("rm.font")}>
          <Select size="small"></Select>
        </Label>
      </Space>

      <div className="ms-auto">
        <Button
          className="shadow-lg w-[93px] me-2"
          type="primary"
          size="small"
          ghost
        >
          {t("rm.help")}
        </Button>
        <Button
          className="shadow-lg w-[93px]"
          type="primary"
          onClick={onExport}
          size="small"
        >
          {t("rm.export_PDF")}
        </Button>
      </div>
    </div>
  );
};

export default Toolkit;
