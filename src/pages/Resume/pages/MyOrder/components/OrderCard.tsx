import { ConsumptionRecord } from "@/types/definition";
import dayjs from "dayjs";

type P = {
  record: ConsumptionRecord;
};

const OrderCard: React.FC<P> = ({ record }) => {
  function transform(num: number | string) {
    num = typeof num === "number" ? num : Number.parseFloat(num);
    return num.toFixed(2);
  }

  function effectName(name: string) {
    return name;
  }

  const m = transform(record.money || record.totalAmount);
  const n = effectName(record.attach || record.subject);
  const o = record.out_trade_no || record.traceNo;
  const t = record.success_time || record.aliPayment;

  return (
    <div className="p-4 mt-4 rounded border border-1 border-solid border-slate-200 bg-zinc-100/50">
      <p>支付金额：{m} 元</p>
      <p>订单名称：{n}</p>
      <p>订单编号：{o}</p>
      <p>支付时间：{dayjs(t).format("YYYY-MM-DD HH:mm:ss")}</p>
    </div>
  );
};

export default OrderCard;
