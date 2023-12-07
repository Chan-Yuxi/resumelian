import type { MenuProps } from "antd";

import { Menu, Layout } from "antd";
import { useNavigate } from "react-router-dom";

import items from "@/config/menu.json";

const { Header: LHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(`/${key}`, {
      replace: true,
    });
  };

  return (
    <LHeader className="flex items-center">
      <Menu
        defaultSelectedKeys={["home"]}
        items={items}
        theme="dark"
        mode="horizontal"
        onClick={handleMenuClick}
      />
      <div className="ms-auto">
        <a href="#">注册/登录</a>
      </div>
    </LHeader>
  );
};

export default Header;
