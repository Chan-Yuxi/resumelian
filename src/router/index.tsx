import { BrowserRouter, useRoutes, Navigate } from "react-router-dom";

import Home from "@/pages/Home";
import ResumeModification from "@/pages/ResumeModification";

const routes = [
  {
    path: "/",
    element: <Navigate to="/home" replace />,
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
