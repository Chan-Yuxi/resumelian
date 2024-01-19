import Request from "./request";

function createAxios() {
  return new Request({
    // baseURL: "http://48s6hn.natappfree.cc/",
    // baseURL: "http://tyj57p.natappfree.cc",
    baseURL: "https://jianlizhizuo.cn/api",
    // baseURL: "/",s
    // baseURL: "/api",
    timeout: 10 * 1000,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Send-By-Front": "true",
    },
  });
}

/**
 * group-父级样式引用
 * peer-兄弟样式引用
 *
 *
 */

const defaultRequest = createAxios();
export default defaultRequest;

// 页面地址
// http://jianlizhizuo.cn/resume-modifcation

// 接口
// http://jianlizhizuo.cn/api/WeChat/accessToken
