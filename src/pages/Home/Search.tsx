import { Input } from "antd";
import { useTranslation } from "react-i18next";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const { t } = useTranslation();

  function handleSearchClick() {

    // TODO search something here...
  }

  const Suffix = (
    <div
      className="flex items-center text-base hover:cursor-pointer"
      onClick={handleSearchClick}
    >
      <SearchOutlined className="me-2" />
      <span className="hidden md:block">{t("home.search")}</span>
    </div>
  );

  return (
    <div className="w-full md:w-[425px] drop-shadow md:drop-shadow-none">
      <Input
        className="md:rounded-full md:px-8 py-2 border-none"
        placeholder={t("home.search_placeholder")}
        suffix={Suffix}
      />
    </div>
  );
};

export default Search;
