import type { RootState } from "@/store";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Button, Divider, Modal, App, QRCode, Tabs } from "antd";

import { getPayQRCode } from "@/api/pay";

import Entry from "@/components/Entry";

import WxPayIcon from "@/assets/image/wxpay.png";
import AliPayIcon from "@/assets/image/alipay.png";

type P = {
  username: string;
  name: string;
  price: number;
  descriptions: Record<string, string>;
};

const PollingMessage = "hello";
const PollingInterval = 60 * 1000;

const PayCard: React.FC<P> = ({ username, name, price, descriptions }) => {
  const { t } = useTranslation();
  const { notification, message } = App.useApp();
  const { success } = notification;
  const { warning } = message;

  const websocket = useRef<WebSocket>();

  const [QRCodeUrl, setQRCodeUrl] = useState("");
  const [paid, setPaid] = useState(false);
  const [open, setOpen] = useState(false);

  const PayPanel = ({
    QRCodeUrl,
    text,
  }: {
    QRCodeUrl: string;
    text: string;
  }) => {
    return (
      <section>
        <div className="flex flex-col items-center px-8">
          <div className="w-full mb-4">
            <p>
              <span>{t("purchase:Purchase of goods")}</span>
              <span className="text-blue-500">{name}</span>
            </p>
            <p>
              <span>{t("Order amount:")}</span>
              <span className="text-yellow-400 font-bold">{price}元</span>
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

  const items = [
    {
      key: "wx",
      children: (
        <PayPanel
          QRCodeUrl={QRCodeUrl}
          text={t(
            "purchase:Please use WeChat to scan the QR code above for payment"
          )}
        />
      ),
      label: (
        <label className="flex items-center">
          <img src={WxPayIcon as string} width="20px" alt="wx pay icon" />
          <span className="ms-2">{t("purchase:WeChat payment")}</span>
        </label>
      ),
    },
    {
      key: "ali",
      children: (
        <PayPanel
          QRCodeUrl={QRCodeUrl}
          text={t(
            "purchase:Please use Alipay to scan the QR code above to pay"
          )}
        />
      ),
      label: (
        <label className="flex items-center">
          <img src={AliPayIcon as string} width="20px" alt="ali pay icon" />
          <span className="ms-2">{t("purchase:Alipay payment")}</span>
        </label>
      ),
    },
  ];

  const showNotification = useCallback(() => {
    success({
      message: t("purchase:Payment successful"),
      placement: "topRight",
      description: <div>{`${t("purchase:You have purchased")}${name}`}</div>,
    });
  }, [success, t, name]);

  useEffect(() => {
    if (paid === true) {
      websocket.current?.close();
      setOpen(false);
      showNotification();
    }
  }, [paid, showNotification]);

  function createWebSocket(callback: () => void) {
    let timer: NodeJS.Timeout;
    websocket.current = new WebSocket("ws://g5cj9c.natappfree.cc/websocket");
    websocket.current.onopen = () => {
      timer = setInterval(() => {
        websocket.current!.send(PollingMessage);
      }, PollingInterval);
      console.info("open websocket");
    };
    websocket.current.onerror = (e) => console.log(e);
    websocket.current.onclose = () => {
      clearInterval(timer);
      console.info("disconnecting websocket");
    };
    websocket.current.onmessage = (event: MessageEvent<string>) => {
      if (event.data && event.data !== PollingMessage) {
        callback();
      }
    };
  }

  const [QRLoading, setQRLoading] = useState(false);
  const [outTradeNo, setOutTradeNo] = useState("");
  function handlePurchase() {
    setQRLoading(true);
    getPayQRCode(username)
      .then((payInfo) => {
        if (payInfo) {
          setQRCodeUrl(payInfo.code_url);
          setOutTradeNo(payInfo.out_trade_no);
          setOpen(true);

          setPaid(false);
          createWebSocket(() => setPaid(true));
        }
      })
      .finally(() => {
        setQRLoading(false);
      });
  }

  function cancelPaying() {
    websocket.current?.close();
    setOpen(false);
    warning(t("purchase:You have cancelled the payment"));
  }

  function handleOk() {
    // TODO check paying status here.
    console.log(outTradeNo);
    setOpen(false);
  }

  return (
    <Card className="mx-6 sm:m-0 w-full sm:w-[300px] rounded-lg shadow border-0 bg-gradient-to-br from-sky-500 to-indigo-500">
      <section className="flex flex-col gap-3 items-center">
        <h4 className="text-white text-2xl tracking-widest">{name}</h4>
        <div className="text-white tracking-widest">
          ¥&nbsp;
          <span className="text-5xl font-bold drop-shadow text-yellow-300">
            {price}
          </span>
          {t("purchase:yuan per month")}
        </div>
        <Button
          className="h-[40px] px-14 rounded-full border-0 shadow-lg"
          loading={QRLoading}
          onClick={handlePurchase}
        >
          {t("purchase:Purchase upgrade")}
        </Button>
      </section>

      <Divider className="bg-zinc-50/90 my-4" />

      <section className="flex flex-col gap-1">
        <h3 className="text-white text-left text-lg mb-2">
          {t("purchase:Membership privileges")}
        </h3>
        {Object.keys(descriptions).map((k, i) => {
          return <Entry key={i} leftText={k} rightText={descriptions[k]} />;
        })}
        <Link className="text-white text-left underline mt-2" to="#">
          {t("purchase:More discounts...")}
        </Link>
      </section>

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
    </Card>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(PayCard);
