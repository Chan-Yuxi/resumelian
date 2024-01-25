import type { MenuProps } from "antd";

import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Layout } from "antd";

import UserProfile from "./UserProfile";
import items from "@/config/menu-items.json";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const doNavigate: MenuProps["onClick"] = ({ key }) => {
    if (location.pathname === key) {
      return;
    }
    navigate(key, {
      replace: true,
    });
  };

  function getSelectedKeys() {
    for (const item of items) {
      if (location.pathname.startsWith(item.key)) {
        return [item.key];
      }
    }
    return [];
  }

  return (
    <Layout.Header className="flex items-center px-6 md:px-9">
      <div className="flex items-center me-auto">
        <span className="text-white text-xl font-bold">Resumelian</span>
      </div>

      <div className="w-[46px] md:w-[588px]">
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          selectedKeys={getSelectedKeys()}
          onClick={doNavigate}
        />
      </div>
      <div className="md:me-0 md:ms-6">
        <UserProfile />
      </div>
    </Layout.Header>
  );
};

export default Header;
