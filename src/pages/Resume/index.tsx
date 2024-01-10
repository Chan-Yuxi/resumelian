import { Menu, Button, MenuProps } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  UserOutlined,
  FileTextOutlined,
  DollarOutlined,
  CarryOutOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import { connect } from "react-redux";
import { setToken, setUsername } from "@/store/features/user";
import { deleteItem } from "@/utils/storage";

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
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
}> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function getSelectKey() {
    const selectKey = location.pathname.split("/resume")[1];
    return selectKey.startsWith("/") ? selectKey.substring(1) : selectKey;
  }

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key, { replace: true });
  };

  function loginOut() {
    setUsername("");
    setToken("");
    deleteItem("username");
    deleteItem("token");
    navigate("/login");
  }

  return (
    <main className="grow flex gap-8 p-9 bg-slate-50">
      <aside className="flex flex-col w-[250px] shrink-0 py-8 rounded-lg shadow-sm bg-white">
        <h2 className="text-xl px-8 font-bold">
          <span>个人中心</span>
        </h2>
        <div className="my-4 px-4">
          <Menu
            style={{ borderInlineEndWidth: "0" }}
            selectedKeys={[getSelectKey()]}
            items={items}
            onClick={handleMenuClick}
          />
        </div>
        <div className="mt-auto px-8 ">
          <Button type="link" onClick={loginOut} icon={<CloseCircleOutlined />}>
            退出登录
          </Button>
        </div>
      </aside>

      <aside className="grow p-8 rounded-lg shadow-sm bg-white">
        <Outlet />
      </aside>
    </main>
  );
};

const mapDispatchToProps = {
  setUsername,
  setToken,
};

export default connect(null, mapDispatchToProps)(Resume);
