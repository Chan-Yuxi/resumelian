import type { Nullable } from "@/type/toolkit";
import { useEffect, useState } from "react";

/**
 * Using hooks from event listeners to automatically register and unbind events
 *
 * example:
 * ```
 *    useEventListener(input, "focus", () => {
 *       // TODO
 *    })
 * ```
 * @param dom element
 * @param type event type
 * @param handler handler
 */
export const useEventListener = (
  dom: HTMLElement | undefined | null,
  type: string,
  handler: (event: unknown) => void
) => {
  useEffect(() => {
    if (dom) {
      dom.addEventListener(type, handler);
      return () => {
        dom.removeEventListener(type, handler);
      };
    }
    // eslint-disable-next-line
  }, []);
};

/**
 * Encapsulate the request, initiate the request after the component is mounted
 * and return the loading status, data, and errors based on the results
 *
 * example:
 * ```
 *    const [userInfoLoading, userInfo] = useRequest(() => getUserInfo(username));
 * ```
 *
 * @param request request method
 * @returns loading status, data, and errors as an array
 */
export const useRequest = <T>(
  request: () => Promise<Nullable<T>>
): [boolean, T | undefined, (newData: T) => void, Error | undefined] => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    request()
      .then((response) => {
        if (response) {
          setData(response);
        }
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  return [loading, data, setData, error];
};
