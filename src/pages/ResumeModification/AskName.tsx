import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { Modal, Input } from "antd";

type P = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onOk: (name: string) => void;
};

const AskName: React.FC<P> = ({ onOk, open, setOpen }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  return (
    <Modal
      title={t("rm.ask.title")}
      okText={t("rm.ask.ok")}
      cancelText={t("rm.ask.cancel")}
      open={open}
      centered
      onOk={() => name && onOk(name)}
      onCancel={() => setOpen(false)}
    >
      <Input
        placeholder={t("rm.ask.placeholder")}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Modal>
  );
};

export default AskName;
