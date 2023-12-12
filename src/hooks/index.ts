import { useEffect } from "react";

export function useEventListener(
  element: HTMLElement,
  type: string,
  handler: (event: Event) => void
) {
  useEffect(() => {
    if (element) {
      element.addEventListener(type, handler);
      return () => element.removeEventListener(type, handler);
    }
    // eslint-disable-next-line
  }, []);
}
