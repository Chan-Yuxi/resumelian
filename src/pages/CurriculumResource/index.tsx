import { getCourseListOfPage } from "@/api/course";
import { usePagination } from "@/hooks";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CourseCard } from "./components/CourseCard";

import Pagination from "@/components/Pagination";

export default function CurriculumResource() {
  const [courseListLoading, courseList, paginationProps] = usePagination(
    (pageNum, pageSize) => getCourseListOfPage(pageNum, pageSize)
  );

  return (
    <main className="generic-container p-6 sm:p-9 flex flex-col">
      <div className="grow">
        {courseListLoading ? (
          <div className="self-stretch flex justify-center items-center">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} />} />
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {courseList &&
              courseList.map((course) => (
                <CourseCard key={course.courseId} course={course} />
              ))}
          </div>
        )}
      </div>
      <div className="my-4 text-center">
        <Pagination {...paginationProps} />
      </div>
    </main>
  );
}
