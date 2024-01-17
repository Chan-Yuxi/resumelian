import type { RootState } from "@/store";
import type { User } from "@/type/definition";
import type { UploadProps } from "antd";

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  Avatar,
  Button,
  Form,
  Row,
  Col,
  Input,
  Select,
  App,
  Upload,
  Skeleton,
  Modal,
  message,
} from "antd";

import { BASE_URL, SEX_OPTIONS } from "@/constant";
import { retrieveUserInfo, updateUserInfo } from "@/api/user";
import { getItem } from "@/utils/storage";
import { useRequest } from "@/hooks";
import { useNavigate } from "react-router-dom";

type FileType = {
  type: string;
  size: number;
} & Blob;

type P = {
  username: string;
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const AccountInformation: React.FC<P> = ({ username }) => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [form] = Form.useForm<User>();
  const navigate = useNavigate();

  const [userInfoLoading, userInfo, setUserInfo] = useRequest<User>(() =>
    retrieveUserInfo(username)
  );

  useEffect(() => {
    userInfo && form.setFieldsValue(userInfo);
  }, [form, userInfo]);

  const [uploadLoading, setUploadLoading] = useState(false);
  const [avatar, setAvatar] = useState<string>(
    `${BASE_URL}/WeChat/getuserpic?userId=${username}`
  );
  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setUploadLoading(false);
        setAvatar(url);
      });
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [okLoading, setOkLoading] = useState(false);
  function saveUserInfo() {
    const beUpdatedUserInfo = form.getFieldsValue();
    setOkLoading(true);

    updateUserInfo(beUpdatedUserInfo, username)
      .then((newUserInfo) => {
        if (newUserInfo) {
          setUserInfo(newUserInfo);
          message.success(t("system:Modified successfully"));
          setModalOpen(false);
        }
      })
      .finally(() => {
        setOkLoading(false);
      });
  }

  return (
    <main>
      <h1 className="text-lg text-slate-700 pb-2 border border-0 border-b border-solid border-zinc-100">
        {t("resume:Personal Information")}
      </h1>
      <section className="flex my-8">
        <div>
          <Upload
            disabled={uploadLoading}
            name="file"
            showUploadList={false}
            listType="picture-circle"
            action={`https://jianlizhizuo.cn/WeChat/updatepic?userId=${username}`}
            headers={{
              Authorization: getItem("token")!,
            }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            <div className="relative [--show-upload-tip:none] hover:[--show-upload-tip:flex]">
              <Avatar size={100} src={avatar} alt="avatar" />
              <div
                className="justify-center items-center absolute left-0 top-0 w-full h-full text-white rounded-full cursor-pointer bg-gray-800/50"
                style={{ display: "var(--show-upload-tip)" }}
              >
                <span>{uploadLoading ? "上传中..." : "上传头像"}</span>
              </div>
            </div>
          </Upload>
        </div>

        <div className="ms-8 py-2">
          <Skeleton
            loading={userInfoLoading}
            active
            title={{ width: 500 }}
            paragraph={{
              rows: 9,
              width: [200, 300, 200, 250, 200, 350, 150, 300, 200],
            }}
          >
            {userInfo ? (
              <div className="flex flex-col gap-4">
                <p>
                  <span className="text-xl me-6 font-bold">
                    {userInfo.name}
                  </span>
                  <span className="text-lg me-6">{userInfo.sex}</span>
                  <span className="text-lg me-6 text-green-600 underline ">
                    {t("resume:Remaining usage of ChatGPT")}
                    {userInfo.aiNumber}
                    {t("resume:label Count")}
                  </span>
                  <span className="text-lg">
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => navigate("/purchase")}
                    >
                      {t("resume:Go recharge")}
                    </Button>
                  </span>
                </p>
                <p className="text-slate-500">{username}</p>
                <p>
                  <span>{t("resume:label Age with colon")}</span>
                  <span>{userInfo.age}</span>
                </p>
                <p>
                  <span>{t("resume:label Email with colon")}</span>
                  <span>{userInfo.email}</span>
                </p>
                <p>
                  <span>{t("resume:label Phone with colon")}</span>
                  <span>{userInfo.phone}</span>
                </p>
                <p>{userInfo.university}</p>
                <p>{userInfo.speciality}</p>
                <p>{userInfo.intention}</p>
              </div>
            ) : (
              <div className="text-red-500">Error: No user information</div>
            )}
          </Skeleton>
        </div>

        <div className="grow text-right">
          <Button type="primary" ghost onClick={() => setModalOpen(true)}>
            {t("resume:Modify personal information")}
          </Button>
        </div>
      </section>

      <Modal
        centered
        open={modalOpen}
        okText={t("system:label confirm")}
        cancelText={t("system:label cancel")}
        confirmLoading={okLoading}
        onCancel={() => setModalOpen(false)}
        onOk={saveUserInfo}
      >
        <section>
          <Form form={form} layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="name" label={t("resume:label Name")}>
                  <Input placeholder={t("resume:Please fill in your name")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="age" label={t("resume:label Age")}>
                  <Input
                    placeholder={t("resume:Please fill in your age")}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="sex" label={t("resume:label Sex")}>
                  <Select
                    placeholder={t("resume:Please select gender")}
                    options={SEX_OPTIONS}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="email" label={t("resume:label Email")}>
                  <Input
                    placeholder={t("resume:Please fill in your email address")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="phone" label={t("resume:label Phone")}>
                  <Input
                    placeholder={t("resume:Please fill in your phone number")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="university"
                  label={t("resume:label University")}
                >
                  <Input
                    placeholder={t("resume:Please enter your graduation")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="speciality" label={t("resume:label Major")}>
                  <Input placeholder={t("resume:Please enter the major")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="intention" label={t("resume:label Intention")}>
                  <Input placeholder={t("resume:Please enter your work")} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </section>
      </Modal>
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(AccountInformation);
