import React from "react";
import { Modal, Spin, Tooltip } from "antd";
import { msgs } from "../../utils/appConstants";
import usePublish from "../../Hooks/usePublish";
import { InfoIcon } from "../../assets/StoreAsset/StoreAsset";
import { previewPublishModalData } from "./createMarket.helper";
import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";

const PreviewModal = ({
  eventEdited,
  eventId,
  show,
  coinUrl,
  handleCancel,
  successModal,
  values: {
    closureTime,
    priceLevel,
    targetDate,
    coin,
    eventDurationDays,
    eventDurationHours,
  },
}) => {
  const { publish, loading, fees } = usePublish({
    eventId,
    eventEdited,
    successModal,
    coin,
    priceLevel,
    targetDate,
  });

  return (
    <Modal
      open={show}
      closable={false}
      className="commonModal"
      footer={false}
      title={msgs.previewEvent}
    >
      <div className="previewBtnModal">
        <div className="innerDetail">
          {previewPublishModalData({
            coin,
            coinUrl,
            priceLevel,
            targetDate,
            closureTime,
            eventDurationDays,
            eventDurationHours,
          }).map((item, index) => {
            return (
              <div className="detail" key={index}>
                <h2>{item?.label} </h2>
                <h3>{item?.desc}</h3>
              </div>
            );
          })}
        </div>
        {/* info */}
        <div className="info">
          <p>
            <Tooltip title={msgs.toolTip.platformFee} placement="top">
              <p>
                <InfoIcon />
              </p>
            </Tooltip>
            <span>{msgs.platformFee}
            <span style={{color:"#fff"}}>:</span></span> {fees?.platformFee || 0}%
          </p>
          <p>
            <Tooltip title={msgs.toolTip.reward} placement="top">
              <p>
                <InfoIcon />
              </p>
            </Tooltip>
            <span> {msgs.rewards}<span style={{color:"#fff"}}>:</span></span> {fees?.rewards || 0}% of{" "}
            {msgs.platformFee}
          </p>
        </div>
        {/* confirmation buttons */}
        <div className="btn">
          <ButtonCustom
            label={msgs.back}
            btnBorder={true}
            disabled={loading}
            onClick={handleCancel}
          />
          <ButtonCustom
            disabled={loading}
            label={loading ? <Spin /> : msgs.publish}
            onClick={publish}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
