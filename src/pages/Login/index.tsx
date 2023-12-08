import { useEffect, useState } from "react";

import { Card, Row, Col, Form, Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { getAccess } from "@/api/login";

const Login = () => {
  const [access, setAccess] = useState("");
  const [accessLoading, setAccessLoading] = useState(true);

  useEffect(() => {
    getAccess().then((data) => {
      if (data) {
        setAccess(data);
        setAccessLoading(false);
      }
    });
  }, []);

  const AccessPicture = () => {
    return accessLoading ? (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} />} />
    ) : (
      <img className="w-full h-full" src={access} alt="access not found" />
    );
  };

  return (
    <div
      className="flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <Card className="rounded-none shadow w-1/3">
        <Row gutter={24}>
          <Col
            span={12}
            className="border-0 border-r border-dashed border-slate-300"
          >
            <h3 className="m-0 mb-2">
              扫码关注公众号，发送关键字，获取专属验证码
            </h3>
            <div className="flex justify-center">
              <div
                className="flex justify-center items-center"
                style={{ width: "200px", height: "200px" }}
              >
                <AccessPicture />
              </div>
            </div>
            <h5 className="m-0 mt-2 text-slate-400">
              请扫描上方二维码，更多精彩等你来...
            </h5>
          </Col>
          <Col span={12}>
            <div className="h-full flex flex-col justify-center">
              <Form>
                <Form.Item>
                  <Input placeholder="请输入验证码"></Input>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" block>
                    登录/注册
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Login;
