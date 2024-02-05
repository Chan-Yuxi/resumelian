import { getCourseList } from "@/api/course";
import { useRequest } from "@/hooks";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CourseCard } from "./components/CourseCard";
// import { useEffect } from "react";
// import { getItem } from "@/utils/storage";

export default function CurriculumResource() {
  const [courseListLoading, courseList] = useRequest(() => getCourseList());

  // useEffect(() => {
  //   const username = getItem("username");
  //   if (username) {
  //     alreadyBuy(username).then((data) => {
  //       console.log("已经购买");
  //       console.log(data);
  //     });
  //   }
  // }, []);

  return (
    <main className="flex flex-col min-h-reach-bottom">
      {courseListLoading ? (
        <div className="grow flex justify-center items-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} />} />
        </div>
      ) : (
        <div className="p-6 flex flex-wrap gap-6">
          {courseList &&
            courseList.map((course) => (
              <CourseCard key={course.courseId} course={course} />
            ))}
        </div>
      )}
    </main>
  );
}
