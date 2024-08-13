/**
 * A custom React hook for managing table pagination.
 *
 * @param {function} fnName - A callback function that will be called when the table pagination changes.
 * @returns {object} An object containing the current table parameters, a function to handle table changes, and a function to set the total number of items.
 *
 */
import { useState } from "react";

export const useTablePagination = (fnName) => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  /**
   * Handles changes to the table pagination.
   *
   * @param {object} pagination - The new pagination object.
   */
  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
    fnName({
      limit: pagination?.pageSize,
      page: pagination?.current,
    });
  };

  /**
   * Sets the total number of items in the table.
   *
   * @param {number} total - The total number of items.
   */
  const setParams = (total) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total,
      },
    });
  };

  return {
    tableParams,
    handleTableChange,
    setParams,
  };
};
