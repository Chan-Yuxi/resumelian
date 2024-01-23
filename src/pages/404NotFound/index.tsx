import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Result, Button } from "antd";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="h-reach-bottom flex justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle={t("404.title")}
        extra={
          <Button onClick={() => navigate("/home")} type="primary">
            {t("404.back_home")}
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
