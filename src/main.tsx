import ReactDOM from "react-dom/client";
import App from "@/App.tsx";

import "reset-css/reset.css";
import "@/index.css";
import "@/assets/styles/index.scss";

import theme from "@/config/antd-theme.json";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";

import store, { persistor } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "@/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={theme} locale={zhCN}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ConfigProvider>
);
