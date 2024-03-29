import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Input, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { chatGPT } from "@/api/chatGPT";

const industries = ["金融", "计算机", "生物", "工程", "建筑", "教育", "研究"];
const modules = ["总结", "经历", "项目", "技能"];
const industryItems = industries.map((industry) => ({
  label: industry,
  value: industry,
}));
const moduleItems = modules.map((module) => ({
  label: module,
  value: module,
}));

type P = {
  open: boolean;
  currentLng: string;
  onClose: () => void;
  onAIResponse: (dialogue: string, type: string) => void;
};

const ChatGPTPanel: React.FC<P> = ({
  open,
  currentLng,
  onClose,
  onAIResponse,
}) => {
  const { t } = useTranslation();
  const [dialogues, setDialogues] = useState<string[]>([]);

  const [content, setContent] = useState("");
  const [industry, setIndustry] = useState();
  const [module, setModule] = useState();

  const [loading, setLoading] = useState(false);
  function requestAI() {
    if (industry === undefined || module === undefined) {
      return;
    }

    setLoading(true);
    chatGPT(content, industry, module, currentLng)
      .then((response) => {
        if (response) {
          setDialogues([...dialogues, response]);
          onAIResponse(response, "");
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    open && (
      <div className="absolute inset-x-0 bottom-0 h-[400px] bg-slate-500/50 p-6 animate-slideIn">
        <div className="h-full overflow-scroll sm:overflow-[unset] flex flex-col sm:flex-row gap-4">
          <div className="grow bg-slate-600 shadow p-4 overflow-[unset] sm:overflow-scroll order-2 sm:order-1">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <h1 className="text-white text-xl font-bold">
                  {t("resumeModification:AI Answer")}
                </h1>
                <Button ghost onClick={onClose} icon={<CloseOutlined />} />
              </div>

              {dialogues.length > 0 ? (
                dialogues.map((dialogue, index) => {
                  return (
                    <div key={index}>
                      <p className="font-bold text-white mb-1">ChatGPT: </p>
                      <p className="bg-green-700 hover:bg-green-600 hover:cursor-pointer transition-all px-4 py-2 rounded text-white max-w-2/3 font-bold animate-fadeIn">
                        {dialogue}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="text-center my-28 text-slate-500">
                  暂无回答记录
                </div>
              )}
            </div>
          </div>

          <div className="basis-[300px] shrink-0 p-4 flex flex-col gap-4 item-stretch shadow bg-slate-600 order-1 sm:order-2">
            <h1 className="text-white text-xl font-bold">
              {t("resumeModification:Generate resume using ChatGPT")}
            </h1>
            <Select
              className="rounded-none"
              placeholder={t("resumeModification:Please select your industry")}
              options={industryItems}
              value={industry}
              onChange={(value) => setIndustry(value)}
            />
            <Select
              className="rounded-none"
              placeholder={t("resumeModification:Please select a module")}
              options={moduleItems}
              value={module}
              onChange={(value) => setModule(value)}
            />
            <Input.TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入附加描述信息"
            />

            <Button
              className="mt-auto"
              danger
              ghost
              disabled={dialogues.length === 0}
              onClick={() => setDialogues([])}
            >
              {t("resumeModification:Clear Records")}
            </Button>
            <Button ghost onClick={requestAI} loading={loading}>
              {t("resumeModification:Confirm generation")}
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ChatGPTPanel;
