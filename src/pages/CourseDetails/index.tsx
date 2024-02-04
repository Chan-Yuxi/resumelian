import {
  getCourseChapters,
  getWxQRCodeUrl,
  getAliQRCodeUrl,
  getCourseTopThreeList,
  getCourseLatestThreeList,
  alreadyBuy,
} from "@/api/course";
import { useRequest } from "@/hooks";
import { useLocation } from "react-router-dom";
import { Skeleton, Button, Spin } from "antd";
import { Course } from "@/type/definition";
import { useEffect, useRef, useState } from "react";
import PayCard from "@/components/PayCard";
import { RootState } from "@/store";
import { connect } from "react-redux";
import { LockOutlined } from "@ant-design/icons";
import { CourseCard } from "../CurriculumResource/components/CourseCard";
import { getItem } from "@/utils/storage";

function CourseDetail({ username }: { username: string }) {
  const location = useLocation();
  const { course } = location.state as { course: Course };

  const [courseChaptersLoading, courseChapters] = useRequest(() =>
    getCourseChapters(course.courseId)
  );

  const [topThreeCourseLoading, topThreeCourse] = useRequest(() =>
    getCourseTopThreeList()
  );
  const [latestThreeCourseLoading, latestThreeCourse] = useRequest(() =>
    getCourseLatestThreeList()
  );

  const [activeChapter, setActiveChapter] = useState<number>();
  const [activeChapterName, setActiveChapterName] = useState<string>();

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

  function selectChapter(chapterId: number, chapterName: string) {
    setActiveChapter(chapterId);
    setActiveChapterName(chapterName);
    title.current?.scrollIntoView();
  }

  const [hasPaid, setHasPaid] = useState(false);
  function handlePaid() {
    setHasPaid(true);
  }

  useEffect(() => {
    const username = getItem("username");
    if (username) {
      alreadyBuy(username).then((data) => {
        console.log(data, course);
        if (data && data[0]) {
          const alreadyBuy = data[0].Course.some(
            (id) => id === String(course.courseId)
          );
          if (alreadyBuy) {
            setHasPaid(alreadyBuy);
          }
        }
      });
    }
    //eslint-disable-next-line
  }, []);

  const title = useRef<HTMLDivElement>(null);

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
          <div ref={title} className="mb-4">
            <h1 className="text-3xl">{course.courseName}</h1>
            <h2 className="text-slate-500">{course.courseIntroduction}</h2>
          </div>

          {/* 视频播放模块 */}
          {/* style={{
              backgroundImage: hasPaid
                ? undefined
                : `url(https://jianlizhizuo.cn/static/course_${course.courseId}.jpg)`,
              backgroundSize: "cover",
            }} */}
          <section className="w-full aspect-[2/1] sm:aspect-[7/3] relative bg-gradient-to-br from-gray-800 to-gray-950">
            {/* 未购买不允许查看 */}
            {!hasPaid ? (
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="text-white text-xl text-center">
                  <p>您还没有购买该课程</p>
                  <p
                    className="text-orange-500 cursor-pointer hover:underline"
                    onClick={openPayCard}
                  >
                    购买解锁
                  </p>
                </div>
              </div>
            ) : (
              <video
                className="w-full aspect-[2/1] sm:aspect-[7/3]"
                preload="auto"
                controls={activeChapter !== undefined}
                muted
                autoPlay
                src={
                  activeChapter
                    ? `https://jianlizhizuo.cn/static/course/${course.courseName}/${course.courseId}_chapter_${activeChapter}.mp4`
                    : undefined
                }
              />
            )}
          </section>

          {/* 如果已经支付就显示目录，如果未支付就显示价格 */}
          <div className="flex items-end bg-gradient-to-br from-orange-500 to-red-500 p-2 sm:p-4">
            {hasPaid ? (
              <div className="text-white">
                <p>正在观看：{activeChapterName}</p>
              </div>
            ) : (
              <>
                <div className="text-white">
                  <span>￥</span>
                  <span className="font-bold text-2xl">
                    {course.discountedPrice}
                  </span>
                </div>
                <div className="line-through text-slate-200 ms-2">
                  <span>￥</span>
                  <span className="font-bold">{course.originalPrice}</span>
                </div>
                <div className="ms-auto">
                  <Button danger loading={loading} onClick={openPayCard}>
                    立即支付
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* 
          <div className="text-slate-500 text-lg">
            <p>发布日期：2023/03/21 | 516次学习</p>
          </div>
          */}

          <section>
            {!hasPaid ? (
              <div className="text-slate-400 my-48 text-center">
                <LockOutlined style={{ fontSize: "4rem" }} />
                <p>购买后查看完整内容</p>
              </div>
            ) : (
              <div>
                <ul className="border border-1 border-solid border-slate-300">
                  <li className="p-4 text-lg font-bold bg-gray-200">
                    目录（共{courseChapters.length}章）
                  </li>
                  {courseChapters.map((chapter) => {
                    return (
                      <li
                        onClick={() =>
                          selectChapter(chapter.chapterId, chapter.chapterName)
                        }
                        className="text-blue-500 p-4 bg-gray-50 even:bg-gray-100 hover:bg-blue-100 transition-all cursor-pointer"
                        key={chapter.chapterId}
                      >
                        {chapter.chapterName}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>

          {/* 更多课程 */}
          <section>
            <h3 className="text-2xl my-4 font-bold">热门课程</h3>
            <div className="flex flex-wrap gap-4">
              {topThreeCourseLoading ? (
                <Spin />
              ) : (
                topThreeCourse
                  ?.filter((c) => c.courseId !== course.courseId)
                  .map((c) => <CourseCard key={c.courseId} course={c} />)
              )}
            </div>
            <h3 className="text-2xl my-4 font-bold">最新课程</h3>
            <div className="flex flex-wrap gap-4">
              {latestThreeCourseLoading ? (
                <Spin />
              ) : (
                latestThreeCourse
                  ?.filter((c) => c.courseId !== course.courseId)
                  .map((c) => <CourseCard key={c.courseId} course={c} />)
              )}
            </div>
          </section>

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
