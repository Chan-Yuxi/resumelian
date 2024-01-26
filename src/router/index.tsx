import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

import { App as AppWrapperComponent, Layout } from "antd";

import Guard from "@/components/Guard";

import Upload from "@/pages/_Upload";
import NotFound from "@/pages/404NotFound";
import CareerCounselor from "@/pages/CareerCounselor";
import Home from "@/pages/Home";
import InterviewCoach from "@/pages/InterviewCoach";
import Login from "@/pages/Login";
import Purchase from "@/pages/Purchase";
import ResourceMall from "@/pages/ResourceMall";
import ResourceDetials from "@/pages/ResourceDetials";
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
    path: "",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "career-counselor",
    element: (
      <Guard meta={{ title: "职业咨询" }}>
        <CareerCounselor />
      </Guard>
    ),
  },
  {
    path: "home",
    element: (
      <Guard meta={{ title: "首页" }}>
        <Home />
      </Guard>
    ),
  },
  {
    path: "interview-coach",
    element: (
      <Guard meta={{ title: "面试辅导" }}>
        <InterviewCoach />
      </Guard>
    ),
  },
  {
    path: "login",
    element: (
      <Guard meta={{ title: "登录" }}>
        <Login />
      </Guard>
    ),
  },
  {
    path: "purchase",
    element: (
      <Guard meta={{ title: "会员购买" }}>
        <Purchase />
      </Guard>
    ),
  },
  {
    path: "resource-mall",
    element: (
      <Guard meta={{ title: "笔试资料" }}>
        <ResourceMall />
      </Guard>
    ),
  },
  {
    path: "resource-detials",
    element: (
      <Guard meta={{ title: "笔试资料详情" }}>
        <ResourceDetials />
      </Guard>
    ),
  },

  {
    path: "resume",
    element: (
      <Guard auth meta={{ title: "我的简历" }}>
        <Resume />
      </Guard>
    ),
    children: resumeChildren,
  },
  {
    path: "resume-modification/:templateId?/:resumeId?",
    element: (
      <Guard auth meta={{ title: "简历制作" }}>
        <ResumeModification />
      </Guard>
    ),
  },
  {
    path: "template-center",
    element: (
      <Guard meta={{ title: "模板中心" }}>
        <TemplateCenter />
      </Guard>
    ),
  },
  {
    path: "_upload",
    element: <Upload />,
  },
  {
    path: "404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];

export default createBrowserRouter([
  {
    path: "/",
    children: routes,
    element: (
      <AppWrapperComponent>
        <Layout>
          <Header />
          <Layout.Content>
            <div
              className="flex flex-col"
              style={{ minHeight: "calc(100vh - 64px)" }}
            >
              <Outlet />
            </div>
          </Layout.Content>
          <Footer />
        </Layout>
      </AppWrapperComponent>
    ),
  },
]);
