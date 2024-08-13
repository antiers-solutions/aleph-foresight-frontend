import { useState, useEffect } from "react";

/**
 * Returns the current width of the window or document element.
 * @returns {number} The current width in pixels.
 */
export const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

/**
 * A React hook that returns the current width of the window or document element.
 * The width is updated whenever the window is resized.
 * @returns {number} The current width in pixels.
 */
export default function useCurrentWidth() {
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return width;
}
