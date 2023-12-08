import type { ColorPickerProps } from "antd";

import React from "react";
import { useTranslation } from "react-i18next";
import { Space, Switch, Button, Select, ColorPicker } from "antd";

import Label from "@/components/Label";

type C = ColorPickerProps["onChangeComplete"];
type P = {
  enableAvator: boolean;
  onEnableAvatarChange: (enable: boolean) => void;
  pryColor: string;
  subColor: string;
  thrColor: string;
  onPryColorChange: (color: string) => void;
  onSubColorChange: (color: string) => void;
  onThrColorChange: (color: string) => void;
  onExport: () => void;
};

const Toolkit: React.FC<P> = (props) => {
  const { t } = useTranslation();

  const {
    enableAvator,
    onEnableAvatarChange,
    pryColor,
    subColor,
    thrColor,
    onPryColorChange,
    onSubColorChange,
    onThrColorChange,
    onExport,
  } = props;

  const setPryColor: C = (color) => onPryColorChange(color.toHexString());
  const setSubColor: C = (color) => onSubColorChange(color.toHexString());
  const setThrColor: C = (color) => onThrColorChange(color.toHexString());

  return (
    <div className="flex px-[35px] items-center bg-slate-100 h-[36px] border-0 border-b border-solid border-slate-300 shadow">
      <Space size={32}>
        <Label text={t("rm.generate_avatar")}>
          <Switch value={enableAvator} onChange={onEnableAvatarChange} />
        </Label>
        <Label text={t("rm.theme")}>
          <Space size={6}>
            <ColorPicker
              value={pryColor}
              format="hex"
              size="small"
              onChange={setPryColor}
            />
            <ColorPicker
              value={subColor}
              format="hex"
              size="small"
              onChange={setSubColor}
            />
            <ColorPicker
              value={thrColor}
              format="hex"
              size="small"
              onChange={setThrColor}
            />
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
