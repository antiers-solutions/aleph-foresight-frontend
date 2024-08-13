/**
 * Custom hook to fetch and manage top events data.
 *
 * @returns {Object} An object containing the following properties:
 *   - metaData: An object containing the events data, total count, and loader status.
 *   - decideLimit: A function to determine the limit of events to fetch based on the current pathname.
 *   - loading: A boolean indicating whether the data is being fetched.
 *   - getEvents: A function to fetch the events data.
 *   - setMetaData: A function to update the metaData state.
 *   - loadMore: A function to increment the loadMoreCount and fetch more events.
 *   - setFilter: A function to update the filter state.
 *   - setSearched: A function to update the searched state.
 *   - searched: The current searched value.
 *   - getLatestEvents: A function to get the latest events (up to topEventsShow).
 *   - topEventsShow: The number of top events to show.
 *   - goToMarketPlace: A function to navigate to the marketplace page.
 *
 */
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrls } from "../api/apiUrls";
import UseGetApi from "../api/makeRequest";
import { useDebounce } from "./useDebounce";
import Path from "../Routing/Constant/RoutePaths";
import { dropDownOptions } from "../utils/appConstants";
import { Context } from "../Pages/ContextProvider/ContextProvider";

export const useGetTopEvents = () => {
  const topEventsShow = 6;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    searchedOnHome,
    filter,
    setFilter,
    fullPageLoading,
    setTotalEvents,
    searched: search,
    setLoading: setFullPageLoader,
    setSearch,
    setSearchHome,
  } = useContext(Context);

  const [searched, setSearched] = useState(search);
  const searchContext = useDebounce(searched, 500);

  const [metaData, setMetaData] = useState({
    data: [],
    total: 0,
    loading: false,
    loadMoreLoader: false,
  });
  const [loadMoreCount, setLoadMore] = useState(1);

  // determine the limit of events based on pathname
  const decideLimit = () => {
    switch (pathname) {
      case Path?.HOME:
        return 10;
      case Path?.MARKETPLACE:
        return 12;
      default:
        return 10;
    }
  };

  // get event details
  const getEvents = async (page) => {
    try {
      setMetaData((prev) => {
        return {
          ...prev,
          loading: !prev?.loadMoreLoader,
        };
      });
      const payload = {
        page: page ? page : loadMoreCount,
        limit: decideLimit(),
        search:
          window.location.pathname === Path?.HOME
            ? searchedOnHome
            : searchContext,
        filter:
          dropDownOptions?.marketStatus.findIndex(
            (item) => item?.value === filter
          ) && window.location.pathname != Path.HOME
            ? filter
            : "volume",
      };

      const res = await UseGetApi(apiUrls?.getEvents(payload));
      if (res?.data) {
        const eventData = res?.data?.data?.eventsData;
        const total = res?.data?.data?.total;
        setTotalEvents(total);
        if (eventData?.length) {
          setMetaData((prev) => {
            return {
              ...prev,
              total,
              data: prev?.data.concat(eventData),
            };
          });
          const targetDiv = document.getElementById("topEvents");
          if (targetDiv && searchContext) {
            targetDiv.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          setMetaData((prev) => ({
            ...prev,
            total: 0,
            data: prev?.data.concat([]),
          }));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setMetaData((prev) => {
        return {
          ...prev,
          loading: false,
          loadMoreLoader: false,
        };
      });
    }
  };

  // Load more events on button click
  const loadMore = (count) => {
    setMetaData((prev) => {
      return {
        ...prev,
        loadMoreLoader: true,
      };
    });
    const loadMore = count === 1 ? count : loadMoreCount + 1;
    getEvents(loadMore);
    setLoadMore(loadMore);
  };

  const goToMarketPlace = () => {
    setFilter("volume");
    navigate(Path?.MARKETPLACE);
  };

  const getLatestEvents = () => metaData?.data?.slice(0, topEventsShow);

  useEffect(() => {
    setMetaData((prev) => ({
      ...prev,
      data: [],
    }));
    setLoadMore(1);
    getEvents(1);
  }, [filter, searchContext]);

  useEffect(() => {
    if (window.location.pathname === Path.HOME) {
      setMetaData((prev) => ({
        ...prev,
        data: [],
      }));
      setLoadMore(1);
      getEvents(1);
    }
  }, [searchedOnHome]);

  useEffect(() => {
    setSearch("");
    setSearchHome("");
  }, []);

  return {
    filter,
    setSearchHome,
    loadMore,
    searched,
    searchContext,
    metaData,
    setFilter,
    setSearched,
    getEvents,
    decideLimit,
    setMetaData,
    topEventsShow,
    goToMarketPlace,
    fullPageLoading,
    getLatestEvents,
    setFullPageLoader,
  };
};
