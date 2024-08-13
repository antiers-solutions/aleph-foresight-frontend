/**
 * Marketplace component displays the marketplace with events and filtering options.
 * @returns {JSX.Element} - Rendered component
 */
import { Select, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./Marketplace.scss";
import EventsCard from "../Home/TopEvents/EventsCard";
import TopMarkets from "../Home/TopMarkets/TopMarkets";
import useScrollToTop from "../../Hooks/useScrollToTop";
import { useGetTopEvents } from "../../Hooks/useGetTopEvents";
import { TopArrow } from "../../assets/StoreAsset/StoreAsset";
import { Context } from "../ContextProvider/ContextProvider";
import { dropDownOptions, msgs } from "../../utils/appConstants";
import CustomSearch from "../../Common/CustomSearch/CustomSearch";
import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";

const Marketplace = () => {
  // Custom hook to scroll to the top of the page
  useScrollToTop();

  const {setSearch} = useContext(Context);
  const [marketFilter, setMarketFilter] = useState(null);

  // Custom hook to fetch and manage top events
  const {
    filter,
    metaData,
    setSearched,
    searchContext,
    searched,
    loadMore,
    setFilter,
    decideLimit,
    setFullPageLoader,
  } = useGetTopEvents();

  useEffect(() => {
    setMarketFilter(filter);
  }, [filter]);
 
  return (
    <div className="marketPlace">
      <div className="container">
        {/* top coins for markets */}
        <div className="topMarketsCards">
          <TopMarkets />
        </div>
        {/* search and search component for markets */}
        <div className="searchFilter">
          {/* Custom search component for searching markets */}
          <CustomSearch
            placeholder={msgs.searchMarket}
            handleOnChange={(value) => {
              setFullPageLoader(true);
              setSearched(value);
              setSearch(value);
            }}
            value={searched || searchContext}
            disabled={!metaData?.data.length && !searched}
          />
          {/* Dropdown select for filtering market status */}
          <div className="filter">
            <Select
              className="tabSelect marketplace"
              value={marketFilter}
              disabled={!metaData?.data.length}
              onChange={setFilter}
              options={dropDownOptions?.marketStatus}
            />
          </div>
        </div>

        {/* Component to display event cards */}
        <div className="cards">
          <EventsCard data={metaData?.data} loading={metaData?.loading} />
        </div>

        {/* loadmore and top buttons */}
        <div>
          {/* Load more button to fetch additional events */}
          {metaData?.loading ? null : (
            <div className="load-more">
              {metaData?.data?.length &&
              metaData?.data?.length < metaData?.total ? (
                <div className="load-more-div">
                  <ButtonCustom
                    btnBorder={true}
                    label={metaData?.loadMoreLoader ? <Spin /> : msgs.loadMore}
                    disabled={metaData?.loadMoreLoader}
                    onClick={loadMore}
                  />
                </div>
              ) : (
                <div className="load-more-div add-height"></div>
              )}

              {/* Button to scroll back to the top of the page */}
              {metaData?.total > decideLimit() ? (
                <div className="load-more-div to-top">
                  <ButtonCustom
                    label={
                      <span className="topBtnText">
                        Top
                        <TopArrow />
                      </span>
                    }
                    onClick={() => window.scrollTo(0, 0)}
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
