/**
 * Custom hook to fetch and manage events created by the current user.
 *
 * @returns {Object} An object containing the following properties:
 *   - `metaData`: An object with the following properties:
 *     - `data`: An array of event objects.
 *     - `loading`: A boolean indicating whether the data is being fetched.
 *     - `total`: The total number of events.
 *   - `tableParams`: An object with the current table pagination parameters.
 *   - `onRow`: A function to handle row clicks.
 *   - `handleTableChange`: A function to handle table pagination changes.
 *
 */
import { useContext, useEffect, useState } from "react";
import { apiUrls } from "../api/apiUrls";
import UseGetApi from "../api/makeRequest";
import { useEventCards } from "./useEventCards";
import { useTablePagination } from "./useTablePagination";
import { goToExplorer } from "../utils/helpers/commonHelper";
import { Context } from "../Pages/ContextProvider/ContextProvider";

const useEventsCreated = () => {
  const { navigateToAbout } = useEventCards();
  const { filter } = useContext(Context);

  const [metaData, setMetaData] = useState({
    data: [],
    loading: false,
    total: 0,
  });

  /**
   * Fetches the created events of the current user.
   *
   * @param {Object} params - An object with the following properties:
   *   - `page`: The current page number.
   *   - `limit`: The number of events to fetch per page.
   */
  const createdEventsOfCurrentUser = async ({ page, limit }) => {
    try {
      setMetaData((prev) => ({
        ...prev,
        loading: true,
      }));

      const res = await UseGetApi(
        apiUrls?.createdEventsOfCurrentUser({ page, limit, filter }),
        "get"
      );

      if (res?.data) {
        const data = res?.data?.data?.eventsData;
        const total = res?.data?.data?.total;
        setMetaData((prev) => ({
          ...prev,
          data,
          total,
          loading: false,
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setMetaData((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  const { handleTableChange, tableParams, setParams } = useTablePagination(
    createdEventsOfCurrentUser
  );

  /**
   * Handles row clicks.
   *
   * @param {Object} record - The event object associated with the row.
   * @returns {Object} An object with the following properties:
   *   - `onClick`: A function to handle the row click.
   */
  const onRow = (record) => {
    return {
      onClick: async (event) => {
        sessionStorage.setItem("tkey", "4");
        if (event?.target?.className.includes("txnHash")) {
          goToExplorer(record?.txnId);
          return;
        }
        navigateToAbout({
          eventId: record?.eventId,
        });
      },
    };
  };

  useEffect(() => {
    createdEventsOfCurrentUser({ page: 1, limit: 10 });
  }, [filter]);

  useEffect(() => {
    if (metaData?.data?.length) {
      setParams(metaData?.total);
    }
  }, [metaData]);

  return {
    metaData,
    tableParams,
    onRow,
    handleTableChange,
  };
};

export default useEventsCreated;
