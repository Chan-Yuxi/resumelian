import Request from "./request";

function createAxios(/* options: Record<any, any> */) {
  return new Request({
    baseURL: "/",
    timeout: 10 * 1000,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    // ...options
  });
}

const defaultRequest = createAxios();
export default defaultRequest;
