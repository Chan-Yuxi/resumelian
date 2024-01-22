import { Menu, Button, MenuProps, Modal } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  UserOutlined,
  FileTextOutlined,
  DollarOutlined,
  CarryOutOutlined,
  CloseCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { connect } from "react-redux";
import { setToken, setUsername } from "@/store/features/user";
import { deleteItem } from "@/utils/storage";
// import { useTranslation } from "react-i18next";
import { useState } from "react";

const items = [
  {
    label: "账号信息",
    key: "",
    icon: <UserOutlined />,
  },
  {
    label: "我的简历",
    key: "mine",
    icon: <FileTextOutlined />,
  },
  {
    label: "我的订单",
    key: "order",
    icon: <DollarOutlined />,
  },
  {
    label: "下载记录",
    key: "record",
    icon: <CarryOutOutlined />,
  },
];

const Resume: React.FC<{
  inner_setUsername: (username: string) => void;
  inner_setToken: (token: string) => void;
}> = ({ inner_setUsername, inner_setToken }) => {
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  function getSelectKey() {
    const selectKey = location.pathname.split("/resume")[1];
    return selectKey.startsWith("/") ? selectKey.substring(1) : selectKey;
  }

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key, { replace: true });
  };

  const [open, setOpen] = useState(false);

  function handleLogOut() {
    setOpen(false);
    inner_setUsername("");
    inner_setToken("");
    deleteItem("username");
    deleteItem("token");
    navigate("/login");
  }

  return (
    <main className="grow flex flex-col sm:flex-row gap-4 sm:gap-8 px-6 py-4 sm:p-9 bg-slate-100">
      <aside className="flex flex-raw flex-wrap sm:flex-col items-center sm:items-stretch w-full sm:w-72 py-4 sm:py-8 rounded-lg shadow-sm bg-white">
        <h3 className="text-md sm:text-xl px-8 font-bold order-1">
          <HomeOutlined />
          <span className="ms-2">个人中心</span>
        </h3>
        <div className="mt-4 sm:my-8 px-4 w-full order-3 sm:order-2">
          <Menu
            className="block sm:hidden"
            mode="horizontal"
            selectedKeys={[getSelectKey()]}
            items={items}
            onClick={handleMenuClick}
          />
          <Menu
            className="hidden sm:block"
            style={{ borderInlineEndWidth: "0" }}
            selectedKeys={[getSelectKey()]}
            items={items}
            onClick={handleMenuClick}
          />
        </div>
        <div className="ms-auto sm:ms-0 mt-auto px-8 order-2 sm:order-3">
          <Button
            className="rounded-none p-0"
            type="link"
            icon={<CloseCircleOutlined />}
            onClick={() => setOpen(true)}
          >
            退出登录
          </Button>
        </div>
      </aside>
      <aside className="grow px-8 py-4 sm:p-8 rounded-lg shadow-sm bg-white">
        <Outlet />
      </aside>
      <aside>
        <Modal
          centered
          cancelText="取消"
          okText="确定"
          open={open}
          onCancel={() => setOpen(false)}
          onOk={handleLogOut}
        >
          <div className="my-8">
            <span>确定退出登录吗？</span>
          </div>
        </Modal>
      </aside>
    </main>
  );
};

const mapDispatchToProps = {
  inner_setUsername: setUsername,
  inner_setToken: setToken,
};

export default connect(null, mapDispatchToProps)(Resume);
