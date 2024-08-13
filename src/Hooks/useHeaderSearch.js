import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import Path from "../Routing/Constant/RoutePaths";

const useHeaderSearch = ({ pathname, setShow }) => {
  const [search, setSearch] = useState(null);
  useDebounce(search, 500, "Header");

  useEffect(() => {
    if (pathname != Path?.HOME) {
      setShow(false);
      setSearch("");
      return;
    }
    setShow(true);
  }, [pathname]);

  return {
    setSearch,
    search,
  };
};

export default useHeaderSearch;
