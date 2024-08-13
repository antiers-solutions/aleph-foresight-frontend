import moment from "moment";
import { Tooltip } from "antd";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  chunkData,
  formatNumber,
  getIpfs,
  goToExplorer,
  truncateText,
} from "../utils/helpers/commonHelper";
import ProfileImg from "../assets/BlueLogo.svg";
import { apiUrls } from "../api/apiUrls";
import UseGetApi from "../api/makeRequest";
import { useEventCards } from "./useEventCards";
import Question from "../Common/Question/Question";
import { dateFormat, env, msgs } from "../utils/appConstants";
import { isLoggedIn } from "../utils/helpers/walletHelpers";
import { betOn } from "../Pages/Marketplace/marketPlace.helper";
import { Context } from "../Pages/ContextProvider/ContextProvider";
import {
  getClassName,
  showUserName,
} from "../Pages/RecentActivity/recentActivity.helper";
import Path from "../Routing/Constant/RoutePaths";

/**
 * Custom hook to get activity data
 * @param {boolean} isAddress - Indicates if an address is provided
 * @returns {object} - Various functions and state related to activity data
 */
export const useGetActivity = (isAddress) => {
  const { coinUrl, filter } = useContext(Context);
  const { pathname } = useLocation();
  const { navigateToAbout, handleBetOn } = useEventCards();

  const [metaData, setMetaData] = useState({
    data: [],
    recentAvitvityData: [],
    error: null,
    loading: false,
    total: 0,
  });

  /**
   * Fetches activity data from the API
   * @param {object} params - Parameters for the API request
   */
  const getActivities = async ({ page, limit }) => {
    setMetaData((prev) => ({
      ...prev,
      loading: true,
    }));
    try {
      const res = await UseGetApi(
        apiUrls?.getActivities({
          page,
          limit:window.location.pathname === Path.HOME ? 12 : 10,
          filter: window.location.pathname === Path?.PROFILE ? filter : null,
          userAddress: isAddress ? isLoggedIn() : undefined,
        })
      );
      
      if (res?.data?.data) {
        const { total, ordersData } = res?.data?.data;
        setMetaData((prev) => ({
          ...prev,
          data: ordersData,
          ordersData,
          recentAvitvityData: chunkData(ordersData, 6),
          total,
        }));
        return ordersData;
      } else {
        setMetaData((prev) => ({
          ...prev,
          data: [],
          total: 0,
        }));
      }
    } catch (error) {
      setMetaData((prev) => ({
        ...prev,
        error,
        loading: false,
      }));
    } finally {
      setMetaData((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  // Table columns configuration for activity
  const columns = [
    {
      title: msgs.txnHash,
      dataIndex: "txnHash",
      key: "txnHash",
      render: (_, record) => (
        <Tooltip title={record?.txnId}>
          <span className="txnHash">{truncateText(record?.txnId)}</span>
        </Tooltip>
      ),
    },
    {
      title: msgs.event,
      dataIndex: "market",
      key: "market",
      render: (_, record) => <Question record={record} promise={getIpfs} />,
    },
    {
      title: msgs.user,
      dataIndex: "user",
      key: "user",
      render: (_, record) => {
        return (
          <span className="marketTd">
            <img
              src={record?.userDetails?.profilePicture?.small || ProfileImg}
              alt=""
              className="coin-icons"
            />
            {showUserName(
              record?.userDetails?.userName
                ? record?.userDetails?.userName
                : record?.userId
            )}
          </span>
        );
      },
    },
    {
      title: msgs.action,
      dataIndex: "bought",
      key: "bought",
      render: (_, record) => {
        return (
          <span className={getClassName(record?.bidType)}>
            {betOn?.activity(pathname)[record?.bidType]}
          </span>
        );
      },
    },
    {
      title: msgs.amount,
      dataIndex: "bet",
      key: "bet",
      render: (_, record) => {
        return `${Number(formatNumber(record?.currentBet)).toFixed(env.precision)} ${msgs.azero}`;
      },
    },
    {
      title: msgs.dateAndTime,
      dataIndex: "datetime",
      key: "datetime",
      render: (_, record) => {
        return (
          <span>{moment(record?.updatedAt).format(dateFormat?.five)}</span>
        );
      },
    },
  ];

  // Table columns configuration for activity profile
  const activityProfileColumns = [
    {
      title: msgs.txnHash,
      dataIndex: "txnHash",
      key: "txnHash",
      render: (_, record) => (
        <Tooltip title={record?.txnId}>
          <span className="txnHash">{truncateText(record?.txnId)}</span>{" "}
        </Tooltip>
      ),
    },
    {
      title: msgs.event,
      dataIndex: "market",
      key: "market",
      render: (_, record) => <Question record={record} promise={getIpfs} />,
    },
    {
      title: msgs.betAmount,
      dataIndex: "bet",
      key: "bet",
      render: (_, record) => {
        return `${Number(formatNumber(record?.currentBet)).toFixed(env?.precision)} ${msgs.azero}`;
      },
    },
    {
      title: msgs.verdict,
      dataIndex: "verdict",
      key: "verdict",
      render: (_, record) => {
        const resultClass =
          record?.result != null
            ? betOn?.closedType?.[Number(record.result)]?.class
            : "yellow";

        const resultText =
          betOn?.closedType?.[record?.result]?.val || msgs.pending;

        return <span className={resultClass}>{resultText}</span>;
      },
    },
    {
      title: msgs.action,
      dataIndex: "bought",
      key: "bought",
      render: (_, record) => {
        return <span>{betOn?.activity(pathname)[record?.bidType]}</span>;
      },
    },
    {
      title: msgs.dateAndTime,
      dataIndex: "datetime",
      key: "datetime",
      render: (_, record) => {
        return (
          <span>{moment(record?.updatedAt).format(dateFormat?.five)}</span>
        );
      },
    },
  ];

  /**
   * Row click handler for activity profile table
   * @param {object} record - The record of the clicked row
   * @returns {object} - Event handlers for the row
   */
  const onRowActivityProfile = (record) => {
    return {
      onClick: async (event) => {
        if (
          event?.target?.tagName === "path" ||
          event?.target?.tagName === "svg"
        ) {
          goToExplorer(record?.txnId);
          return;
        } else if (event?.target?.className.includes("txnHash")) {
          goToExplorer(record?.txnId);
          return;
        }
        navigateToAbout({
          eventId: record?.eventId,
        });
      },
    };
  };

  /**
   * Row click handler for activity table
   * @param {object} record - The record of the clicked row
   * @returns {object} - Event handlers for the row
   */
  const onRowActivity = (record) => {
    return {
      onClick: (event) => {
        if (event?.target?.className.includes("txnHash")) {
          goToExplorer(record?.txnId);
          return;
        }
        handleBetOn({
          betOn: "yes",
          eventId: record?.eventId,
        });
      },
    };
  };

  // Fetch activities when coinUrl or filter changes
  useEffect(() => {
    if (!Object.keys(coinUrl).length) return;
    getActivities({ page: 1, limit: 10 });
  }, [coinUrl, filter]);

  return {
    onRowActivity,
    onRowActivityProfile,
    metaData,
    getActivities,
    columns,
    activityProfileColumns,
  };
};
