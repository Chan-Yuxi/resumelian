import { useEffect } from "react";

/**
 * 
 * @param dom 
 * @param type 
 * @param handler 
 */
export const useEventListener = (dom: HTMLElement | undefined | null, type: string, handler: (event: unknown) => void) => {
  useEffect(() => {
    if (dom) {
      dom.addEventListener(type, handler);
      return () => {
        dom.removeEventListener(type, handler);
      }
    }
  // eslint-disable-next-line
  }, [dom]);
};
