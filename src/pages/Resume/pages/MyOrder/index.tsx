import type { RootState } from "@/store";

import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Skeleton } from "antd";

import { useRequest } from "@/hooks";
import { getConsumptionRecord } from "@/api/user";

import OrderCard from "./components/OrderCard";

type P = {
  username: string;
};

const Record: React.FC<P> = ({ username }) => {
  const { t } = useTranslation();
  const [ordersLoading, orders] = useRequest(() =>
    getConsumptionRecord(username)
  );

  return (
    <main>
      <h1 className="text-lg text-slate-700 pb-2 border border-0 border-b border-solid border-zinc-100">
        {t("resume:My Order")}
      </h1>
      <section className="mt-4">
        <Skeleton active loading={ordersLoading}>
          {orders ? (
            orders.length > 0 ? (
              orders.map((order) => <OrderCard key={order.id} record={order} />)
            ) : (
              <div className="flex h-80 justify-center items-center text-slate-500">暂无订单记录</div>
            )
          ) : (
            <div>Error:No Orders</div>
          )}
        </Skeleton>
      </section>
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(Record);
