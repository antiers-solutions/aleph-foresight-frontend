/**
 * A React component to display a "No Data" message or a loading spinner.
 *
 *
 * @param {boolean} props.loading - Whether to display the loading spinner.
 * @param {string} [props.data="records"] - The type of data being displayed (e.g. "events", "users", etc.).
 * @returns {JSX.Element} The "No Data" message or loading spinner.
 *
 */
import React from "react";
import { Skeleton } from "antd";

const NoData = ({ loading, data }) => {
  return (
    <div
      className={`no-events-found ${loading ? "" : "blue-border"}`}
      data-testid="skeleton-container"
    >
      {loading
        ? Array.from({ length: 3 }, (_, index) => index + 1).map((item,index) => (
            <div className="recentSkeleton" key={index}>
              <Skeleton
                active
                paragraph={{ rows: 2 }}
                className="cardSkeleton"
              />
              <Skeleton
                active
                paragraph={{ rows: 2 }}
                className="cardSkeleton"
              />
            </div>
          ))
        : `No ${data || "records"} Found`}
    </div>
  );
};

export default NoData;
