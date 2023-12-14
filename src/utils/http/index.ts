import Request from "./request";

function createAxios() {
  return new Request({
    baseURL: "http://h6erbg.natappfree.cc/",
    // baseURL: "/api",
    timeout: 10 * 1000,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

const defaultRequest = createAxios();
export default defaultRequest;
