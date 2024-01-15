import Request from "./request";

function createAxios() {
  return new Request({
    // baseURL: "http://48s6hn.natappfree.cc/",
    // baseURL: "http://tyj57p.natappfree.cc",
    // baseURL: "https://jianlizhizuo.cn",
    baseURL: "/api",
    timeout: 10 * 1000,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

const defaultRequest = createAxios();
export default defaultRequest;
