import type { RootState } from "@/store";

import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Button } from "antd";

type P = {
  username: string;
  token: string;
};

const UserProfile: React.FC<P> = ({ token }) => {
  const { t } = useTranslation();

  return (
    <div>
      {token ? (
        <div>User Information</div>
      ) : (
        <Button type="primary" ghost>
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
