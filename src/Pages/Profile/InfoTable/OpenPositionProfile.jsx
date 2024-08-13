import React, { useContext } from "react";
import { Skeleton, Table } from "antd";
import "../Profile.scss";
import { msgs } from "../../../utils/appConstants";
import { useOpenPosition } from "../../../Hooks/useOpenPosition";
import CommonSuccessModal from "../../Marketplace/CommonSuccessModal";
import CommonConfirmationModal from "../../../Common/CommonConfirmModal/CommonConfirmModal";
import { Context } from "../../ContextProvider/ContextProvider";

function OpenPositionProfileMemo(key) {

  const { setFetchProfileCardData,fetchProfileCardData } = useContext(Context);
  
  // Destructure returned values from the custom hook useOpenPosition
  const {
    getLists,
    metaData,
    handleYes,
    onRow,
    openPositionColumns,
    rowDetails,
    tableParams,
    handleTableChange,
    showConfirmModal,
    contractDetails,
    toggleConfirmModal,
    showSuccessModal,
    toggleSuccessModal,
  } = useOpenPosition({
    key: 1,
    type: 1,
  });

  return (
    <div className="positionSec">
      {metaData?.isLoading ? (
        <div className="no-events-found" data-testid="skeleton-container">
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      ) : (
        <Table
          dataSource={metaData?.data}
          columns={openPositionColumns("open", rowDetails)}
          className="commonTable"
          pagination={metaData?.total > 10 ? tableParams.pagination : false}
          onChange={handleTableChange} //Handle table change events (pagination, filters, etc.)
          onRow={onRow}
        />
      )}
      <CommonConfirmationModal
        show={showConfirmModal}
        header={msgs.areYouSure}
        desc={msgs.initiateWithdraw}
        loading={contractDetails?.isLoading}
        handleYes={handleYes}
        handleCancel={toggleConfirmModal}
      />
      <CommonSuccessModal
        show={showSuccessModal}
        header={msgs.successful}
        desc={msgs.withdrawSuccessDesc}
        handleCancel={() => {
          toggleSuccessModal();
          toggleConfirmModal();
          getLists({
            page: 1,
            limit: 10,
          }); // Refresh the list after success
          setFetchProfileCardData(!fetchProfileCardData);
        }}
      />
    </div>
  );
}

const OpenPositionProfile = React.memo(OpenPositionProfileMemo);
export default OpenPositionProfile;
