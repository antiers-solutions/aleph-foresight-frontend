/**
 * EditUserDetails component
 *
 * This component is used to edit user details in a modal form.
 * It uses Formik for form management and Ant Design for UI components.
 *
 * @param {object} props
 * @param {boolean} props.showModal - Whether to show the modal or not
 * @param {function} props.closeModal - Function to close the modal
 * @param {object} props.userDetails - User details to be edited
 *
 *
 */

import React from "react";
import { FormikProvider } from "formik";
import { Button, Modal, Spin, Upload } from "antd";
import { msgs } from "../../../utils/appConstants";
import { Camera } from "../../../assets/StoreAsset/StoreAsset";
import InputCustom from "../../../Common/InputCustom/InputCustom";
import useEditUserDetails from "../../../Hooks/useEditUserDetails";
import { ButtonCustom } from "../../../Common/ButtonCustom/ButtonCustom";

const EditUserDetails = ({ showModal, closeModal, userDetails }) => {
  const { props, profileImg, formik } = useEditUserDetails({
    userDetails,
    closeModal,
  });

  return (
    <Modal
      open={showModal}
      onOk={closeModal}
      onCancel={() => {
        if (!formik?.isSubmitting) closeModal();
      }}
      centered={true}
      closable={!formik?.isSubmitting}
      className="commonModal"
      footer={false}
    >
      <div className="editModal">
        <h2 className="heading">{msgs.profileSettings}</h2>
        <FormikProvider value={formik}>
          <form noValidate onSubmit={formik.handleSubmit}>
            <div className="upload">
              <img src={profileImg} alt="uploadIcon" />
              <Upload {...props}>
                <Button icon={<Camera />} className="uploadBtn">
                  {msgs.upload}
                </Button>
                {formik.errors.img ? (
                  <div className="error">{formik.errors?.img}</div>
                ) : null}
              </Upload>
            </div>
            <InputCustom
              placeholder={msgs.enterName}
              id="userName"
              name="userName"
              label={msgs.username}
            />
            {/* enable in future */}
            {/* <InputCustom
              placeholder={msgs.enterAlephId}
              id="chainId"
              name="chainId"
              label={msgs.alephId}
              labelcustom="aleph-id"
            /> */}
            <div className="btn">
              <ButtonCustom
                label={formik?.isSubmitting ? <Spin /> : msgs.saveChanges}
                htmlType="submit"
                disabled={formik?.isSubmitting}
              />
            </div>
          </form>
        </FormikProvider>
      </div>
    </Modal>
  );
};

export default EditUserDetails;
