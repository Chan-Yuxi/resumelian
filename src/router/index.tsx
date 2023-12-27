import { useRoutes, Navigate } from "react-router-dom";

import Guard from "@/components/Guard";

import Upload from "@/pages/_Upload";
import NotFound from "@/pages/404NotFound";
import CareerCounselor from "@/pages/CareerCounselor";
import Home from "@/pages/Home";
import InterviewCoach from "@/pages/InterviewCoach";
import Login from "@/pages/Login";
import Purchase from "@/pages/Purchase";
import Resume from "@/pages/Resume";
import ResumeModification from "@/pages/ResumeModification";
import TemplateCenter from "@/pages/TemplateCenter";

import AccountInformation from "@/pages/Resume/pages/AccountInformation";
import MyResume from "@/pages/Resume/pages/MyResume";
import MyOrder from "@/pages/Resume/pages/MyOrder";
import Record from "@/pages/Resume/pages/Record";

const resumeChildren = [
  {
    index: true,
    element: <AccountInformation />,
  },
  {
    path: "mine",
    element: <MyResume />,
  },
  {
    path: "order",
    element: <MyOrder />,
  },
  {
    path: "record",
    element: <Record />,
  },
];

const routes = [
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/career-counselor",
    element: (
      <Guard meta={{ title: "职业咨询" }}>
        <CareerCounselor />
      </Guard>
    ),
  },
  {
    path: "/home",
    element: (
      <Guard meta={{ title: "首页" }}>
        <Home />
      </Guard>
    ),
  },
  {
    path: "/interview-coach",
    element: (
      <Guard meta={{ title: "面试辅导" }}>
        <InterviewCoach />
      </Guard>
    ),
  },
  {
    path: "/login",
    element: (
      <Guard meta={{ title: "登录" }}>
        <Login />
      </Guard>
    ),
  },
  {
    path: "/purchase",
    element: (
      <Guard meta={{ title: "会员购买" }}>
        <Purchase />
      </Guard>
    ),
  },
  {
    path: "/resume",
    element: (
      <Guard auth meta={{ title: "我的简历" }}>
        <Resume />
      </Guard>
    ),
    children: resumeChildren,
  },
  {
    path: "/resume-modification/:templateId?/:resumeId?",
    element: (
      <Guard auth meta={{ title: "简历制作" }}>
        <ResumeModification />
      </Guard>
    ),
  },
  {
    path: "/template-center",
    element: (
      <Guard meta={{ title: "模板中心" }}>
        <TemplateCenter />
      </Guard>
    ),
  },
  {
    path: "/_upload",
    element: <Upload />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];

const Router = () => {
  return useRoutes(routes);
};

export default Router;
