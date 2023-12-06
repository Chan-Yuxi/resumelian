import ReactDOM from "react-dom/client";
import App from "@/App.tsx";

// import "reset-css/reset.css";
import "@/index.css";
import "@/assets/styles/index.css";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
