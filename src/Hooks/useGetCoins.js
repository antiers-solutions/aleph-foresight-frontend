/**
 * Custom hook to fetch and manage coin data from the API.
 *
 * @returns {Object} An object containing the error, loading state, coin URL, and coin list.
 *
 */
import { useEffect, useState } from "react";
import { apiUrls } from "../api/apiUrls";
import UseGetApi from "../api/makeRequest";
import { transformedObject } from "../utils/helpers/commonHelper";

export const useGetCoins = () => {
  const [isLoading, setLoading] = useState(true);
  const [coinList, setCoinList] = useState([]);
  const [coinUrl, setCoinUrl] = useState({});
  const [error, setError] = useState(null);

  /**
   * Fetches coin data from the API and returns the response.
   *
   * @async
   * @function getCoins
   * @returns {Promise<void>}
   */
  const getCoins = async () => {
    setLoading(true);
    try {
      const response = await UseGetApi(apiUrls?.getCoins());
      if (response?.data) {
        const responseData = response?.data?.data?.Currency;
        const transFormedData = transformedObject(
          responseData,
          "symbol",
          "iconUrl"
        );
        setCoinList(responseData);
        setCoinUrl(transFormedData);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  return { error, isLoading, coinUrl, coinList };
};
