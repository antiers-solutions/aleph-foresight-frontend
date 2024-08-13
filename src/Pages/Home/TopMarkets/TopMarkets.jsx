/**
 * TopMarkets component displays a list of top markets with their respective icons and names.
 * It also handles the click event on each market card, setting the search query to the selected market symbol.
 *
 */
import { useLocation } from "react-router-dom";
import React, { useCallback, useContext } from "react";
import "./TopMarkets.scss";
import Path from "../../../Routing/Constant/RoutePaths";
import { Context } from "../../ContextProvider/ContextProvider";
import { msgs } from "../../../utils/appConstants";
import useClearSearchOnHome from "../../../Hooks/useClearSearchOnHome";

const TopMarkets = () => {
  const { pathname } = useLocation();
  const {
    coinList,
    searched,
    setSearch,
    searchedOnHome,
    setSearchHome,
    setLoading,
  } = useContext(Context);

  // Custom hook to clear search when navigating to home
  useClearSearchOnHome({ pathname });

  const handleCardClick = useCallback(
    (symbol) => {
      if (window.location.pathname === Path.HOME) setSearchHome(symbol);
      else setSearch(symbol);
      if (pathname === Path?.HOME) {
        setLoading(true);
      }
    },
    [pathname, setSearch, setLoading, setSearchHome]
  );

  const getSearchValue = (path) => {
    switch (path) {
      case Path.HOME:
        return searchedOnHome;
      default:
        return searched;
    }
  };

  return (
    <div className="topMarket">
      {/* Market heading */}
      <div className="marketHeading">
        <h2>{msgs.toMarkets}</h2>
      </div>

      {/* Market card list */}
      <div className="marketCard">
        {coinList?.length
          ? coinList?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`cardOuter ${
                    getSearchValue(window.location.pathname) === item?.symbol
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleCardClick(item?.symbol)}
                >
                  <img
                    src={item?.iconUrl}
                    alt={item?.name}
                    className="coin-icons"
                  />
                  <p>{item?.name}</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default React.memo(TopMarkets);
