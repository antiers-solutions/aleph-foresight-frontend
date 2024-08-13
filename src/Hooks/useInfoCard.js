/**
 * Custom hook to fetch and manage card information.
 *
 * @returns {Object} An object containing the card information.
 *
 */
import { useContext, useEffect, useState } from "react";
import { apiUrls } from "../api/apiUrls";
import UseGetApi from "../api/makeRequest";
import { msgs } from "../utils/appConstants";
import { Context } from "../Pages/ContextProvider/ContextProvider";

const useInfoCard = () => {
  const { profileDetails,fetchProfileCardData } = useContext(Context);
  const [cardInfo, setCardInfo] = useState({
    netPosition: `0 ${msgs.azero}`,
    volumeTraded: `0 ${msgs.azero}`,
    eventsTraded: 0,
  });

  /**
   * Fetches data from APIs to update the card information.
   * @async
   */
  const cardDataApi = async () => {
    try {
      const eventsTraded = await UseGetApi(apiUrls?.totalTraded());
      const netPosition = await UseGetApi(apiUrls?.netPositions());
      if (eventsTraded?.data && netPosition?.data) {
        setCardInfo((prev) => ({
          ...prev,
          netPosition: `${
            (netPosition?.data?.data?.netPosition).toFixed(2) || 0
          } ${msgs.azero}`,
          eventsTraded: eventsTraded?.data?.data?.total || 0,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cardDataApi();
  }, [fetchProfileCardData]);

  useEffect(() => {
    if (profileDetails?.hasOwnProperty("volumeTraded")) {
      setCardInfo((prev) => ({
        ...prev,
        volumeTraded: `${profileDetails?.volumeTraded} ${msgs.azero}`,
      }));
    }
  }, [profileDetails]);

  return {
    cardInfo,
  };
};

export default useInfoCard;
