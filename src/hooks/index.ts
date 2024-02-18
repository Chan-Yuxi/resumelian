import type { Nullable, Optional } from "@/types/toolkit";
import type { PageInfo } from "@/types/definition";

import { useCallback, useEffect, useState } from "react";
import { PaginationProps } from "antd";

/**
 * Using hooks from event listeners to automatically register and unbind events
 *
 * example:
 * ```
 *    const input = useRef();
 *    useEventListener(input, "focus", (event: unknown) => {
 *       // TODO
 *    });
 * ```
 */
export const useEventListener = (
  element: Optional<HTMLElement>,
  type: string,
  handler: (event: unknown) => void
) => {
  useEffect(() => {
    if (element) {
      element.addEventListener(type, handler);
      return () => {
        element.removeEventListener(type, handler);
      };
    }
    // eslint-disable-next-line
  }, [element]);
};

/**
 * Encapsulate the request, initiate the request after the component is mounted
 * and return the loading status, data, and errors based on the results
 *
 * example:
 * ```
 *    const [userInfoLoading, userInfo] = useRequest(() => getUserInfo(username));
 * ```
 */
export const useRequest = <T>(request: () => Promise<Nullable<T>>) => {
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

  return [loading, data, setData, error] as const;
};

/**
 * example:
 * ```
 *    const [
 *      loading,
 *      data,
 *      total,
 *      current,
 *      setCurrent
 *    ] = usePagination((pageNum) => getTemplate(page), 1);
 * ```
 */
export const usePagination = <T>(
  request: (
    pageNum: number,
    pageSize: number
  ) => Promise<Nullable<PageInfo<T>>>,
  initialPageNum = 1,
  initialPageSize = 20
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(initialPageNum);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useEffect(() => {
    setLoading(true);
    request(current, pageSize)
      .then((pageInfo) => {
        if (pageInfo) {
          setData(pageInfo.list);
          setTotal(pageInfo.total);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [current, pageSize]);

  const onChange: PaginationProps["onChange"] = (
    page: number,
    pageSize: number
  ) => {
    setCurrent(page);
    setPageSize(pageSize);
  };

  const paginationProps = {
    total,
    current,
    pageSize,
    onChange,
  };

  return [loading, data, paginationProps] as const;
};

export const useForceUpdate = () => {
  // eslint-disable-next-line
  const [_, setTemp] = useState({});
  const update = useCallback(() => {
    setTemp({});
  }, []);

  return update;
};
