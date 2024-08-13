/**
 * Hook to fetch and manage dispute list data.
 *
 * @returns {object} An object containing dispute list data, pagination metadata, and functions to handle table changes and modal toggling.
 *
 */
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  getIpfs,
  globalTimeFormat,
  goToExplorer,
} from "../utils/helpers/commonHelper";
import { apiUrls } from "../api/apiUrls";
import UseGetApi from "../api/makeRequest";
import { useEventCards } from "./useEventCards";
import Question from "../Common/Question/Question";
import { useTablePagination } from "./useTablePagination";
import { Context } from "../Pages/ContextProvider/ContextProvider";

export const useRaiseDisputeList = () => {
  const { filter } = useContext(Context);
  const { navigateToAbout } = useEventCards();

  const [show, setShow] = useState(false);
  const [rowDetails, setRowDetails] = useState({
    isLoading: false,
    rowIndex: null,
    eventId: null,
    eventClosureTime: null,
  });
  const [metaData, setMetaData] = useState({
    data: [],
    page: 1,
    limit: 10,
    isLoading: false,
    total: 0,
  });

  /**
   * Fetches dispute list data from API.
   *
   * @async
   */
  const getDisputeList = async () => {
    try {
      setMetaData((prev) => ({
        ...prev,
        isLoading: true,
      }));
      const response = await UseGetApi(
        apiUrls?.getDisputeList({
          page: metaData?.page,
          limit: metaData?.limit,
          filter,
        })
      );
      if (response?.data?.data?.dispute) {
        setMetaData((prev) => ({
          ...prev,
          data: response?.data?.data?.dispute,
          total: response?.data?.data?.total,
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setMetaData((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  /**
   * Toggles dispute modal visibility.
   */
  const toggleDisputeModal = () => {
    setShow(!show);
  };

  const { handleTableChange, tableParams, setParams } =
    useTablePagination(getDisputeList);

  /**
   * Handles row click event.
   *
   * @param {object} record - Row data.
   * @returns {object} An object containing onClick event handler.
   */

  const onRow = (record) => {
    return {
      onClick: async (event) => {
        if (event?.target?.innerText === "View Details") {
          setRowDetails(record);
          toggleDisputeModal();
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
   * Table columns configuration.
   *
   * @type {array}
   */
  const columns = [
    {
      title: "Events",
      dataIndex: "event",
      key: "event",
      render: (_, record) => {
        return <Question record={record} promise={getIpfs} />;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (_, record) => record?.category,
    },
    {
      title: "Date & Time",
      dataIndex: "datetime",
      key: "datetime",
      render: (_, record) => {
        return globalTimeFormat(record?.createdAt);
      },
    },
    {
      title: "Dispute Status",
      dataIndex: "disputestatus",
      key: "disputestatus",
      render: (_, record) => (
        <div className={record?.status === "open" ? "yes" : "no"}>
          {record?.status}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => <Link className="action">View Details</Link>,
    },
  ];

  /**
   * Fetches the dispute list when the filter changes.
   **/
  useEffect(() => {
    getDisputeList();
  }, [filter]);

  /**
   * Updates the pagination parameters when metadata is received.
   *
   * @param {object} metaData - The metadata object containing information about the dispute list.
   * @param {array} metaData.data - The list of disputes.
   * @param {number} metaData.total - The total number of disputes.
   *
   **/
  useEffect(() => {
    if (metaData?.data?.length) {
      setParams(metaData?.total);
    }
  }, [metaData]);

  return {
    metaData,
    show,
    toggleDisputeModal,
    columns,
    rowDetails,
    onRow,
    handleTableChange,
    tableParams,
  };
};
