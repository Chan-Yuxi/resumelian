import type { RootState } from "@/store";
import type { UserState } from "@/type/definition";

import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { App } from "antd";

type P = {
  auth?: boolean;
  meta?: {
    title?: string;
  };
};

const Guard: React.FC<React.PropsWithChildren<P & UserState>> = ({
  children,
  auth,
  meta,
  token,
  username,
}) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { warning } = message;

  if (auth) {
    if (!token || !username) {
      warning(t("system:You haven't logged in yet. Please log in first"));
      return <Navigate to="/login" replace />;
    }
  }

  if (meta && meta.title) {
    document.title = meta.title;
  }

  return children;
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
    token: state.user.token,
  };
};

export default connect(mapStateToProps)(Guard);
