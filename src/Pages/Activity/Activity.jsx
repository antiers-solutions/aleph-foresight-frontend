/**
 * Activity component that displays a table of activity data.
 *
 * This component fetches activity data and metadata using the `useGetActivity` hook,
 * and manages table pagination using the `useTablePagination` hook.
 * It also scrolls to the top of the page when the component mounts using the `useScrollToTop` hook.
 * 
 */
import { Skeleton, Table } from "antd";
import React, { useEffect } from "react";
import "./Activity.scss";
import useScrollToTop from "../../Hooks/useScrollToTop";
import { useGetActivity } from "../../Hooks/useGetActivity";
import { useTablePagination } from "../../Hooks/useTablePagination";

function Activity() {
  // Scroll to the top of the page when the component mounts
  useScrollToTop();
  // Fetch activity data and metadata
  const { metaData, getActivities, columns, onRowActivity } = useGetActivity();
  // Manage table pagination
  const { handleTableChange, tableParams, setParams } = useTablePagination(
    getActivities,
    metaData?.total || 0
  );

  // Set table parameters when metaData changes
  useEffect(() => {
    if (metaData?.data?.length) {
      setParams(metaData?.total);
    }
  }, [metaData]);

  return (
    <div
      className={`activityTable ${metaData?.data?.length ? "show-cursor" : ""}`}
    >
      <div className="container">
        {metaData?.loading ? (
          <div className="no-events-found" data-testid="skeleton-container">
            <Skeleton active paragraph={{ rows: 5 }} />
          </div>
        ) : (
          <Table
            columns={columns}
            onRow={onRowActivity}
            dataSource={metaData?.data}
            pagination={metaData?.total > 10 ? tableParams.pagination : false}
            onChange={handleTableChange}
            className="commonTable"
          />
        )}
      </div>
    </div>
  );
}

export default Activity;
