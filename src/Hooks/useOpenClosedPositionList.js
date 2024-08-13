import { useEffect, useState } from "react";
import { apiUrls } from "../api/apiUrls";
import UseGetApi from "../api/makeRequest";
import { useGetMarketPlace } from "./useGetMarketPlace";
import { formatNumber } from "../utils/helpers/commonHelper";

// Custom hook to fetch and manage open and closed positions list
export const useOpenClosedPositionList = ({ type, key }) => {
  const { getYesNoBets } = useGetMarketPlace({
    shouldCallAllApis: false,
  });

  const [metaData, setdata] = useState({
    data: [],
    isLoading: false,
    error: null,
    total: 0,
  });

  const getLists = async (params) => {
    setdata((prev) => ({ ...prev, isLoading: true, data: [] }));

    try {
      const response = await UseGetApi(
        apiUrls?.getClosedOpenPosition({ ...params, statusType: Number(type) })
      );

      if (response?.data) {
        const _data = response?.data?.data?.ordersData;
        const total = response?.data?.data?.total;

        if (_data && total) {
          const modData = await Promise.all(
            _data.map(async (item) => {
              const res = await getYesNoBets(item?.data?.eventId);
              const isWithdraw =
                formatNumber(res?.yes) === 0 || formatNumber(res?.no) === 0;
              return {
                ...item?.data,
                isWithdraw,
                ...res,
              };
            })
          );

          setdata((prev) => ({ ...prev, data: modData, total }));
        }
        else{
          setdata((prev) => ({ ...prev, data: [], total }));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setdata((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    if (key === 1 || key === 2) getLists({ page: 1, limit: 10 });
  }, [key]);

  return {
    metaData,
    getLists,
  };
};
