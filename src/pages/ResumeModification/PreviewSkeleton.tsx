import { Skeleton } from "antd";

const PreviewSkeleton: React.FC<
  React.PropsWithChildren<{ loading: boolean }>
> = (props) => (
  <Skeleton
    className="h-full p-8 bg-white shadow"
    active
    loading={props.loading}
    title={{ width: 300 }}
    paragraph={{
      rows: 8,
      width: [500, 100, 700, 300, 300, 200, 500, 500],
    }}
  >
    {props.children}
  </Skeleton>
);

export default PreviewSkeleton;
