import { ConsumptionRecord } from "@/type/definition";
import dayjs from "dayjs";

type P = {
  record: ConsumptionRecord;
};

const OrderCard: React.FC<P> = ({ record }) => {
  return (
    <div className="p-4 mt-4 rounded border border-1 border-solid border-slate-200 bg-zinc-100/50">
      <p>支付金额：{record.money}.00 元</p>
      <p>订单编号：{record.out_trade_no}</p>
      <p>
        支付时间：{dayjs(record.success_time).format("YYYY-MM-DD HH:mm:ss")}
      </p>
    </div>
  );
};

export default OrderCard;
