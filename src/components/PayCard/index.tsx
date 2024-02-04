import { useCallback, useEffect, useRef, useState } from "react";
import { App, Modal, Tabs, QRCode } from "antd";
import { useTranslation } from "react-i18next";
import WxPayIcon from "@/assets/image/wxpay.png";
import AliPayIcon from "@/assets/image/alipay.png";

const PollingMessage = "hello";
const PollingInterval = 60 * 1000;
const PayPanel = ({
  QRCodeUrl,
  text,
  name,
  price,
}: {
  QRCodeUrl: string;
  text: string;
  name: string;
  price: number;
}) => {
  const { t } = useTranslation();
  return (
    <section>
      <div className="flex flex-col items-center px-8">
        <div className="w-full mb-4">
          <p>
            <span>{t("purchase:Purchase of goods:")}</span>
            <span className="text-blue-500">{name}</span>
          </p>
          <p>
            <span>{t("purchase:Order amount:")}</span>
            <span className="text-green-400">${price}</span>
          </p>
        </div>
        <QRCode value={QRCodeUrl} />
        <div className="w-full mt-4">
          <p className="text-slate-500">{text}</p>
        </div>
      </div>
    </section>
  );
};

const PayCard = ({
  wxQRCodeUrl,
  aliQRCodeUrl,
  websocketUrl,
  name,
  price,
  onPaid,
  onOk,
  onCancel,
}: {
  wxQRCodeUrl: string;
  aliQRCodeUrl: string;
  websocketUrl: string;
  name: string;
  price: number;
  onPaid?: () => void;
  onOk?: () => void;
  onCancel?: () => void;
}) => {
  const { t } = useTranslation();
  const { notification, message } = App.useApp();
  const { success } = notification;
  const { warning } = message;

  const showNotification = useCallback(() => {
    success({
      message: t("purchase:Payment successful"),
      placement: "topRight",
      description: <div>{`${t("purchase:You have purchased")}${name}`}</div>,
    });
  }, [success, t, name]);

  const items = [
    {
      key: "wx",
      children: (
        <PayPanel
          QRCodeUrl={wxQRCodeUrl}
          name={name}
          price={price}
          text={t(
            "purchase:Please use WeChat to scan the QR code above for payment"
          )}
        />
      ),
      label: (
        <label className="flex items-center">
          <img src={WxPayIcon as string} width="20px" />
          <span className="ms-2">{t("purchase:WeChat payment")}</span>
        </label>
      ),
    },
    {
      key: "ali",
      children: (
        <PayPanel
          QRCodeUrl={aliQRCodeUrl}
          name={name}
          price={price}
          text={t(
            "purchase:Please use Alipay to scan the QR code above to pay"
          )}
        />
      ),
      label: (
        <label className="flex items-center">
          <img src={AliPayIcon as string} width="20px" />
          <span className="ms-2">{t("purchase:Alipay payment")}</span>
        </label>
      ),
    },
  ];

  const websocket = useRef<WebSocket>();

  function createWebSocket(url: string, callback: () => void) {
    let timer: NodeJS.Timeout;
    websocket.current = new WebSocket(url);
    websocket.current.onopen = () => {
      console.info("create websocket");
      timer = setInterval(() => {
        websocket.current!.send(PollingMessage);
      }, PollingInterval);
    };
    websocket.current.onerror = (e) => console.error(e);
    websocket.current.onclose = () => {
      clearInterval(timer);
      console.info("disconnecting websocket");
    };
    websocket.current.onmessage = (event: MessageEvent<string>) => {
      console.info("onmessage");
      const { data } = event;
      if (data) {
        if (data !== PollingMessage) {
          callback();
        }
      }
    };
  }

  const callbackForPayDone = useCallback(() => {
    showNotification();
    onPaid && onPaid();
  }, [showNotification, onPaid]);

  useEffect(() => {
    if (wxQRCodeUrl && aliQRCodeUrl && websocketUrl) {
      setOpen(true);
      createWebSocket(websocketUrl, callbackForPayDone);
    }
  }, [wxQRCodeUrl, aliQRCodeUrl, websocketUrl, callbackForPayDone]);

  const [open, setOpen] = useState(false);

  function cancelPaying() {
    websocket.current?.close();
    setOpen(false);
    warning(t("purchase:You have cancelled the payment"));
    onCancel && onCancel();
  }

  function handleOk() {
    setOpen(false);
    onOk && onOk();
  }

  return (
    <Modal
      open={open}
      centered
      okText={t("purchase:I have completed the payment")}
      cancelText={t("purchase:Cancel Payment")}
      onOk={handleOk}
      onCancel={cancelPaying}
    >
      <Tabs items={items} />
    </Modal>
  );
};

export default PayCard;
