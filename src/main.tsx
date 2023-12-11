import ReactDOM from "react-dom/client";
import App from "@/App.tsx";

import "reset-css/reset.css";
import "@/index.css";
import "@/assets/styles/index.scss";

import { BrowserRouter } from "react-router-dom";

import theme from "@/config/antd-theme.json";
import { ConfigProvider } from "antd";

import store from "@/store";
import { Provider } from "react-redux";

import "@/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </BrowserRouter>
);
