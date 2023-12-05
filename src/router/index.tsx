import { BrowserRouter, useRoutes } from "react-router-dom";

import ResumeModification from "@/pages/ResumeModification";

const routes = [
  {
    path: "resume-modification",
    element: <ResumeModification />,
  },
];

const Router = () => {
  return <BrowserRouter>{useRoutes(routes)}</BrowserRouter>;
};

export default Router;
