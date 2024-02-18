import { useEffect } from "react";
import { getAlreadyBuyList, getInformationList } from "@/api/trade";

import { RootState } from "@/store";
import { connect } from "react-redux";
import { useForceUpdate, usePagination } from "@/hooks";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Pagination from "@/components/Pagination";
import TradeCard from "./components/TradeCard";

type P = {
  username: string;
};

const ResourceMall: React.FC<P> = ({ username }) => {
  const [loading, trades, paginationProps] = usePagination(
    (pageNum, pageSize) => getInformationList(pageNum, pageSize)
  );

  // forceUpdate

  const update = useForceUpdate();

  useEffect(() => {
    if (username && trades) {
      getAlreadyBuyList(username).then((data) => {
        if (data) {
          const information = data[0].Information;
          trades.forEach((trade) => {
            if (information.includes(`${trade.id}`)) {
              trade.alreadyBuy = true;
            }
          });
          update();
        }
      });
    }
    // eslint-disable-next-line
  }, [username, trades]);

  return (
    <main className="generic-container p-6 sm:p-9 flex flex-col">
      <section className="grow">
        {loading ? (
          <div className="self-stretch flex justify-center items-center">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} />} />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {trades &&
              trades.map((trade) => {
                return <TradeCard key={trade.id} trade={trade} />;
              })}
          </div>
        )}
      </section>
      <div className="my-4 text-center">
        <Pagination {...paginationProps} />
      </div>
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(ResourceMall);
