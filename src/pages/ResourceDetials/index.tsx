import { Trade } from "@/type/definition";
import { useLocation } from "react-router-dom";

import { Button, Modal, Divider, QRCode, Tabs, App } from "antd";
import { FireOutlined, TransactionOutlined } from "@ant-design/icons";
import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RootState } from "@/store";
import { connect } from "react-redux";

import {
  getTradeWxPay,
  getTradeAliPay,
  getWanPanByTrade,
  getHotInformation,
} from "@/api/trade";
import UnLoginInterceptor from "@/components/UnLoginInterceptor";

import WxPayIcon from "@/assets/image/wxpay.png";
import AliPayIcon from "@/assets/image/alipay.png";
import TradeCard from "../ResourceMall/components/TradeCard";

const PollingMessage = "hello";
const PollingInterval = 60 * 1000;

type P = {
  username: string;
};

const ResourceDetails: React.FC<P> = ({ username }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const trade = location.state as Trade;

  const { notification, message } = App.useApp();
  const { success } = notification;
  const { warning } = message;

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
              <span>{t("purchase:Purchase of goods:")}</span>
              <span className="text-blue-500">{trade.tradeName}</span>
            </p>
            <p>
              <span>{t("purchase:Order amount:")}</span>
              <span className="text-green-400">{trade.price}元</span>
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

  const [QRCodeUrl, setQRCodeUrl] = useState("");
  const [AliQRCodeUrl, setAliQRCodeUrl] = useState("");
  const [paid, setPaid] = useState(false);

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
          QRCodeUrl={AliQRCodeUrl}
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

  const websocket = useRef<WebSocket>();

  function createWebSocket(callback: () => void) {
    let timer: NodeJS.Timeout;
    websocket.current = new WebSocket("wss://jianlizhizuo.cn/api/websocket");
    websocket.current.onopen = () => {
      timer = setInterval(() => {
        console.log("发送");
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
      // if (event.data && event.data !== PollingMessage) {
      //   callback();
      // }
      console.log("onmessage");
      const { data } = event;
      if (data) {
        if (data === PollingMessage) {
          console.log("收到了");
        } else {
          console.log(data);
          callback();
        }
      }
    };
  }

  function cancelPaying() {
    websocket.current?.close();
    setOpen(false);
    warning(t("purchase:You have cancelled the payment"));
  }

  const showNotification = useCallback(() => {
    success({
      message: t("purchase:Payment successful"),
      placement: "topRight",
      description: (
        <div>{`${t("purchase:You have purchased")}${trade.tradeName}`}</div>
      ),
    });
  }, [success, t, trade.tradeName]);

  useEffect(() => {
    if (paid === true) {
      websocket.current?.close();
      setOpen(false);
      showNotification();
      trade.alreadyBuy = true;
    }
  }, [paid, showNotification, trade]);

  const [QRLoading, setQRLoading] = useState(false);
  const [outTradeNo, setOutTradeNo] = useState("");
  console.log(outTradeNo);
  function handlePurchase() {
    setQRLoading(true);
    const { id, price } = trade;
    Promise.all([
      getTradeWxPay(username, id, price),
      getTradeAliPay(username, id, price),
    ])
      .then((payInfo) => {
        if (payInfo[0] && payInfo[1]) {
          setQRCodeUrl(payInfo[0].code_url);
          setOutTradeNo(payInfo[0].out_trade_no);
          setAliQRCodeUrl(payInfo[1].code_url);
          setOpen(true);

          setPaid(false);
          createWebSocket(() => setPaid(true));
        }
      })
      .finally(() => {
        setQRLoading(false);
      });
  }

  const [wanPanAddress, setWanPanAddress] = useState("正在快马加鞭加载中...");
  /// 如果已经买了，哈哈哈，请求网盘地址给他看看吧
  useEffect(() => {
    if (trade.alreadyBuy) {
      getWanPanByTrade(username, trade.id).then((wp) => setWanPanAddress(wp));
    }
  }, [username, trade.id, trade.alreadyBuy]);

  const [hotInformationList, setHotInformationList] = useState<Trade[]>([]);
  useEffect(() => {
    getHotInformation().then((data) => {
      if (data) {
        setHotInformationList(data);
      }
    });
  }, []);

  return (
    <main className="min-h-reach-bottom p-6 sm:px-64 sm:py-8">
      <section>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-32">
          <img
            className="w-[350px] aspect-square"
            src={`https://jianlizhizuo.cn/static/${trade.pic}`}
            alt=""
          />
          <div className="flex grow flex-col gap-4">
            <p className="text-3xl font-bold">
              <span className="text-orange-500">{trade.tradeName}</span>
            </p>
            <p className="text-2xl text-slate-500 font-bold">
              <span>{trade.tradeDetails}</span>
            </p>
            <p className="text-yellow-500 font-bold">
              <span className="text-lg">¥</span>
              <span className="text-4xl ">{trade.price.toFixed(2)}</span>
            </p>
            <p className="font-bold">
              <span className="text-xl text-slate-500">
                <FireOutlined className="text-red-500 me-2" />
                销量：
              </span>
              <span className="text-3xl">{trade.monthlySales}</span>
              <span className="text-xl text-slate-500">/月</span>
            </p>
            <p className="text-lg font-bold">
              <span>资源地址：</span>
              <span>
                <a href={trade.alreadyBuy ? wanPanAddress : "#"} target="blank">
                  {trade.alreadyBuy ? wanPanAddress : "购买后可查看"}
                </a>
              </span>
            </p>
            <div className="mt-auto text-right">
              <UnLoginInterceptor>
                <Button
                  icon={<TransactionOutlined />}
                  onClick={handlePurchase}
                  loading={QRLoading}
                  size="large"
                  type="primary"
                  disabled={trade.alreadyBuy}
                >
                  {trade.alreadyBuy ? "您已购买该产品" : "立即购买"}
                </Button>
              </UnLoginInterceptor>
            </div>
          </div>
        </div>
      </section>
      <Divider></Divider>
      <section>
        <div>
          <p className="text-2xl mb-6">热销商品</p>
          <div className="flex flex-col sm:flex-row gap-6">
            {hotInformationList.map((trade) => (
              <TradeCard key={trade.id} trade={trade} />
            ))}
          </div>
        </div>
      </section>
      <Modal
        title="购买商品"
        open={open}
        centered
        onCancel={cancelPaying}
        okText={t("purchase:I have completed the payment")}
        cancelText={t("purchase:Cancel Payment")}
      >
        <Tabs items={items} />
      </Modal>
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(ResourceDetails);
