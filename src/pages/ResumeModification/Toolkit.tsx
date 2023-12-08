import type { ColorPickerProps } from "antd";

import React from "react";
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
        <Label text="生成头像">
          <Switch value={enableAvator} onChange={onEnableAvatarChange} />
        </Label>
        <Label text="主题色">
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
        <Label text="字体">
          <Select size="small"></Select>
        </Label>
      </Space>
      <div className="ms-auto">
        <Button
          className="shadow-lg w-[93px]"
          type="primary"
          onClick={onExport}
          size="small"
        >
          导出 PDF
        </Button>
      </div>
    </div>
  );
};

export default Toolkit;
