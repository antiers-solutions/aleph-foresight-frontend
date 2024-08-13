/**
 * Hook to clear search query when navigating to the home page.
 *
 * @param {object} props - Props object containing the current pathname.
 * @param {string} props.pathname - The current pathname.
 *
 * @returns {void}
 *
 */
import { useContext, useEffect } from "react";
import { Context } from "../Pages/ContextProvider/ContextProvider";
import Path from "../Routing/Constant/RoutePaths";

const useClearSearchOnHome = ({ pathname }) => {
  const { setSearchHome, searchedOnHome } = useContext(Context);

  const clearSearchOnHome = () => {
    if (pathname === Path?.HOME && searchedOnHome) {
      setSearchHome("");
    }
  };

  useEffect(() => {
    clearSearchOnHome();
  }, [pathname]);
};

export default useClearSearchOnHome;
