import type { MenuProps } from "antd";

import { Menu, Layout, Button } from "antd";
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

  const toLogin = () => {
    navigate("/login");
  };

  const Logo = <div className="text-white text-xl font-bold">Resumelian</div>;

  return (
    <LHeader className="flex items-center">
      {Logo}
      <div className="ms-auto me-8">
        <Menu
          defaultSelectedKeys={["home"]}
          items={items}
          theme="dark"
          mode="horizontal"
          onClick={handleMenuClick}
        />
      </div>
      <div>
        <Button className="rounded-none" onClick={toLogin} type="primary" ghost>
          登录/注册
        </Button>
      </div>
    </LHeader>
  );
};

export default Header;
