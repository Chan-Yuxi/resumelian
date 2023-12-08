import { useRoutes, Navigate } from "react-router-dom";

import Login from "@/pages/Login";
import Home from "@/pages/Home";
import ResumeModification from "@/pages/ResumeModification";

const routes = [
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "resume-modification",
    element: <ResumeModification />,
  },
];

const Router = () => {
  return useRoutes(routes);
};

export default Router;
