import { useRoutes, Navigate } from "react-router-dom";

import CareerCounselor from "@/pages/CareerCounselor";
import Home from "@/pages/Home";
import InterviewCoach from "@/pages/InterviewCoach";
import Login from "@/pages/Login";
import Purchase from "@/pages/Purchase";
import Resume from "@/pages/Resume";
import ResumeModification from "@/pages/ResumeModification";
import TemplateCenter from "@/pages/TemplateCenter";

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
  },
  {
    path: "resume-modification",
    element: <ResumeModification />,
  },
  {
    path: "/template-center",
    element: <TemplateCenter />,
  },
];

const Router = () => {
  return useRoutes(routes);
};

export default Router;
