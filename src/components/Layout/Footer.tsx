import { Layout, Divider } from "antd";

const Footer = () => {
  return (
    <Layout.Footer className="bg-slate-800 px-8 py-16 md:px-60 md:py-28 text-white">
      <div>
        <div className="md:flex md:justify-evenly">
          <div className="flex">
            <img
              className="me-4"
              style={{ width: "40px", height: "40px" }}
              src="/logo.png"
              alt="logo"
            />
            <span className="text-white text-2xl font-bold me-8">
              Resumelian
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold my-8 md:mt-0 md:mb-4">公司</h3>
            <div className="flex flex-col gap-2">
              <a className="text-white" href="#">
                关于我们
              </a>
              <a className="text-white" href="#">
                网站地图
              </a>
              <a className="text-white" href="#">
                公司简介
              </a>
              <a className="text-white" href="#">
                用户协议
              </a>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold my-8 md:mt-0 md:mb-4">产品</h3>
            <div className="flex flex-col gap-2">
              <a className="text-white" href="#">
                简历制作
              </a>
              <a className="text-white" href="#">
                简历模板
              </a>
              <a className="text-white" href="#">
                简历优化/代写
              </a>
              <a className="text-white" href="#">
                简历封面
              </a>
            </div>
          </div>

          <div className="w-[150px] h-[150px] rounded bg-gradient-to-bl from-cyan-500 to-blue-500 mb-8" />
          <div className="w-[150px] h-[150px] rounded bg-gradient-to-bl from-cyan-500 to-blue-500 mb-8" />

          <div className="flex flex-col gap-2">
            <div>
              <span className="text-zinc-300">电子联系邮箱：</span>
              <span>123456@qq.com</span>
            </div>
            <div>
              <span className="text-zinc-300">商务广告合作：</span>
              <span>123456@qq.com</span>
            </div>
            <div>
              <span className="text-zinc-300">客服在线时间：</span>
              <span>08:30-12:00 13:30-17:30</span>
            </div>
          </div>
        </div>
        <Divider className="bg-slate-200/50" />
        <div className="text-left md:text-center my-8">
          <span className="text-stone-300/40">
            证经学社网&nbsp;Copyright&nbsp;©&nbsp;2023&nbsp;高霖海拓科技有限公司版权所有粤&nbsp;ICP&nbsp;备&nbsp;12505136&nbsp;号-24
          </span>
        </div>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
