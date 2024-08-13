/**
 * Custom hook to handle publishing of events.
 *
 * @param {Object} options - Options object.
 * @param {string} options.eventId - ID of the event to publish.
 * @param {function} options.successModal - Function to call when publishing is successful.
 * @param {string} options.coin - Coin name.
 * @param {number} options.priceLevel - Price level of the event.
 * @param {Date} options.targetDate - Target date of the event.
 * @param {boolean} options.eventEdited - Whether the event is being edited.
 *
 * @returns {Object} - Object containing the publish function, loading state, and fees.
 *
 */
import { useEffect, useState } from "react";
import { apiUrls } from "../api/apiUrls";
import UseGetApi from "../api/makeRequest";
import { contractMethods } from "../utils/appConstants";
import { contractEvents } from "../utils/helpers/contractHelpers";
import { divideByHundred, getTimeStamp } from "../utils/helpers/commonHelper";

const usePublish = ({
  eventId,
  successModal,
  coin,
  priceLevel,
  targetDate,
  eventEdited,
}) => {
  const [loading, setLoading] = useState(false);
  const [fees, setFee] = useState({
    platformFee: 0,
    rewards: 0,
  });

  /**
   * Fetch IPFS hash for the event.
   *
   * @returns {Promise<string>} - Promise resolving to the IPFS hash.
   *
   */
  const getIpfs = async () => {
    try {
      const res = await UseGetApi(apiUrls?.getIpfsUrl(), "post", {
        eventName: coin,
        timeStamp: Date.now(),
        price: priceLevel,
      });

      if (res?.data) {
        return res?.data?.data;
      }
      return res?.error;
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Publish the event.
   *
   * @returns {Promise<void>} - Promise resolving when publishing is complete.
   */
  const publish = async () => {
    try {
      setLoading(true);
      const hash = eventId || (await getIpfs());
      if (hash) {
        const res = await contractEvents({
          eventName: eventEdited
            ? contractMethods.editEvent
            : contractMethods.register,
          expiryTime: getTimeStamp(targetDate),
          eventId: hash,
          priceLevel:priceLevel * Math.pow(10, 7)
        });
        if (res) {
          setTimeout(() => {
            successModal();
            setLoading(false);
          }, 6000);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Fetch platform and reward fees.
   *
   * @returns {Promise<void>} - Promise resolving when fees are fetched.
   */
  const getFee = async () => {
    try {
      const response1 = await contractEvents({
        eventName: contractMethods.platFormFeePreview,
      });
      const response2 = await contractEvents({
        eventName: contractMethods.rewardFee,
      });
      const [platformFee, rewards] = await Promise.all([response1, response2]);

      setFee({
        rewards: divideByHundred(rewards),
        platformFee: divideByHundred(platformFee),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFee();
  }, []);

  return {
    publish,
    loading,
    fees,
  };
};

export default usePublish;
