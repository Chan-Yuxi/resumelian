import type { ColorPickerProps } from "antd";

import React, { Dispatch } from "react";
import { useTranslation } from "react-i18next";
import { Space, Switch, Button, Select, ColorPicker } from "antd";
import { CheckCircleOutlined, FilePptOutlined } from "@ant-design/icons";

import Label from "@/components/Label";
import { Theme } from "@/type/definition";
import { toggleAvatar, updateColors, updateFamily } from "./reducer";

type OCC = ColorPickerProps["onChange"];
type P = {
  onExport: () => void;
  exportLoading: boolean;
  onSave: () => void;
  saveLoading: boolean;
  onChatGPTButtonClick: () => void;
  theme: Theme;
  dispatch: Dispatch<{ type: string; payload: unknown }>;
};

const families = [
  { value: `'Times New Roman', Times, serif`, label: "Times New Roman" },
  { value: `Arial, Helvetica, sans-serif`, label: "Arial" },
  { value: `Arial`, label: "Default" },
];

const ToolkitBar: React.FC<P> = ({
  onExport,
  exportLoading,
  onSave,
  saveLoading,
  onChatGPTButtonClick,
  theme,
  dispatch,
}) => {
  const { t } = useTranslation();

  const { colors, family, enableAvatar } = theme;

  const generateColorChangeHandler =
    (index: number): OCC =>
    (color) => {
      const newColors = [...colors];
      newColors[index] = color.toHexString();
      dispatch(updateColors(newColors));
    };

  return (
    <div className="shrink-0 flex items-center px-[35px] h-[37px] border-x-0 border-y border-solid border-[#d1d5da] bg-[#f6f8fa] shadow">
      <Space size={32}>
        <Label text={t("resumeModification:Generate avatar")}>
          <Switch
            size="small"
            value={enableAvatar}
            onChange={() => dispatch(toggleAvatar())}
          />
        </Label>
        <Label text={t("resumeModification:Theme color")}>
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
        <Label text={t("resumeModification:label font")}>
          <Select
            size="small"
            style={{ width: "175px" }}
            options={families}
            defaultValue="inherit"
            value={family}
            onChange={(value) => dispatch(updateFamily(value))}
          />
        </Label>
      </Space>

      <div className="ms-auto">
        <Button
          size="small"
          className="shadow-lg me-2 border-0 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          style={{ width: "102px" }}
          onClick={onChatGPTButtonClick}
        >
          {t("resumeModification:Using ChatGPT")}
        </Button>
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
          {t("resumeModification:button preserve")}
        </Button>
        <Button
          size="small"
          className="shadow-lg"
          icon={<FilePptOutlined />}
          style={{ width: "102px" }}
          type="primary"
          onClick={onExport}
          loading={exportLoading}
        >
          {t("resumeModification:button export")}
        </Button>
      </div>
    </div>
  );
};

export default ToolkitBar;
