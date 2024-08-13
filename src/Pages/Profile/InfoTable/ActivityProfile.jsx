/**
 * Activity Profile Component
 *
 * This component displays a table of activities of the logged in user's betting details with pagination.
 * It uses the `useGetActivity` hook to fetch activity data and the `useTablePagination` hook to handle table pagination.
 *
 * @returns {JSX.Element} - Activity Profile component
 */
import { Skeleton, Table } from "antd";
import React, { useEffect } from "react";
import { useTablePagination } from "../../../Hooks/useTablePagination";
import { useGetActivity } from "../../../Hooks/useGetActivity";

// function ActivityProfileMemo(key) {
function ActivityProfile() {
  /**
   * Destructured values from useGetActivity hook
   *
   * @type {object}
   * @property {object} metaData - Meta data for the activity profiles
   * @property {function} getActivities - Function to fetch activity profiles
   * @property {array} activityProfileColumns - Columns for the activity profile table
   * @property {function} onRowActivityProfile - Function to handle row clicks
   */
  const {
    metaData,
    getActivities,
    activityProfileColumns,
    onRowActivityProfile,
  } = useGetActivity(true);

  /**
   * Destructured values from useTablePagination hook
   *
   * @type {object}
   * @property {function} handleTableChange - Function to handle table changes
   * @property {object} tableParams - Table pagination parameters
   * @property {function} setParams - Function to set table pagination parameters
   */
  const { handleTableChange, tableParams, setParams } = useTablePagination(
    getActivities,
    metaData?.total
  );

  useEffect(() => {
    if (!metaData?.data?.length) return
      setParams(metaData?.total);
  }, [metaData]);

  return (
    <div className="positionSec">
      {metaData?.loading ? (
        <div className="no-events-found" data-testid="skeleton-container">
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      ) : (
        <Table
          dataSource={metaData?.data}
          pagination={metaData?.total > 10 ? tableParams?.pagination : false}
          onChange={handleTableChange}
          columns={activityProfileColumns}
          className="commonTable"
          onRow={onRowActivityProfile}
        />
      )}
    </div>
  );
}

// const ActivityProfile = React.memo(ActivityProfileMemo);
export default ActivityProfile;
