import { Card } from "antd";

const Login = () => {




  return (
    <div
      className="flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <Card
        className="rounded-none shadow"
        title="扫码关注公众号,发送关键字验证码,获取验证码"
      >
        <div>
          <img src="" alt="" />
        </div>
      </Card>
    </div>
  );
};

export default Login;
