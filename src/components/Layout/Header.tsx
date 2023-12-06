import { Menu } from "antd";

const items = [
  {
    label: "首页",
    key: "home",
  },
  {
    label: "模板中心",
    key: "template-center",
  },
  {
    label: "面试辅导",
    key: "interview",
  },
  {
    label: "职业咨询",
    key: "job",
  },
  {
    label: "会员购买",
    key: "vip",
  },
  {
    label: "我的简历",
    key: "resume",
  },
];

const Header = () => {
  return (
    <header>
      <Menu items={items} mode="horizontal"></Menu>
    </header>
  );
};

export default Header;
