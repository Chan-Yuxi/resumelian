import { getCourseList } from "@/api/course";
import { useRequest } from "@/hooks";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CourseCard } from "./components/CourseCard";

export default function CurriculumResource() {
  const [courseListLoading, courseList] = useRequest(() => getCourseList());

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
