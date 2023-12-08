import Request from "./request";

function createAxios(/* options: Record<any, any> */) {
  return new Request({
    baseURL: "http://53bsq5.natappfree.cc",
    timeout: 10 * 1000,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    // ...options
  });
}

const defaultRequest = createAxios();
export default defaultRequest;
