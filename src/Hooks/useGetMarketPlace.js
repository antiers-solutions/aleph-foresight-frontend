import { useContext, useEffect, useState } from "react";
import { Context } from "../Pages/ContextProvider/ContextProvider";
import { useParams } from "react-router-dom";
import { contractEvents } from "../utils/helpers/contractHelpers";
import { contractMethods, dateFormat } from "../utils/appConstants";
import UseGetApi from "../api/makeRequest";
import { apiUrls } from "../api/apiUrls";
import {
  eventDateFormat,
  eventIdURL,
  formatPrice,
  getIpfs,
  timeStampToDate,
} from "../utils/helpers/commonHelper";
import dayjs from "dayjs";
import { handleTargetDateChange } from "../Pages/CreateMarket/createMarket.helper";

/**
 * Custom hook to fetch marketplace data.
 *  - Props containing the shouldCallAllApis flag.
 * @returns {Object} Data and methods related to the marketplace.
 */
export const useGetMarketPlace = (props) => {
  const { shouldCallAllApis = true } = props || {};
  const { coinUrl, setLoading, setEventDetails } = useContext(Context);
  const { eventId } = useParams();
  const state = { eventId };

  const [metaData, setMetaData] = useState({
    data: [],
    eventDetails: null,
    loading: false,
  });
  const [bets, setBets] = useState({
    yes: 0,
    no: 0,
    total: 0,
  });

  /**
   * Fetches the yes/no bet amounts for an event.
   * @param {string} eventId - The event ID.
   * @returns {Object} The bet amounts.
   */
  const getYesNoBets = async (eventId) => {
    try {
      const res = await contractEvents({
        eventName: contractMethods.poolAmount,
        eventId: state?.eventId || eventId,
      });

      if (!res.length) return;
      const response = {
        yes: Number(res?.[0].toString()),
        no: Number(res?.[1].toString()),
        total: Number(res?.[0].toString()) + Number(res?.[1].toString()),
      };
      setBets(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Fetches the event details.
   */
  const getDetails = async () => {
    try {
      setLoading(true);
      setMetaData((prev) => ({
        ...prev,
        loading: true,
      }));

      const response = await UseGetApi(
        apiUrls?.getEventDetails({
          eventId: state?.eventId,
        })
      );

      if (response?.data) {
        const data = response?.data?.data?.eventsDetails[0];
        const getData = await getIpfs(eventIdURL(data?.eventId));
        const { name, price } = getData;
        const url = Object.keys(coinUrl).length ? coinUrl[name] : "";
        const { formattedDate } = eventDateFormat(
          data?.targetDateTime,
          dateFormat?.five
        );

        const description = `${name || "-"} to be priced at ${
          formatPrice(data?.priceLevel) || 0
        } USDT or more as on ${formattedDate || "-"}?`;
        const targetDate = dayjs(timeStampToDate(data?.targetDateTime));

        setEventDetails({
          targetDate,
          coins: name,
          priceLevel: data?.priceLevel,
          eventDurationDays:
            handleTargetDateChange(targetDate)?.eventDurationDays,
          eventDurationHours:
            handleTargetDateChange(targetDate)?.eventDurationHours,
          closureTime: handleTargetDateChange(targetDate)?.closureTime,
        });
        setMetaData((prev) => {
          return {
            ...prev,
            eventDetails: {
              price: getData?.data?.priceLevel,
              qn: description,
              iconUrl: url,
              ...data,
            },
          };
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setMetaData((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  /**
   * Fetches the bets of a particular event for the current user.
   * @param {Object} bets - The bets object.
   */
  const getBetsOfParticularEventOfCurrentUser = async (bets) => {
    try {
      setMetaData((prev) => ({
        ...prev,
        loading: true,
      }));
      setTimeout(async () => {
        const res = await UseGetApi(
          apiUrls?.getBetsOfParticularEventOfCurrentUser({
            eventId: state?.eventId,
          }),
          "get"
        );

        if (res?.data?.data?.length) {
          const { total } = res?.data?.data;
          setMetaData((prev) => ({
            ...prev,
            data: res?.data?.data?.map((v) => ({ ...v, bets: { ...bets } })),
            total,
            loading: false,
          }));
        } else {
          setMetaData((prev) => ({
            ...prev,
            data: [],
            loading: false,
          }));
        }
      }, 1000);
    } catch (error) {
      console.error(error);
    } finally {
      setMetaData((prev) => ({
        ...prev,
        data: [],
        loading: false,
      }));
    }
  };

  /**
   * Calls the necessary APIs to fetch data.
   */
  const callApis = async () => {
    const res = await getYesNoBets();
    getBetsOfParticularEventOfCurrentUser(res);
  };

  useEffect(() => {
    if (Object.keys(state).length && shouldCallAllApis) callApis();
  }, []);

  useEffect(() => {
    if (Object.keys(coinUrl).length && shouldCallAllApis) getDetails();
  }, [coinUrl]);

  return {
    bets,
    metaData,
    callApis,
    getDetails,
    getYesNoBets,
    getBetsOfParticularEventOfCurrentUser,
  };
};
