import type { FormProps } from "antd";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Form, Input, Button, Spin, App } from "antd";
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
  const { message } = App.useApp();

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

  const [loginLoading, setLoginLoading] = useState(false);
  const handleFinish: FormProps["onFinish"] = ({ code }) => {
    if (code && ticket) {
      setLoginLoading(true);
      login(ticket, code as string)
        .then((data) => {
          if (data) {
            const { userId, token } = data;
            setUsername(userId);
            setToken(token);
            setItem("token", token);
            setItem("username", userId);

            navigate("/home", { replace: true });
            message.success(t("lg.login_success"));
          }
        })
        .finally(() => {
          setLoginLoading(false);
        });
    }
  };

  return (
    <main
      className="flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500 px-6"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div>
        {/* <div className="font-bold mb-8">
          <h1 className="text-4xl text-yellow-300">Welcome to</h1>
          <h3 className="text-5xl text-white">Resumelian</h3>
        </div> */}

        <div className="w-full p-6 rounded shadow bg-white">
          <h1 className="mb-4 text-lg font-bold">{t("lg.top_text")}</h1>
          <div className="flex justify-center items-center rounded bg-gradient-to-tl from-slate-100/60 to-slate-200/60  w-[200px] h-[200px] mx-auto">
            <AccessPicture />
          </div>
          <h4 className="text-gray-400/80 my-6 w-[280px] leading-none">
            {t("lg.tip")}
          </h4>

          <Form onFinish={handleFinish}>
            <Form.Item name="code">
              <Input placeholder={t("lg.placeholder")} />
            </Form.Item>
            <Form.Item>
              <Button loading={loginLoading} type="primary" htmlType="submit" block>
                {t("lg.login/register")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </main>
  );
};

const mapDispatchToProp = {
  setUsername,
  setToken,
};

export default connect(null, mapDispatchToProp)(Login);
