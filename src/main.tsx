import ReactDOM from "react-dom/client";
import App from "@/App.tsx";

import "reset-css/reset.css";
import "@/index.css";
import "@/assets/styles/index.scss";

import { BrowserRouter } from "react-router-dom";

import theme from "@/config/antd-theme.json";
import { ConfigProvider } from "antd";

import store, { persistor } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "@/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </BrowserRouter>
);
