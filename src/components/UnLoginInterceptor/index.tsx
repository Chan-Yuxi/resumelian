import type { RootState } from "@/store";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { App } from "antd";

type P = {
  username: string;
};

const UnLoginInterceptor: React.FC<React.PropsWithChildren<P>> = ({
  username,
  children,
}) => {
  const navigate = useNavigate();
  const { message } = App.useApp();

  const interceptor = () => {
    if (!username) {
      message.warning("请先登录~");
      navigate("/login");
    }
  };

  return <div onClick={interceptor}>{children}</div>;
};

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(UnLoginInterceptor);
