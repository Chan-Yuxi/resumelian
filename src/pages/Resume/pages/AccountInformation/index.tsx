import type { RootState } from "@/store";
import type { User } from "@/type/definition";

import { connect } from "react-redux";

import { Avatar, Button, Form, Row, Col, Input, Select, App } from "antd";
import { useEffect, useState } from "react";
import { retrieveUserInfo, updateUserInfo } from "@/api/user";
import { useForm } from "antd/es/form/Form";

type P = {
  username: string;
};

const AccountInformation: React.FC<P> = ({ username }) => {
  const [userInfo, setUserInfo] = useState<User>();
  const [form] = useForm();

  const app = App.useApp();
  const { message } = app;

  useEffect(() => {
    retrieveUserInfo(username).then((info) => {
      if (info) {
        setUserInfo(info);
        form.setFieldsValue(info);
      }
    });
  }, [username, form]);

  function saveUserProfile() {
    const beUpdatedUserInfo = form.getFieldsValue() as User;

    beUpdatedUserInfo.age = Number(beUpdatedUserInfo.age);
    beUpdatedUserInfo.phone = Number(beUpdatedUserInfo.phone);

    updateUserInfo(beUpdatedUserInfo, username).then((res) => {
      if (res) {
        message.success("修改成功");
      }
    });
  }

  return (
    <div>
      <h1 className="text-lg text-slate-700 pb-2 border border-0 border-b border-solid border-zinc-100">
        个人信息
      </h1>
      <div className="flex my-8">
        <Avatar size={100} src="/avatar.png" />
        <div className="flex flex-col gap-[2px] ms-8  py-2">
          <p className="text-xl font-bold">{userInfo?.name}</p>
          <p className="text-slate-500">UserID&nbsp;:&nbsp;{username}</p>
          {/*  */}
          <p className="text-green-600 font-bold">
            ChatGPT 剩余使用次数：{userInfo?.aiNumber}
          </p>
          {/*  */}
        </div>
        <div className="flex flex-col gap-[2px]  py-2 ms-auto">
          <p className="text-slate-500">只支持JPG、JPEG或PNG格式的图片文件</p>
          <div className="mt-auto">
            <Button type="primary" ghost>
              更改头像
            </Button>
            <Button type="link">删除头像</Button>
          </div>
        </div>
      </div>
      <div>
        <Form layout="vertical" className="w-2/5" form={form}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="name" label="姓名">
                <Input placeholder="请填写姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="age" label="年龄">
                <Input placeholder="请填写年龄" type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="sex" label="性别">
                <Select
                  placeholder="请选择性别"
                  options={[
                    {
                      label: "男",
                      value: "男",
                    },
                    {
                      label: "女",
                      value: "女",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="电子邮箱">
                <Input placeholder="请填写您的电子邮箱" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="手机号">
                <Input placeholder="请填写手机号码" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="university" label="毕业院校">
                <Input placeholder="请输入毕业院校" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="speciality" label="专业">
                <Input placeholder="请输入专业" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="intention" label="工作意向">
                <Input placeholder="请输入工作意向" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="text-end">
        <Button type="primary" onClick={saveUserProfile}>
          保存更改
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(AccountInformation);
