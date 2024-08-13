/**
 * Defines the columns for the table with bet details.
 * @param {boolean} isLoading - Indicates if the data is loading.
 * @returns {Array} Columns for the table.
 */
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { contractMethods, env, msgs } from "../../utils/appConstants";
import { contractEvents } from "../../utils/helpers/contractHelpers";
import {
  formatNumber,
  globalTimeFormat,
} from "../../utils/helpers/commonHelper";
import Path from "../../Routing/Constant/RoutePaths";

export const columns = (isLoading) => [
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (_, record) => {
      return (
        <span className={betOn[record?.orderType]?.toLowerCase()}>
          {betOn[record?.orderType] || "-"}
        </span>
      );
    },
  },
  {
    title: "Bet Amount",
    dataIndex: "bet",
    key: "bet",
    render: (_, record) => {
      return <span>{Number(formatNumber(record?.amount)).toFixed(env?.precision)} {msgs?.azero}</span>;
    },
  },
  {
    title: "Date & Time",
    dataIndex: "datetime",
    key: "datetime",
    render: (_, record) => {
      return <span>{globalTimeFormat(record?.updatedAt)}</span>;
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => {
      const isWithdraw =
        record?.bets?.["yes"] === 0 || record?.bets?.["no"] === 0;

      return (
        <div>
          <Link
            className={`action ${
              isWithdraw ? "pointer" : "no-pointer disableColor"
            }`}
            disabled={isWithdraw}
            to=""
          >
            {isLoading ? (
              <div className="spinerIneers">
                <Spin />{" "}
              </div>
            ) : (
              msgs.withdraw
            )}
          </Link>
        </div>
      );
    },
  },
];

/**
 * Helper object to determine bet types and actions.
 */
export const betOn = {
  0: "No",
  1: "Yes",
  true: "Yes",
  false: "No",
  yes: true,
  no: false,
  withdraw: "withdrew",
  activity: (pathname) => ({
    withdraw: pathname === Path?.HOME ? "Withdrew" : "Withdrawn",
    claimed: "Claimed",
    true: "Yes",
    false: "No",
  }),
  claimed: "claimed",
  closedType: {
    0: { class: "red", val: "Lost" },
    1: { class: "green", val: "Won" },
  },
};

/**
 * Fetches the platform fees for a specific event.
 * @param {string} eventId - The event ID.
 * @returns {Object} The platform fees.
 */
export const getPlatFormFees = async (eventId) => {
  try {
    const response = await contractEvents({
      eventName: contractMethods.platFormFee,
      eventId,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Transforms the coins array to a format suitable for selection options.
 * @param {Array} coins - The array of coins.
 * @returns {Array} The transformed coins array.
 */
export const getCoins = (coins) => {
  if (coins?.length) {
    const transformedData = coins.map((item) => ({
      label: item.name,
      value: item.symbol,
    }));

    transformedData.unshift({
      label: "All",
      value: "All",
    });
    return transformedData;
  } else return [];
};
