import type { Trade } from "@/type/definition";

import { useState, useEffect } from "react";
import { getAlreadyBuyList, getInformationList } from "@/api/trade";

import TradeCard from "./components/TradeCard";
import { RootState } from "@/store";
import { connect } from "react-redux";

type P = {
  username: string;
};

const ResourceMall: React.FC<P> = ({ username }) => {
  const [tradeList, setTradeList] = useState<Trade[]>([]);

  useEffect(() => {
    Promise.all([
      getInformationList(),
      username ? getAlreadyBuyList(username) : Promise.resolve(null),
    ]).then((data) => {
      if (data[0]) {
        if (data[1]) {
          data[1][0] &&
            data[1][0].Information.forEach((info) => {
              data[0]!.forEach((trade) => {
                if (trade.id == info) {
                  trade.alreadyBuy = true;
                }
              });
            });
        }
        setTradeList(data[0]);
      }
    });

    // getInformationList().then((data) => {
    // if (data) {
    // setTradeList(data);
    // }
    // });
  }, [username]);

  return (
    <main className="min-h-reach-bottom bg-gradient-to-br from-slate-100 to-slate-200">
      <section className="p-6">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {tradeList.map((trade) => {
            return <TradeCard key={trade.id} trade={trade} />;
          })}
        </div>
      </section>
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(ResourceMall);
