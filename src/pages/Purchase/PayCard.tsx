import React from "react";
import Entry from "@/components/Entry";

import { useTranslation } from "react-i18next";
import { Card, Button, Divider } from "antd";

type P = {
  name: string;
  price: number;
  descriptions: Record<string, string>;
};

const PayCard: React.FC<P> = ({ name, price, descriptions }) => {
  const { t } = useTranslation();

  return (
    <Card className="mx-4 sm:m-0 w-full sm:w-[300px] rounded-lg shadow border-0 bg-gradient-to-br from-sky-500 to-indigo-500">
      <div className="flex flex-col gap-3 items-center">
        <span className="text-white text-2xl tracking-widest">{name}</span>
        <div className="text-white tracking-widest">
          <span>¥&nbsp;</span>
          <span className="text-5xl font-bold drop-shadow text-yellow-300">
            {price}
          </span>
          <span>{t("pc.yuan/month")}</span>
        </div>
        <Button className="h-[40px] px-14 rounded-full border-0 shadow-lg">
          {t("pc.purchase_upgrade")}
        </Button>
      </div>

      <Divider className="bg-zinc-50/50 my-4" />

      <div className="flex flex-col justify-start gap-1">
        <h3 className="text-white text-lg text-left mb-2">
          {t("pc.membership_privileges")}
        </h3>
        {Object.keys(descriptions).map((k, i) => {
          return <Entry key={i} leftText={k} rightText={descriptions[k]} />;
        })}
        <a className="text-white underline mt-2 text-left" href="#">
          {t("pc.more_discounts")}
        </a>
      </div>
    </Card>
  );
};

export default PayCard;
