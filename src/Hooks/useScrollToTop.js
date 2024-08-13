/**
 * A custom React hook that scrolls the window to the top when the component mounts.
 **/
import { useEffect } from "react";

/**
 * Scrolls the window to the top when the component mounts.
 *
 * This hook uses the `useEffect` hook to scroll the window to the top when the
 * component mounts. It only runs once, when the component is mounted.
 */
const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default useScrollToTop;
