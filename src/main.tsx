import ReactDOM from "react-dom/client";
import App from "@/App.tsx";

import "@/index.css";
import "@/assets/styles/index.css";

import theme from "@/config/theme.json";
import { ConfigProvider } from "antd";

import store from "@/store";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </BrowserRouter>
);
