import type { MenuProps } from "antd";
import type { RootState } from "@/store";

import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Layout, Button } from "antd";

import items from "@/config/menu-items.json";

type P = {
  username: string;
  token: string;
};

const Header: React.FC<P> = ({ username, token }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const doNavigate: MenuProps["onClick"] = ({ key }) => {
    navigate(key, {
      replace: true,
    });
  };

  const toLoginPage = () => {
    navigate("/login");
  };

  const Logo = (
    <div className="flex items-center">
      <img
        className="me-4"
        style={{ width: "40px", height: "40px" }}
        src="/logo.png"
        alt="logo"
      />
      <span className="hidden sm:block text-white text-xl font-bold me-8">
        Resumelian
      </span>
    </div>
  );

  return (
    <Layout.Header className="flex items-center overflow-scroll">
      {Logo}
      <Menu
        className="ms-auto mx-8"
        theme="dark"
        mode="horizontal"
        items={items}
        selectedKeys={[location.pathname]}
        onClick={doNavigate}
      />
      {token ? (
        <span className="text-white">{username}</span>
      ) : (
        <Button type="primary" onClick={toLoginPage} ghost>
          {t("lg.login/register")}
        </Button>
      )}
    </Layout.Header>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
    token: state.user.token,
  };
};

export default connect(mapStateToProps)(Header);
