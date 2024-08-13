/**
 * A custom React hook to handle scroll events and determine if the user has scrolled past a certain threshold.
 *
 * @param {number} width - The width of the screen, used to determine the scroll threshold.
 * @returns {boolean} - A boolean indicating whether the user has scrolled past the threshold.
 *
 */
import { useEffect, useState } from "react";

export const useHandleScroll = (width) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > (width > 991 ? 0 : 100)) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
};
