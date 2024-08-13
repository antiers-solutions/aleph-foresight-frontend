/**
 * A reusable confirmation modal component.
 *
 *
 * @param {Function} props.handleCancel - Callback function to handle cancel button click.
 * @param {Function} props.handleYes - Callback function to handle yes button click.
 * @param {Boolean} props.show - Whether to show the modal or not.
 * @param {String} props.header - The header text of the modal.
 * @param {String} props.desc - The description text of the modal.
 * @param {Boolean} props.loading - Whether to show a loading spinner on the yes button.
 * @param {ReactNode} props.icon - A custom icon to display in the modal.
 *
 */
import React from "react";
import { Modal, Spin } from "antd";
import { msgs } from "../../utils/appConstants";
import { Question } from "../../assets/StoreAsset/StoreAsset";
import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";

const CommonConfirmationModal = ({
  handleCancel,
  handleYes,
  show,
  header,
  desc,
  loading,
  icon,
}) => {
  return (
    <Modal
      open={show}
      onOk={handleCancel}
      centered={true}
      className="commonModal"
      footer={false}
      closable={false}
    >
      <div className="sureModel">
        {icon ? icon : <Question />}
        <div className="innerSec">
          <h2>{header || ""}</h2>
          <p>{desc || ""}</p>
        </div>
        <div className="btn">
          <ButtonCustom
            label={loading ? <Spin /> : msgs.yes}
            disabled={loading}
            onClick={handleYes}
            name="yes"
          />
          <ButtonCustom
            disabled={loading}
            label={msgs.no}
            btnBorder={true}
            onClick={handleCancel}
            name="no"
          />
        </div>
      </div>
    </Modal>
  );
};

export default CommonConfirmationModal;
