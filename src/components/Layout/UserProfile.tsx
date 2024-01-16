import type { RootState } from "@/store";

import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Avatar, Button } from "antd";
import { useNavigate } from "react-router-dom";

type P = {
  username: string;
  token: string;
};

const UserProfile: React.FC<P> = ({ token, username }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      {token ? (
        <>
          <span className="text-white font-bold me-2">陈先生</span>
          <Avatar
            className="w-10 h-10"
            src={`https://jianlizhizuo.cn/WeChat/getuserpic?userId=${username}`}
          />
        </>
      ) : (
        <Button
          className="rounded-none"
          type="primary"
          ghost
          onClick={() => navigate("/login", { replace: true })}
        >
          {t("lg.login/register")}
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
    token: state.user.token,
  };
};

export default connect(mapStateToProps)(UserProfile);
