import type { FormProps } from "antd";

import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Card, Row, Col, Form, Input, Button, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { getAccess, login } from "@/api/login";
import { setUsername, setToken } from "@/store/features/user";
import { setItem } from "@/utils/storage";

type P = {
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
};

const Login: React.FC<P> = ({ setUsername, setToken }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const [access, setAccess] = useState("");
  const [ticket, setTicket] = useState("");
  const [accessLoading, setAccessLoading] = useState(true);

  useEffect(() => {
    getAccess().then((data) => {
      if (data) {
        setAccess(data);
        setTicket(data.split("?ticket=")[1]);
        setAccessLoading(false);
      }
    });
  }, []);

  const AccessPicture = () => {
    return accessLoading ? (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} />} />
    ) : (
      <img className="w-full h-full" src={access} alt={t("lg.img_alt")} />
    );
  };

  const handleFinish: FormProps["onFinish"] = ({ code }) => {
    if (code && ticket) {
      login(ticket, code as string).then((data) => {
        if (data) {
          if (data.success && data.data === 1) {
            setUsername(data.userName);
            setToken(data.token);
            setItem("token", data.token);
            
            navigate("/home", { replace: true });

            messageApi.success(data.msg);
          } else {
            messageApi.warning(data.msg);
          }
        }
      });
    }
  };

  return (
    <Fragment>
      {contextHolder}
      <main className="flex justify-center items-center h-full bg-gradient-to-r from-sky-500 to-indigo-500">
        <Card className="shadow w-1/3">
          <Row gutter={48}>
            <Col
              className="border-0 border-r border-dashed border-slate-400"
              span={12}
            >
              <h3 className="font-bold mb-2">{t("lg.top_text")}</h3>
              <section className="flex justify-center">
                <div className="flex justify-center items-center w-[200px] h-[200px]">
                  <AccessPicture />
                </div>
              </section>
              <h5 className="mt-2 text-slate-400">{t("lg.tip")}</h5>
            </Col>

            <Col span={12}>
              <section className="flex flex-col justify-center h-full">
                <Form onFinish={handleFinish}>
                  <Form.Item name="code">
                    <Input placeholder={t("lg.placeholder")} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      {t("lg.login/register")}
                    </Button>
                  </Form.Item>
                </Form>
              </section>
            </Col>
          </Row>
        </Card>
      </main>
    </Fragment>
  );
};

const mapDispatchToProp = {
  setUsername,
  setToken,
};

export default connect(null, mapDispatchToProp)(Login);
