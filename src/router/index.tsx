import { useRoutes, Navigate } from "react-router-dom";

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
    element: <CareerCounselor />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/interview-coach",
    element: <InterviewCoach />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/purchase",
    element: <Purchase />,
  },
  {
    path: "/resume",
    element: <Resume />,
    children: resumeChildren,
  },
  {
    path: "/resume-modification/:templateId?/:resumeId?",
    element: <ResumeModification />,
  },
  {
    path: "/template-center",
    element: <TemplateCenter />,
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
