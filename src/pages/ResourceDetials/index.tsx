import { Trade } from "@/type/definition";
import { useLocation } from "react-router-dom";

import { Button, Divider } from "antd";
import { FireOutlined, TransactionOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { RootState } from "@/store";
import { connect } from "react-redux";

import {
  getTradeWxPay,
  getTradeAliPay,
  getWanPanByTrade,
  getHotInformation,
} from "@/api/trade";
import UnLoginInterceptor from "@/components/UnLoginInterceptor";

import PayCard from "@/components/PayCard";
import TradeCard from "../ResourceMall/components/TradeCard";

type P = {
  username: string;
};

const ResourceDetails: React.FC<P> = ({ username }) => {
  const location = useLocation();
  const trade = location.state as Trade;

  const [wxQRCodeUrl, setWxQRCodeUrl] = useState("");
  const [aliQRCodeUrl, setAliQRCodeUrl] = useState("");

  const [QRLoading, setQRLoading] = useState(false);
  function handlePurchase() {
    setQRLoading(true);
    const { id, price } = trade;
    Promise.all([
      getTradeWxPay(username, id, price),
      getTradeAliPay(username, id, price),
    ])
      .then((payInfo) => {
        if (payInfo[0] && payInfo[1]) {
          setWxQRCodeUrl(payInfo[0].code_url);
          setAliQRCodeUrl(payInfo[1].code_url);
        }
      })
      .finally(() => {
        setQRLoading(false);
      });
  }

  const [wanPanAddress, setWanPanAddress] = useState("正在快马加鞭加载中...");
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
                {trade.alreadyBuy ? (
                  <a href={wanPanAddress} target="blank">
                    {wanPanAddress}
                  </a>
                ) : (
                  <span className="text-blue-500 cursor-pointer">
                    购买后可查看
                  </span>
                )}
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
      <Divider />
      <section className="mb-32">
        <div>
          <p className="text-2xl sm:text-center sm:mt-36 mb-6 sm:mb-12">
            热销商品
          </p>
          <div className="flex flex-col justify-center sm:flex-row gap-6 sm:gap-16">
            {hotInformationList.map((trade) => (
              <TradeCard key={trade.id} trade={trade} />
            ))}
          </div>
        </div>
      </section>
      <PayCard
        wxQRCodeUrl={wxQRCodeUrl}
        aliQRCodeUrl={aliQRCodeUrl}
        websocketUrl="wss://jianlizhizuo.cn/api/websocket"
        name={trade.tradeName}
        price={trade.price}
        onPaid={() => {
          trade.alreadyBuy = true;
        }}
      />
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(ResourceDetails);
