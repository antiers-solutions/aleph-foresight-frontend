/**
 * Hook to manage closed events component.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {string} params.type - Type of positions (e.g. 0).
 * @param {string} params.key - Key of the tab  (e.g. 2).
 *
 * @returns {Object} An object containing the following properties:
 *   - metaData: Metadata for the positions.
 *   - clsoedPositionColumns: Columns for the closed positions table.
 *   - getLists: Function to fetch the positions.
 *   - handleYes: Function to handle the "Yes" button click.
 *   - onRow: Function to handle row clicks.
 *   - rowDetails: Details of the selected row.
 *   - tableParams: Parameters for the table.
 *   - handleTableChange: Function to handle table changes.
 *   - showConfirmModal: Flag to show the confirm modal.
 *   - contractDetails: Details of the contract.
 *   - toggleConfirmModal: Function to toggle the confirm modal.
 *   - showSuccessModal: Flag to show the success modal.
 *   - toggleSuccessModal: Function to toggle the success modal.
 *
 */
import { useContext, useEffect, useState } from "react";
import {
  formatNumber,
  getIpfs,
  globalTimeFormat,
  goToExplorer,
  timeStampToDate,
  truncateText,
} from "../utils/helpers/commonHelper";
import { betOn } from "../Pages/Marketplace/marketPlace.helper";
import { decideTitle } from "../Pages/Profile/InfoTable/info.helper";
import { contractEvents } from "../utils/helpers/contractHelpers";
import { useTablePagination } from "./useTablePagination";
import { Spin, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { claimStatus, contractMethods, env, msgs } from "../utils/appConstants";
import { useEventCards } from "./useEventCards";
import Question from "../Common/Question/Question";
import { Context } from "../Pages/ContextProvider/ContextProvider";
import { useOpenClosedPositionList } from "./useOpenClosedPositionList";

export const useClosedPosition = ({ type, key }) => {
  const { navigateToAbout } = useEventCards();
  const { setFetchBalance, fetchBalance } = useContext(Context);
  const { metaData, getLists } = useOpenClosedPositionList({ type, key });
  const { handleTableChange, tableParams, setParams } =
    useTablePagination(getLists);

  const [rowDetails, setRowDetails] = useState({
    isLoading: false,
    rowIndex: null,
    eventId: null,
    eventClosureTime: null,
    isWithdraw: false,
  });
  const [contractDetails, setContractDetails] = useState({
    name: "claim_reward",
    isLoading: false,
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

  /**
   * Handles the claim event for a specific record and sets the rowdetails and opens claim details modal
   *
   * @param {Object} event - The event object of the handler.
   * @param {Object} record - The record object of the row.
   *
   */
  const handleClaim = async (event, record) => {
    if (
      event?.target?.innerText === msgs.claim &&
      record?.eventStatus === claimStatus
    ) {
      setRowDetails((prev) => ({ ...prev, isLoading: true, ...record }));
      toggleConfirmModal();
      setRowDetails((prev) => ({ ...prev, isLoading: false }));
    }
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
        eventName: rowDetails?.isWithdraw
          ? contractMethods.withdraw
          : contractDetails?.name,
        eventId: rowDetails?.eventId,
      });

      if (response) {
        toggleSuccessModal();
        setFetchBalance(!fetchBalance);
        setTimeout(async () => {
          await getLists({ page: 1, limit: 10 });
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setContractDetails((prev) => ({ ...prev, isLoading: false }));
    }
  };

  /**
   * Handles the withdraw event for a specific record, sets the row details and opens confirm modal
   *
   */
  const handleWithdraw = async () => {
    setRowDetails((prev) => ({ ...prev, isLoading: true }));
    toggleConfirmModal();
    setRowDetails((prev) => ({ ...prev, isLoading: false }));
  };

  /**
   * Returns an object with an onClick event handler for a table row for the withdraw, claim and txn details page.
   *
   * @param {Object} record - The record object.
   * @returns {Object}
   *
   */
  const onRow = (record) => {
    return {
      onClick: async (event) => {
        sessionStorage.setItem("tkey", "2");
        if (event?.target?.innerText === msgs.claim) {
          setRowDetails((prev) => ({
            ...prev,
            rowIndex: record?._id,
            isWithdraw: false,
            eventId: record?.eventId,
            eventClosureTime: timeStampToDate(record?.targetDateTime),
          }));
          handleClaim(event, record);
          return;
        } else if (event?.target?.innerText === msgs.withdraw) {
          setRowDetails((prev) => ({
            ...prev,
            rowIndex: record?._id,
            eventId: record?.eventId,
            isWithdraw: true,
            eventClosureTime: timeStampToDate(record?.targetDateTime),
          }));
          handleWithdraw(record);
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
          record?.eventStatus === 4 || record?.isWithdraw
            ? "action pointer"
            : "action disableColor no-pointer"
        }
      >
        {decideTitle(tableName, record?.isWithdraw)}
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
  const clsoedPositionColumns = (tableName, selectedRow) => [
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
          <span className={betOn?.[Number(record?.orderType)]?.toLowerCase()}>
            {betOn?.[Number(record?.orderType)] || "-"}
          </span>
        );
      },
    },
    {
      title: "Bet Amount",
      dataIndex: "bet",
      key: "bet",
      render: (_, record) => `${Number(formatNumber(record?.amount)).toFixed(env?.precision)} ${msgs.azero}`,
    },
    {
      title: "Date & Time",
      dataIndex: "datetime",
      key: "datetime",
      render: (_, record) =>
        record?.updatedAt ? globalTimeFormat(record?.updatedAt) : "-",
    },
    {
      title: "Action",
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
  }, []);

  return {
    metaData,
    clsoedPositionColumns,
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
