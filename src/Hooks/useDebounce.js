/**
 * Hook to debounce the search input and update the search context.
 *
 * @param {string} value - The current search input value.
 * @param {number} delay - The delay in milliseconds before updating the search context.
 *
 * @returns {string} The current searched value from the context.
 *
 */
import { useContext, useEffect } from "react";
import { Context } from "../Pages/ContextProvider/ContextProvider";

export function useDebounce(value, delay, fromPage) {
  const { setSearch, searched, setSearchHome, searchedOnHome } =
    useContext(Context);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (fromPage) {
        setSearchHome(value);
      } else { 
        setSearch(value);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  if (fromPage) return searchedOnHome;
  // else { 
    return searched;
  // }
}
