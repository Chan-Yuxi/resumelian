import { Layout, Space } from "antd";

const { Footer: LFooter } = Layout;

const Footer = () => {
  return (
    <LFooter className="bg-slate-800">
      <div className="flex justify-center">
        <Space direction="vertical" className="mx-3">
          <a href="#">关于我们</a>
          <a href="#">加入我们</a>
          <a href="#">联系我们</a>
          <a href="#">友情链接</a>
        </Space>
        <Space direction="vertical" className="mx-3">
          <a href="#">简历制作</a>
          <a href="#">友情链接</a>
        </Space>
      </div>
      <div className="flex justify-center mt-5">
        <Space>
          <a className="text-white">互联网ICP备案：粤 ICP备2023108432号-1</a>
          <a className="text-white">
            人力资源服务许可证：职介证字[2023]第01130052号
          </a>
          <a className="text-white">广东省互联网违法和不良信息举报中心</a>
        </Space>
      </div>
    </LFooter>
  );
};

export default Footer;
