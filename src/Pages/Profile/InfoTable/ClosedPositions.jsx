/**
 * ClosedPositions component displays a table of events which are closed.
 * It uses the useClosedPosition hook to fetch data and handle table changes.
 * It also renders a ClaimModal and a CommonSuccessModal for claiming and withdrawing positions.
 * @returns {JSX.Element} - ClosedPositions component
 *
 */
import React, { useContext } from "react";
import { Table, Skeleton } from "antd";
import "../Profile.scss";
import ClaimModal from "./ClaimModal";
import { msgs } from "../../../utils/appConstants";
import CommonSuccessModal from "../../Marketplace/CommonSuccessModal";
import { useClosedPosition } from "../../../Hooks/useClosedPosition";
import CommonConfirmationModal from "../../../Common/CommonConfirmModal/CommonConfirmModal";
import { Context } from "../../ContextProvider/ContextProvider";

const ClosedPositionsMemo = () => {
  const { setFetchProfileCardData, fetchProfileCardData } = useContext(Context);

  /**
   * useClosedPosition hook returns an object with the following properties:
   * - metaData: object with isLoading, data, and total properties
   * - handleYes: function to handle yes button click
   * - onRow: function to handle row click
   * - rowDetails: object with row details
   * - tableParams: object with pagination properties
   * - handleTableChange: function to handle table changes
   * - showConfirmModal: boolean to show/hide confirm modal
   * - contractDetails: object with contract details
   * - toggleConfirmModal: function to toggle confirm modal
   * - showSuccessModal: boolean to show/hide success modal
   * - toggleSuccessModal: function to toggle success modal
   * - clsoedPositionColumns: function to generate columns for the table
   *
   */
  const {
    metaData,
    onRow,
    handleYes,
    rowDetails,
    tableParams,
    contractDetails,
    handleTableChange,
    showConfirmModal,
    toggleConfirmModal,
    showSuccessModal,
    toggleSuccessModal,
    clsoedPositionColumns,
  } = useClosedPosition({
    key: 2,
    type: 0,
  });

  return (
    <div className="positionSec">
      {metaData?.isLoading ? (
        <div className="no-events-found" data-testid="skeleton-container">
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      ) : (
        <Table
          onRow={onRow}
          className="commonTable"
          dataSource={metaData?.data}
          onChange={handleTableChange}
          columns={clsoedPositionColumns("closed", rowDetails)}
          pagination={metaData?.total > 10 ? tableParams.pagination : false}
        />
      )}
      <CommonConfirmationModal
        show={rowDetails?.isWithdraw && showConfirmModal}
        header={msgs.areYouSure}
        desc={msgs.initiateWithdraw}
        loading={contractDetails?.isLoading}
        handleYes={handleYes}
        handleCancel={toggleConfirmModal}
      />
      <ClaimModal
        show={!rowDetails?.isWithdraw && showConfirmModal}
        handleYes={handleYes}
        handleCancel={toggleConfirmModal}
        rowDetails={rowDetails}
        loading={contractDetails?.isLoading}
      />
      <CommonSuccessModal
        show={showSuccessModal}
        header={msgs.successful}
        desc={
          rowDetails?.isWithdraw
            ? msgs.withdrawSuccessDesc
            : msgs.successfullyClaimedDesc
        }
        handleCancel={() => {
          toggleSuccessModal();
          toggleConfirmModal();
          setFetchProfileCardData(!fetchProfileCardData);
        }}
      />
    </div>
  );
};

const ClosedPositions = React.memo(ClosedPositionsMemo);
export default ClosedPositions;
