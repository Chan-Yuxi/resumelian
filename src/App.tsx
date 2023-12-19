import Router from "@/router";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

import { App as AppWrapperComponent, Layout } from "antd";

const App = () => {
  return (
    <AppWrapperComponent>
      <Layout>
        <Header />
        <Layout.Content>
          <div style={{ height: "calc(100vh - 64px)", minHeight: "900px" }}>
            <Router />
          </div>
        </Layout.Content>
        <Footer />
      </Layout>
    </AppWrapperComponent>
  );
};

export default App;
