import { Trade } from "@/type/definition";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

type P = {
  trade: Trade;
};

const TradeCard: React.FC<P> = ({ trade }) => {
  const navigate = useNavigate();

  return (
    <div className="w-[calc(50%_-_4px)] bg-white sm:w-[228px] flex flex-col rounded overflow-hidden shadow hover:shadow-xl">
      <img
        className="w-full h-[180px] sm:h-[250px]"
        src={`https://jianlizhizuo.cn/static/${trade.pic}`}
      />
      <div className="flex  flex-col grow p-4">
        <p>
          <span className="text-slate-500">商品：</span>
          <span className="font-bold">{trade.tradeName}</span>
        </p>
        <p>
          <span className="text-slate-500">价格：</span>
          <span className="text-green-500 font-bold">$ {trade.price}</span>
        </p>
        <p className="text-slate-500">
          <span>月销：</span>
          <span>{trade.monthlySales}</span>
        </p>
        <div className="mt-auto text-right">
          <Button
            onClick={() =>
              navigate("/resource-detials", {
                state: trade,
              })
            }
            size="small"
            type="primary"
            ghost={!trade.alreadyBuy}
            className={trade.alreadyBuy ? "bg-slate-300 hover:!bg-green-500" : ""}
          >
            {trade.alreadyBuy ? "您已购买" : "查看详情"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TradeCard;
