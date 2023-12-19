import type { ColorPickerProps } from "antd";

import React from "react";
import { useTranslation } from "react-i18next";
import { Space, Switch, Button, Select, ColorPicker } from "antd";
import { CheckCircleOutlined, FilePptOutlined } from "@ant-design/icons";

import Label from "@/components/Label";

type OCC = ColorPickerProps["onChange"];
type P = {
  enableAvatar: boolean;
  colors: string[];
  family: string;
  onEnableAvatarChange: (enable: boolean) => void;
  onColorsChange: (colors: string[]) => void;
  onFamilyChange: (family: string) => void;
  onSave: () => void;
  saveLoading: boolean;
  onExport: () => void;
};

const families = [
  { value: `'Times New Roman', Times, serif`, label: "Times New Roman" },
  { value: `Arial, Helvetica, sans-serif`, label: "Arial" },
  { value: `Arial`, label: "Default" },
];

const ToolkitBar: React.FC<P> = (props) => {
  const { t } = useTranslation();

  const {
    enableAvatar,
    colors,
    family,
    onEnableAvatarChange,
    onColorsChange,
    onFamilyChange,
    onSave,
    saveLoading,
    onExport,
  } = props;

  const generateColorChangeHandler =
    (index: number): OCC =>
    (color) => {
      const newColors = [...colors];
      newColors[index] = color.toHexString();
      onColorsChange(newColors);
    };

  return (
    <div className="flex items-center px-[35px] h-[37px] border-x-0 border-y border-solid border-[#d1d5da] bg-[#f6f8fa] shadow">
      <Space size={32}>
        <Label text={t("rm.generate_avatar")}>
          <Switch
            size="small"
            value={enableAvatar}
            onChange={onEnableAvatarChange}
          />
        </Label>
        <Label text={t("rm.theme")}>
          <Space size={6}>
            {colors.map((color, i) => (
              <ColorPicker
                size="small"
                key={i}
                value={color}
                format="hex"
                onChange={generateColorChangeHandler(i)}
              />
            ))}
          </Space>
        </Label>
        <Label text={t("rm.font")}>
          <Select
            size="small"
            style={{ width: "175px" }}
            options={families}
            defaultValue="inherit"
            value={family}
            onChange={onFamilyChange}
          />
        </Label>
      </Space>

      <div className="ms-auto">
        {/* <Button
          size="small"
          className="shadow-lg me-2"
          style={{ width: "102px" }}
          type="primary"
          ghost
        >
          {t("rm.help")}
        </Button> */}
        <Button
          size="small"
          className="shadow-lg me-2"
          icon={<CheckCircleOutlined />}
          style={{ width: "102px" }}
          type="primary"
          ghost
          onClick={onSave}
          loading={saveLoading}
        >
          {t("rm.save")}
        </Button>
        <Button
          size="small"
          className="shadow-lg"
          icon={<FilePptOutlined />}
          style={{ width: "102px" }}
          type="primary"
          onClick={onExport}
        >
          {t("rm.export_PDF")}
        </Button>
      </div>
    </div>
  );
};

export default ToolkitBar;
