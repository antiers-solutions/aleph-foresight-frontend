/**
 * Custom hook to fetch and manage about us metrics data.
 *
 * @returns {Object} An object containing the metrics data.
 *
 *
 */
import { useEffect, useState } from "react";
import UseGetApi from "../api/makeRequest";
import { apiUrls } from "../api/apiUrls";
import useScrollToTop from "./useScrollToTop";
import { initialMetricsData } from "../Pages/About/about.helper";
import { env } from "../utils/appConstants";

const useAboutUs = () => {
  useScrollToTop();

  const [metrics, setMetrics] = useState({
    loading: false,
    data: initialMetricsData(0, 0, 0, 0),
  });

  /**
   * Calls APIs to fetch metrics data and updates the state.
   */
  const callApis = async () => {
    try {
      setMetrics((prev) => ({
        ...prev,
        loading: true,
      }));

      const users = await UseGetApi(apiUrls?.totalUser());
      const volume = await UseGetApi(apiUrls?.totalVolume());
      const events = await UseGetApi(apiUrls?.totalEvents());
      const [res1, res2, res3] = await Promise.all([users, volume, events]);
      
      setMetrics((prev) => ({
        ...prev,
        data: initialMetricsData(
          res1?.data?.data?.totalUsers,
          Number(res2?.data?.data?.totalVolume).toFixed(env.precision),
          res3?.data?.data?.totalEvents,
          0
        ),
      }));

      setMetrics((prev) => ({
        ...prev,
        loading: false,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    callApis();
  }, []);

  return {
    metrics,
  };
};

export default useAboutUs;
