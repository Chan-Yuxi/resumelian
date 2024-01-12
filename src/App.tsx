import router from "@/router";
import { RouterProvider } from "react-router-dom";

// import Header from "@/components/Layout/Header";
// import Footer from "@/components/Layout/Footer";

// import { App as AppWrapperComponent, Layout } from "antd";

const App = () => {

  /**
   * useBlocker 仅能在 createBrowserRouter 下使用
   * 因此取消使用 <BrowserRouter />
   */
  return (
    <RouterProvider router={router} />
    // <AppWrapperComponent>
    //   <Layout>
    //     <Header />
    //     <Layout.Content>
    //       <div
    //         className="flex flex-col"
    //         style={{ minHeight: "calc(100vh - 64px)" }}
    //       >
    //       </div>
    //     </Layout.Content>
    //     <Footer />
    //   </Layout>
    // </AppWrapperComponent>
  );
};

export default App;
