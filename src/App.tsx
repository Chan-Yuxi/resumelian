import Router from "@/router";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

import { Layout } from "antd";

const App = () => {
  return (
    <Layout>
      <Header />
      <Layout.Content>
        <div style={{ height: "calc(100vh - 64px)", minHeight: "900px" }}>
          <Router />
        </div>
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default App;
