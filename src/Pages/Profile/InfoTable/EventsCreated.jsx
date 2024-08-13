/**
 * Created Profile Component
 *
 * This component displays a table of created events by the logged in user with pagination.
 *
 * @returns {JSX.Element} Created Profile Component
 *
 */
import React from "react";
import { Skeleton, Table } from "antd";
import { eventsCreatedColumns } from "./info.helper";
import useEventsCreated from "../../../Hooks/useEventsCreated";

const EventsCreatedMemo = () => {
  const { metaData, handleTableChange, tableParams, onRow } =
    useEventsCreated();

  return (
    <div className="positionSec">
      {metaData?.loading ? (
        <div className="no-events-found" data-testid="skeleton-container">
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      ) : (
        <Table
          dataSource={metaData?.data}
          columns={eventsCreatedColumns()}
          className="commonTable"
          pagination={metaData?.total > 10 ? tableParams.pagination : false}
          onChange={handleTableChange}
          onRow={onRow}
        />
      )}
    </div>
  );
};

const EventsCreated = React.memo(EventsCreatedMemo);
export default EventsCreated;
