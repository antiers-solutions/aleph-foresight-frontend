import React from "react";
import { Skeleton, Table } from "antd";
import DisputeDetails from "./DisputeDetails";
import { msgs } from "../../../utils/appConstants";
import { useRaiseDisputeList } from "../../../Hooks/useRaiseDisputeList";

const MydisputesMemo = () => {
  // Destructure returned values from the custom hook useRaiseDisputeList
  const {
    columns,
    rowDetails,
    onRow,
    handleTableChange,
    tableParams,
    metaData,
    show,
    toggleDisputeModal,
  } = useRaiseDisputeList();

  return (
    <div className="positionSec">
      {metaData?.isLoading ? (
        <div className="no-events-found" data-testid="skeleton-container">
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      ) : (
        <Table
          onRow={onRow}
          columns={columns}
          className="commonTable"
          dataSource={metaData?.data}
          onChange={handleTableChange} // Handle table change events (pagination, filters, etc.)
          pagination={metaData?.total > 10 ? tableParams.pagination : false}
        />
      )}

      {/* DisputeDetails modal */}
      <DisputeDetails
        visible={show}
        onClose={toggleDisputeModal}
        title={msgs.disputeDetails}
        modalData={rowDetails}
        width={631}
      />
    </div>
  );
};

const Mydisputes = React.memo(MydisputesMemo);
export default Mydisputes;
