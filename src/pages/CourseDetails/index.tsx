import {
  getCourseChapters,
  getWxQRCodeUrl,
  getAliQRCodeUrl,
} from "@/api/course";
import { useRequest } from "@/hooks";
import { useLocation } from "react-router-dom";
import { Skeleton, Button } from "antd";
import { Course } from "@/type/definition";
import { useState } from "react";
import PayCard from "@/components/PayCard";
import { RootState } from "@/store";
import { connect } from "react-redux";

function CourseDetail({ username }: { username: string }) {
  const location = useLocation();
  const { course } = location.state as { course: Course };

  const [courseChaptersLoading, courseChapters] = useRequest(() =>
    getCourseChapters(course.courseId)
  );

  const [activeChapter, setActiveChapter] = useState<number>();

  const [wxQRCodeUrl, setWxQRCodeUrl] = useState("");
  const [aliQRCodeUrl, setAliQRCodeUrl] = useState("");

  const [loading, setLoading] = useState(false);
  function openPayCard() {
    setLoading(true);
    Promise.all([
      getWxQRCodeUrl(username, course.discountedPrice, course.courseId),
      getAliQRCodeUrl(username, course.discountedPrice, course.courseId),
    ])
      .then((res) => {
        if (res[0] && res[1]) {
          setWxQRCodeUrl(res[0].code_url);
          setAliQRCodeUrl(res[1].code_url);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function selectChapter(chapterId: number) {
    setActiveChapter(chapterId);
  }

  const [hasPaid, setHasPaid] = useState(false);
  function handlePaid() {
    setHasPaid(true);
  }

  return (
    <main className="min-h-reach-bottom p-6 sm:px-64 sm:py-12">
      {courseChaptersLoading ? (
        <div className="flex flex-col gap-4">
          <Skeleton.Input active />
          <Skeleton active />
          <Skeleton.Input active />
          <Skeleton active />
          <Skeleton active />
        </div>
      ) : courseChapters ? (
        <div>
          <div className="mb-4">
            <h1 className="text-3xl">{course.courseName}</h1>
            <h2 className="text-slate-500">{course.courseIntroduction}</h2>
          </div>
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-950">
            <video
              className="w-full aspect-[2/1] sm:aspect-[7/3]"
              preload="auto"
              controls={activeChapter !== undefined}
              muted
              autoPlay
              src={
                activeChapter
                  ? `https://jianlizhizuo.cn/static/${course.courseId}_chapter_${activeChapter}.mp4`
                  : undefined
              }
            />
            {!activeChapter ? (
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="text-white text-xl text-center">
                  <p className="">您还没有购买该课程</p>
                  <p>
                    <a href="">购买解锁</a>
                  </p>
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex items-end bg-gradient-to-br from-orange-500 to-red-500 p-2 sm:p-4">
            <div className="text-white">
              <span>￥</span>
              <span className="font-bold text-2xl">399</span>
            </div>
            <div className="line-through text-slate-200 ms-2">
              <span>￥</span>
              <span className="font-bold">599</span>
            </div>
            <div className="ms-auto">
              <Button type="primary" loading={loading} onClick={openPayCard}>
                立即支付
              </Button>
            </div>
          </div>

          <h2 className="my-2 font-bold">目录</h2>
          <ul>
            {courseChapters.map((chapter) => {
              return (
                <li
                  onClick={() => selectChapter(chapter.chapterId)}
                  className="text-blue-500 underline"
                  key={chapter.chapterId}
                >
                  {chapter.chapterName}
                </li>
              );
            })}
          </ul>
          <PayCard
            websocketUrl="wss://jianlizhizuo.cn/api/websocket"
            wxQRCodeUrl={wxQRCodeUrl}
            aliQRCodeUrl={aliQRCodeUrl}
            price={course.discountedPrice}
            name={course.courseName}
            onPaid={handlePaid}
          />
        </div>
      ) : null}
    </main>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(CourseDetail);
