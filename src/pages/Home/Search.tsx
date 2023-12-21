import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  function handleSearchClick() {
    // TODO
  }

  const Suffix = (
    <div
      className="flex items-center text-base hover:cursor-pointer"
      onClick={handleSearchClick}
    >
      <SearchOutlined className="me-2" />
      <span className="hidden md:block">搜索</span>
    </div>
  );

  return (
    <div className="w-full md:w-[425px] drop-shadow md:drop-shadow-none">
      <Input
        className="md:rounded-full md:px-8 py-2 border-none"
        placeholder="搜索简历..."
        suffix={Suffix}
      />
    </div>
  );
};

export default Search;
