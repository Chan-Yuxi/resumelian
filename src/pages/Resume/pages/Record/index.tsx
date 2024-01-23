import { LinkOutlined } from "@ant-design/icons";

const MyOrder = () => {
  return (
    <main>
      <h1 className="text-md sm:text-xl text-slate-700 font-bold pb-2 border border-0 border-b border-solid border-zinc-100">
        <LinkOutlined />
        <span className="ms-2">下载记录</span>
      </h1>
      <section>
        <p className="flex h-80 justify-center items-center text-slate-500">
          功能开发中，敬请期待...
        </p>
      </section>
    </main>
  );
};

export default MyOrder;
