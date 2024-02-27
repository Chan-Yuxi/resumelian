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

/**
 * Brother, you are blessed. I am the previous frontend, and I have something to say to you here. This website is just a pile of shit.
 * Don't blame me for any problems. Demand changes are very frequent, come on.
 * Don't show this passage to the boss.
 * And act and cherish.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={theme} locale={zhCN}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ConfigProvider>
);
