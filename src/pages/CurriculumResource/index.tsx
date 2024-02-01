import { Divider } from "antd";

const CurriculumResource = () => {
  return (
    <main className="p-6">
      <section>
        <h1 className="p-2 text-white bg-gradient-to-br from-red-500 to-pink    -500 mb-2">我的课程学习</h1>
        <video
          className="w-full h-64 bg-black"
          controls
          src="https://jianlizhizuo.cn/static/vedio.mp4"
        ></video>
        <p className="p-2 bg-gradient-to-r from-blue-200 to-blue-300">
          中国石油考试详解
        </p>
      </section>
      <section className="mt-2">
        <div>
          <p className="font-bold">目录</p>
          <ul className="">
            <li className="text-slate-500">中国石油考试详解</li>
            <li className="text-green-500 underline">考试详解</li>
            <li className="text-green-500">中国考试详解</li>
            <li className="text-slate-500">石油考试详解</li>
            <li className="text-slate-500">中国石油考试详解-第一题</li>
            <li className="text-slate-500">中国石油考试详解-0</li>
            <li className="text-slate-500">中国石油考试详解-1</li>
            <li className="text-slate-500">全集合集</li>
          </ul>
        </div>
      </section>
      <Divider className="my-2"></Divider>
      <section className="mt-2">
        <div>
          <p className="font-bold mb-4">更多视频</p>
          <div className="flex flex-wrap gap-2">
            <div className="w-[calc(50%_-_.5rem)] rounded aspect-square bg-gray-200"></div>
            <div className="w-[calc(50%_-_.5rem)] rounded aspect-square bg-gray-200"></div>
            <div className="w-[calc(50%_-_.5rem)] rounded aspect-square bg-gray-200"></div>
            <div className="w-[calc(50%_-_.5rem)] rounded aspect-square bg-gray-200"></div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CurriculumResource;
