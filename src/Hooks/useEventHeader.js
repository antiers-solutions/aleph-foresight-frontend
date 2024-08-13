/**
 * Hook to determine if an event is editable based on its creation time and current time.
 *
 * @param {object} data - Event data object
 * @returns {object} - An object with two properties: `isEditable` (boolean) and `navigate` (function)
 *
 */
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { maxEditMins } from "../utils/appConstants";
import {
  convertLeadingZeros,
  timeStampToDate,
} from "../utils/helpers/commonHelper";
import { isLoggedIn } from "../utils/helpers/walletHelpers";
import UseGetApi from "../api/makeRequest";
import { apiUrls } from "../api/apiUrls";

const useEventHeader = ({ data }) => {
  const now = moment();
  const navigate = useNavigate();
  /**
   * State to track if the event is editable
   */
  const [isEditable, setIsEditable] = useState(null);

  const checkEditability = async () => {
    try {
      const response = await UseGetApi(
        apiUrls?.getEventDetails({
          eventId: data?.eventId,
        })
      );

      if (response?.data) {
        setIsEditable(!response?.data?.data?.eventsDetails[0]?.totalNoOfBet);
        return response?.data?.data?.eventsDetails[0]?.totalNoOfBet;
      }
      return 0;
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * Effect to check if the event is editable based on its creation time and current time
   */

  useEffect(() => {
    let timer, isEditable, isSameUser;
    if (data) {
      /**
       * Check if the event was created on the same day as the current time
       */
      isEditable =
        now.isSame(timeStampToDate(data?.createdAt), "day") &&
        !data?.totalNoOfBet &&
        moment().diff(moment(timeStampToDate(data?.createdAt)), "min") <=
          maxEditMins;
     
      isSameUser = data?.userId?.toUpperCase() === isLoggedIn().toUpperCase();
      setIsEditable(isEditable);
      if (isEditable && isSameUser) {
        /**
         * Set a timer to check every second if the event is still editable
         */

        timer = setInterval(() => {
          if (
            moment().diff(moment(timeStampToDate(data?.createdAt)), "min") >=
            maxEditMins
          ) {
            /**
             * If the event is no longer editable, set `isEditable` to false and clear the timer
             */
            setIsEditable(false);
            clearInterval(timer);
          }
        }, 1000); // Check every second
      }
    }

    /**
     * Clean up the timer when the component is unmounted
     */
    return () => clearInterval(timer);
  }, [data]);

  return {
    isEditable,
    navigate,
    checkEditability,
  };
};

export default useEventHeader;
