import type { RootState } from "@/store";

import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getConsumptionRecord } from "@/api/user";
import { ConsumptionRecord } from "@/type/definition";

import OrderCard from "./components/OrderCard";

type P = {
  username: string;
};

const Record: React.FC<P> = ({ username }) => {
  const [records, setRecords] = useState<ConsumptionRecord[]>([]);

  useEffect(() => {
    getConsumptionRecord(username).then((records) => {
      if (records) {
        setRecords(records);
      }
    });
  }, [username]);

  return (
    <main>
      <h1 className="text-lg text-slate-700 pb-2 border border-0 border-b border-solid border-zinc-100">
        我的订单
      </h1>
      {records.map((record) => (
        <OrderCard key={record.id} record={record} />
      ))}
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(Record);
