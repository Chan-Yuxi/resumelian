import { Pagination as AntdPagination, PaginationProps } from "antd";

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <AntdPagination
      {...props}
      showSizeChanger
      defaultCurrent={1}
      defaultPageSize={20}
    />
  );
};

export default Pagination;
