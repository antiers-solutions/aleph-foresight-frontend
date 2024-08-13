/**
 * ClaimModal Component
 *
 * This component represents a modal window that displays claim details.
 * It uses the `useClaimDetails` hook to fetch metadata and the `ButtonCustom` component for the confirm button.
 *
 *
 * @param {Boolean} props.show - Controls the visibility of the modal
 * @param {Function} props.handleCancel - Handle Cancel button click
 * @param {Function} props.handleYes - Handle OK button click
 * .rowDetails - Details of the claim
 *
 */
import React from "react";
import { Modal, Skeleton, Spin } from "antd";
import useClaimDetails from "../../../Hooks/useClaimDetails";
import { ButtonCustom } from "../../../Common/ButtonCustom/ButtonCustom";
import { getClassName } from "../../RecentActivity/recentActivity.helper";
import { msgs } from "../../../utils/appConstants";

const ClaimModal = ({ show, handleCancel, handleYes, rowDetails, loading }) => {
  const { metaData } = useClaimDetails({ rowDetails });

  return (
    <Modal
      title={msgs.claimDetails} // Title of the modal
      open={show} // Controls the visibility of the modal
      onOk={handleYes} // Handle OK button click
      className="claimModal"
      footer={false}
      centered={true} // Center the modal on the screen
      onCancel={() => {
        if (!loading) handleCancel();
      }} // Handle Cancel button click
      closable={!loading}
    >
      <div className="claimModal_description">
        <div className="claimTable">
          {metaData?.loading ? (
            <Skeleton.Input active paragraph={{ rows: 5 }} />
          ) : (
            <>
              <div className="claimModal_description_header">
                <p>
                  {msgs.bet} ({msgs.azero})
                </p>
                <p>{msgs.yes}</p>
                <p>{msgs.no}</p>
              </div>
              <div className="claimModal_description_content">
                {metaData.data.map((item, index) => (
                  <div key={index}>
                    <p>{item.label}</p>
                    {item.values.map((value, idx) => (
                      <p key={idx}>{value}</p>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="claimModal_description_ended">
          <h3>
            {" "}
            {msgs.eventsEnded}
            <span
              className={
                rowDetails?.settlement
                  ? getClassName(rowDetails?.settlement)
                  : ""
              }
            >
              {" "}
              {rowDetails?.settlement || "-"}
            </span>
          </h3>
          <div className="descriptionclaim">
            {metaData?.loading
              ? metaData?.eventDetails?.map((item, index) => {
                  return (
                    <Skeleton.Input
                      active
                      paragraph={{ rows: 5 }}
                      className="sourceTruth yesnoBtn amount"
                    />
                  );
                })
              : metaData?.eventDetails?.map((item, index) => {
                  return (
                    <div key={index} className="descriptionclaim_inner">
                      <p>{item?.label}</p>
                      <h4>{item?.values}</h4>
                    </div>
                  );
                })}
          </div>
          <div className="claimModal_description_button">
            <ButtonCustom
              label={loading ? <Spin spinning={true} /> : "Confirm"}
              onClick={handleYes}
              disabled={loading || metaData?.loading}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ClaimModal;
