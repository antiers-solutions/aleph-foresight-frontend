/**
 * Custom hook to manage claim details metadata.
 *
 * @param {Object} rowDetails - Object containing claim details.
 * @returns {Object} - An object containing metadata for claim details.
 *
 */
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { apiUrls } from "../api/apiUrls";
import UseGetApi from "../api/makeRequest";
import { formatNumber } from "../utils/helpers/commonHelper";
import { contractMethods, env, msgs } from "../utils/appConstants";
import { contractEvents } from "../utils/helpers/contractHelpers";

const useClaimDetails = ({ rowDetails }) => {
  const [metaData, setMetaData] = useState({
    loading: false,
    data: [
      {
        label: msgs.totalAmount,
        values: ["0", "0"],
      },
      {
        label: msgs.yourShare,
        values: ["0", "0"],
      },
    ],
    eventDetails: [
      {
        label: msgs.grossWinnings,
        values: 0,
      },
      {
        label: msgs.platformFee,
        values: 0,
      },
      {
        label: msgs.netWinnings,
        values: 0,
      },
    ],
  });

  const getPayout = async () => {
    setMetaData((prev) => ({
      ...prev,
      loading: true,
    }));
    const response1 = await UseGetApi(
      apiUrls?.getPayout({
        eventId: rowDetails?.eventId,
      })
    );
    const response2 = await contractEvents({
      eventName: contractMethods.getUserBets,
      eventId: rowDetails?.eventId,
    });
    const [payout, userBets] = await Promise.all([response1, response2]);

    setMetaData((prev) => ({
      ...prev,
      loading: false,
      data: [
        {
          label: msgs.totalAmount,
          values: [
            Number(formatNumber(rowDetails?.yes)).toFixed(env?.precision),
            Number(formatNumber(rowDetails?.no)).toFixed(env?.precision),
          ],
        },
        {
          label: msgs.yourShare,
          values: [
            Number(formatNumber(Number(new BigNumber(userBets?.[0])))).toFixed(
              env?.precision
            ),
            Number(formatNumber(Number(new BigNumber(userBets?.[1])))).toFixed(
              env?.precision
            ),
          ],
        },
      ],
      eventDetails: [
        {
          label: msgs.grossWinnings,
          values: Number(payout?.data?.data?.grossPayout).toFixed(
            env?.precision
          ),
        },
        {
          label: msgs.platformFee,
          values: `${Number(payout?.data?.data?.platformFees).toFixed(
            env?.precision
          )}%`,
        },
        {
          label: msgs.netWinnings,
          values: Number(payout?.data?.data?.netPayout).toFixed(env?.precision),
        },
      ],
    }));
  };

  useEffect(() => {
    getPayout();
  }, [rowDetails]);

  return {
    metaData,
  };
};

export default useClaimDetails;
