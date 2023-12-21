import type { RootState } from "@/store";

import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

type P = {
  username: string;
  token: string;
};

const UserProfile: React.FC<P> = ({ token }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      {token ? (
        <div>User Information</div>
      ) : (
        <Button
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
