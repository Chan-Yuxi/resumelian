import { Course } from "@/types/definition";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

export function CourseCard({ course }: { course: Course }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/course-detail", {
      state: {
        course: course,
      },
    });
  }

  return (
    <Card
      onClick={handleClick}
      className="w-full sm:w-64 cursor-pointer transition-all hover:shadow"
      cover={
        <img
          className="h-64 sm:h-48"
          src={`https://jianlizhizuo.cn/static/course_${course.courseId}.jpg`}
        />
      }
    >
      <p className="font-bold">{course.courseName}</p>
      <p>
        <span className="font-bold text-orange-500">
          <span>￥</span>
          <span className="text-lg">{course.discountedPrice}</span>
        </span>
        <span className="ms-2 line-through text-slate-500">
          <span>￥</span>
          <span>{course.originalPrice}</span>
        </span>
      </p>
      <p className="text-slate-500">{course.courseIntroduction}</p>
    </Card>
  );
}
