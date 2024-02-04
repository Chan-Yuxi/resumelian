import {
  getCourseChapters,
  getWxQRCodeUrl,
  getAliQRCodeUrl,
} from "@/api/course";
import { useRequest } from "@/hooks";
import { useLocation } from "react-router-dom";
import { Skeleton, Button } from "antd";
import { Course } from "@/type/definition";
import { useRef, useState } from "react";
import PayCard from "@/components/PayCard";
import { RootState } from "@/store";
import { connect } from "react-redux";
import { LockOutlined } from "@ant-design/icons";

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
    title.current?.scrollIntoView();
  }

  // hasPaid 标注用户是否已经付款

  // 一开始的时候
  // 视频资源还没开始请求，使用 state
  // 如果视频已经购买或者 hasPaid 为 true
  // 发起目录请求
  // 然后列出目录
  // 根据目录选择地址

  function getCourseDetails() {
    // TODO
  }

  // 如果用户已经付款，应该发起请求
  const [hasPaid, setHasPaid] = useState(false);
  function handlePaid() {
    setHasPaid(true);
  }

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
              <Button
                type="primary"
                ghost
                loading={loading}
                onClick={openPayCard}
              >
                立即支付
              </Button>
            </div>
          </div>

          <div className="text-slate-500 text-lg">
            <p>发布日期：2023/03/21 | 516次学习</p>
          </div>

          <div className="text-slate-400 my-48 text-center">
            <LockOutlined style={{ fontSize: "4rem" }} />
            <p>购买后查看完整内容</p>
          </div>

          <div>
            <ul className="border border-1 border-solid border-slate-300">
              <li className="p-4 text-lg font-bold bg-gray-200">
                目录（共{courseChapters.length}章）
              </li>
              {courseChapters.map((chapter) => {
                return (
                  <li
                    onClick={() => selectChapter(chapter.chapterId)}
                    className="text-blue-500 p-4 bg-gray-50 even:bg-gray-100 hover:bg-blue-100 transition-all cursor-pointer"
                    key={chapter.chapterId}
                  >
                    {chapter.chapterName}
                  </li>
                );
              })}
            </ul>
          </div>

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
