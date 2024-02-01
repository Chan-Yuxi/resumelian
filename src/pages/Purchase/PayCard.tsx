import type { RootState } from "@/store";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Button, Divider } from "antd";

import { getPayQRCode, getAliPayQRCode } from "@/api/pay";

import Entry from "@/components/Entry";
import PayModal from "@/components/PayCard";
import UnLoginInterceptor from "@/components/UnLoginInterceptor";

type P = {
  username: string;
  name: string;
  price: number;
  descriptions: Record<string, string>;
};

const PayCard: React.FC<P> = ({ username, name, price, descriptions }) => {
  const { t } = useTranslation();

  const [wxQRCodeUrl, setWxQRCodeUrl] = useState("");
  const [aliQRCodeUrl, setAliQRCodeUrl] = useState("");
  const [QRLoading, setQRLoading] = useState(false);

  function handlePurchase() {
    setQRLoading(true);
    Promise.all([
      getPayQRCode(username, price),
      getAliPayQRCode(username, price),
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

  return (
    <Card className="mx-6 sm:m-0 w-full sm:w-[300px] rounded-lg shadow border-0 bg-gradient-to-br from-sky-500 to-indigo-500">
      <section className="flex flex-col gap-3 items-center">
        <h4 className="text-white text-2xl tracking-widest">{name}</h4>
        <div className="text-white tracking-widest">
          ¥&nbsp;
          <span className="text-5xl font-bold drop-shadow text-yellow-300">
            {price}
          </span>
          <span>&nbsp;元</span>
        </div>
        <UnLoginInterceptor>
          <Button
            className="h-[40px] px-14 rounded-full border-0 shadow-lg"
            loading={QRLoading}
            onClick={handlePurchase}
          >
            购买次数
          </Button>
        </UnLoginInterceptor>
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

      <PayModal
        wxQRCodeUrl={wxQRCodeUrl}
        aliQRCodeUrl={aliQRCodeUrl}
        websocketUrl="wss://jianlizhizuo.cn/api/websocket"
        name={name}
        price={price}
      />
    </Card>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(PayCard);
