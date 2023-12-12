import Router from "@/router";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

import { Layout } from "antd";

const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <div style={{ height: "calc(100vh - 64px)", minHeight: "900px" }}>
          <Router />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default App;
