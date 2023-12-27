import type { RootState } from "@/store";
import { connect } from "react-redux";

import { Avatar, Button, Form, Row, Col, Input } from "antd";
import { useEffect, useState } from "react";
import { UserInfo, retrieveUserInfo } from "@/api/user";

type P = {
  username: string;
};

const AccountInformation: React.FC<P> = ({ username }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(() => {
    retrieveUserInfo(username).then((info) => {
      if (info) {
        setUserInfo(info);
      }
    });
  }, [username]);

  return (
    <div>
      <h1 className="text-lg text-slate-700 pb-2 border border-0 border-b border-solid border-zinc-100">
        个人信息
      </h1>
      <div className="flex my-8">
        <Avatar size={100} src="/avatar.png" />
        <div className="flex flex-col gap-[2px] ms-8  py-2">
          <p className="text-xl font-bold">Aa123456</p>
          <p className="text-slate-500">UserID&nbsp;:&nbsp;{username}</p>
          {userInfo?.member ? (
            <p className="mt-auto">
              <span className="text-yellow-500 font-bold me-4">会员</span>
              <span>至 {userInfo.expireTime}</span>
            </p>
          ) : (
            <p className="mt-auto">普通用户</p>
          )}
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
        <Form layout="vertical" className="w-2/5">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="姓名">
                <Input
                  className="py-2 bg-zinc-50 border-0"
                  placeholder="Resumelian User"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="用户名">
                <Input
                  className="py-2 bg-zinc-50 border-0"
                  placeholder="Aa123456"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Email">
                <Input
                  className="py-2 bg-zinc-50 border-0"
                  placeholder="2438149743@qq.com"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="手机号">
                <Input
                  className="py-2 bg-zinc-50 border-0"
                  placeholder="183*****128"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="text-end">
        <Button type="primary">保存更改</Button>
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
