/**
 * Hook to manage open positions in a marketplace.
 *
 * @param {object} params - Parameters for the hook.
 * @param {string} params.type - Type of positions to fetch (e.g. 1).
 * @param {string} params.key - Key for the positions (e.g. 1).
 *
 * @returns {object} - An object containing the following properties:
 *   - openPositionColumns: An array of column definitions for the open positions table.
 *   - metaData: Metadata for the positions (e.g. total count).
 *   - getLists: A function to fetch the positions.
 *   - handleYes: A function to handle the "yes" action on a position.
 *   - onRow: A function to handle row clicks in the table.
 *   - rowDetails: Details about the currently selected row.
 *   - tableParams: Parameters for the table (e.g. pagination).
 *   - handleTableChange: A function to handle changes to the table (e.g. pagination).
 *   - showConfirmModal: A boolean indicating whether to show the confirm modal.
 *   - contractDetails: Details about the contract (e.g. name, loading state).
 *   - toggleConfirmModal: A function to toggle the confirm modal.
 *   - showSuccessModal: A boolean indicating whether to show the success modal.
 *   - toggleSuccessModal: A function to toggle the success modal.
 *
 */
import { Spin, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { decideTitle } from "../Pages/Profile/InfoTable/info.helper";
import {
  formatNumber,
  getIpfs,
  globalTimeFormat,
  goToExplorer,
  timeStampToDate,
  truncateText,
} from "../utils/helpers/commonHelper";
import { useEventCards } from "./useEventCards";
import Question from "../Common/Question/Question";
import { useTablePagination } from "./useTablePagination";
import { contractMethods, env, msgs } from "../utils/appConstants";
import { betOn } from "../Pages/Marketplace/marketPlace.helper";
import { contractEvents } from "../utils/helpers/contractHelpers";
import { Context } from "../Pages/ContextProvider/ContextProvider";
import { useOpenClosedPositionList } from "./useOpenClosedPositionList";

export const useOpenPosition = ({ type, key }) => {
  const { navigateToAbout } = useEventCards();
  const { setFetchBalance, fetchBalance } = useContext(Context);
  const { metaData, getLists } = useOpenClosedPositionList({ type, key });
  const { handleTableChange, tableParams, setParams } =
    useTablePagination(getLists);

  const [contractDetails, setContractDetails] = useState({
    name: contractMethods.withdraw,
    isLoading: false,
  });
  const [rowDetails, setRowDetails] = useState({
    isLoading: false,
    rowIndex: null,
    eventId: null,
    eventClosureTime: null,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  /**
   * Toggle confirm modal.
   */
  const toggleConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  /**
   * Toggle success modal.
   */
  const toggleSuccessModal = () => {
    setShowSuccessModal(!showSuccessModal);
  };

  const handleWithdraw = async (event, record) => {
    if (event?.target?.innerText === "Withdraw") {
      setRowDetails((prev) => ({ ...prev, isLoading: true }));
      if (record?.isWithdraw) toggleConfirmModal();
      setRowDetails((prev) => ({ ...prev, isLoading: false }));
    }
  };

  /**
   * Returns an object with an onClick event handler for a table row for the withdraw and txn details page.
   *
   * @param {Object} record - The record object.
   * @returns {Object}
   *
   */
  const onRow = (record) => {
    return {
      onClick: async (event) => {
        if (event?.target?.innerText === msgs.withdraw) {
          if (record?.bidType != "withdraw" && record?.isWithdraw) {
            setRowDetails((prev) => ({
              ...prev,
              rowIndex: record?._id,
              eventId: record?.eventId,
              eventClosureTime: timeStampToDate(record?.targetDateTime),
            }));
            handleWithdraw(event, record);
            return;
          }
        } else if (event?.target?.className.includes("txnHash")) {
          goToExplorer(record?.txnId);
          return;
        }
        navigateToAbout({
          eventId: record?.eventId,
        });
        sessionStorage.setItem("tkey", "1");
      },
    };
  };

  /**
   * Handles the yes event for a specific record.
   *
   * @returns {Promise<void>}
   */
  const handleYes = async () => {
    try {
      setContractDetails((prev) => ({ ...prev, isLoading: true }));
      const response = await contractEvents({
        eventName: contractDetails?.name,
        eventId: rowDetails?.eventId,
      });

      if (response) {
        toggleSuccessModal();
        setFetchBalance(!fetchBalance);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setContractDetails((prev) => ({ ...prev, isLoading: false }));
    }
  };

  /**
   * A React component that renders an action link for a table row.
   *
   *  - The component props.
   * .record - The record object.
   * .selectedRow - The selected row detils as object.
   * @param {string} props.tableName - The table name.
   * @returns {JSX.Element}
   */
  const Action = ({ record, selectedRow, tableName }) => {
    return selectedRow?.isLoading && selectedRow?.rowIndex === record?._id ? (
      <Spin />
    ) : (
      <Link
        className={
          record?.bidType != "withdraw" && record?.isWithdraw
            ? "action pointer"
            : "action disableColor no-pointer"
        }
      >
        {decideTitle(tableName)}
      </Link>
    );
  };

  /**
   * Returns an array of column definitions for a table.
   *
   * @param {string} tableName - The table name.
   * @param {Object} selectedRow - The selected row details as object.
   * @returns {Array}
   */
  const openPositionColumns = (tableName, selectedRow) => [
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
      render: (_, record) => {
        return <Question record={record} promise={getIpfs} />;
      },
    },
    {
      title: msgs.type,
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
      title: msgs.betAmount,
      dataIndex: "bet",
      key: "bet",
      render: (_, record) => `${Number(formatNumber(record?.amount)).toFixed(env?.precision)} ${msgs.azero}`,
    },
    {
      title: msgs.dateAndTime,
      dataIndex: "datetime",
      key: "datetime",
      render: (_, record) =>
        record?.updatedAt ? globalTimeFormat(record?.updatedAt) : "-",
    },
    {
      title: msgs.action,
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Action
          record={record}
          selectedRow={selectedRow}
          tableName={tableName}
        />
      ),
    },
  ];

  useEffect(() => {
    if (metaData?.data?.length) {
      setParams(metaData?.total);
    }
  }, [metaData]);

  return {
    openPositionColumns,
    metaData,
    getLists,
    handleYes,
    onRow,
    rowDetails,
    tableParams,
    handleTableChange,
    showConfirmModal,
    contractDetails,
    toggleConfirmModal,
    showSuccessModal,
    toggleSuccessModal,
  };
};
