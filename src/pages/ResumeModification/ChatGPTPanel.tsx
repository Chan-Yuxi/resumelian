import { Button, Select } from "antd";

const industries = ["金融", "计算机", "生物", "工程", "建筑", "教育", "研究"];
const industryItems = industries.map((industry) => ({
  label: industry,
  value: industry,
}));

type P = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ChatGPTPanel: React.FC<P> = ({ open, setOpen }) => {
  function closePanel() {
    setOpen(false);
  }

  return (
    open && (
      <div className="absolute inset-x-0 bottom-0 h-[400px] bg-slate-500/50 p-4">
        <div className="h-full flex gap-4">
          <div className="grow bg-slate-600 shadow p-4 overflow-scroll">
            <div className="flex flex-col gap-4">
              <h1 className="text-white text-xl font-bold">AI 回答</h1>
              <p className="bg-green-700 p-4 rounded text-white max-w-2/3 font-bold">
                Peerless performance, efficiency and developer experience.
                Next.js is trusted by some of the biggest names of the web.
              </p>
              <p className="bg-yellow-700 p-4 rounded text-white max-w-2/3 font-bold">
                Peerless performance, efficiency and developer experience.
              </p>
            </div>
          </div>
          <div className="basis-[300px] p-4 flex flex-col gap-4 item-stretch bg-slate-600 shadow">
            <h1 className="text-white text-xl font-bold">
              使用 ChatGPT 生成简历
            </h1>
            <Select
              className="rounded-none"
              placeholder="请选择所处行业"
              options={industryItems}
            ></Select>
            <Select className="rounded-none" placeholder="请选择模块"></Select>
            <Button className="mt-auto" onClick={closePanel} danger ghost>
              关闭面板
            </Button>
            <Button ghost>生成</Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ChatGPTPanel;
