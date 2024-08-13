/**
 * @dev RecentActivityCard component displays a list of recent activities in a card format.
 *  - Component props
 * @param {Boolean} props.show - Boolean value decides modal to be opened or closed
 * @param {Function} props.handleCancel - Callback function to handle closing of the modal
 * @param {Array} props.previewData - Array of evidence images to be displayed
 * @returns {JSX.Element} - Rendered component
 **/
import { Modal } from "antd";
import React from "react";
import { msgs } from "../../../utils/appConstants";

const EvidenceModal = ({ show, handleCancel, previewData }) => {
  return (
    <Modal
      open={show}
      onOk={handleCancel}
      onCancel={handleCancel}
      centered={true}
      className="commonModal evidenceModal"
      footer={false}
      closable={true}
      title={msgs.evidenceDetails}
    >
      {previewData?.length?previewData?.map((item) => {
        return <img src={item} alt="img" />;
      }):nulls}
    </Modal>
  );
};

export default EvidenceModal;
