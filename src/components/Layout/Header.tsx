import type { MenuProps } from "antd";

import { Menu, Layout, Button } from "antd";
import { useLocation, useNavigate, Link } from "react-router-dom";

import items from "@/config/menu.json";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const doNavigate: MenuProps["onClick"] = ({ key }) => {
    navigate(key, {
      replace: true,
    });
  };

  const Logo = (
    <div className="text-white text-xl font-bold me-8">Resumelian</div>
  );

  return (
    <Layout.Header className="flex items-center">
      {Logo}
      <div className="ms-auto mx-8">
        <Menu
          items={items}
          selectedKeys={[location.pathname]}
          mode="horizontal"
          theme="dark"
          onClick={doNavigate}
        />
      </div>
      <div>
        <Button type="primary" ghost>
          <Link to="/login">登录/注册</Link>
        </Button>
      </div>
    </Layout.Header>
  );
};

export default Header;
