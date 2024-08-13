
/**
 * CommonSuccessModal component displays a success message in a modal.
 * @param {boolean} show - Determines whether the modal is visible.
 * @param {Function} handleCancel - Function to handle closing the modal.
 * @param {string} header - The header text of the modal.
 * @param {string} desc - The description text of the modal.
 */
import { Modal } from "antd";
import React from "react";
import { Successful } from "../../assets/StoreAsset/StoreAsset";
import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";
import { msgs } from "../../utils/appConstants";

const CommonSuccessModal = ({ show, handleCancel, header, desc }) => {
  return (
    <Modal
      centered={true}
      open={show}
      onOk={handleCancel}
      onCancel={handleCancel}
      className="commonModal"
      footer={false}
      closable={false}
    >
      <div className="sureModel">
        {/* Success Icon */}
        <Successful />
        {/* Modal Content */}
        <div className="innerSec">
          <h2>{header || ""}</h2>
          <p>{desc || ""}</p>
        </div>
        {/* Done Button */}
        <div className="btn">
          <ButtonCustom label={msgs.done} onClick={() => handleCancel(true)} />
        </div>
      </div>
    </Modal>
  );
};

export default CommonSuccessModal;
