import React from "react";
import { FormikProvider } from "formik";
import "./RaiseDispute.scss";
import PreviewDetails from "./PreviewDetails";
import useScrollToTop from "../../Hooks/useScrollToTop";
import useRaiseDispute from "../../Hooks/useRaiseDispute";
import InputCustom from "../../Common/InputCustom/InputCustom";
import CustomSelect from "../../Common/CustomSelect/CustomSelect";
import CommonSuccessModal from "../Marketplace/CommonSuccessModal";
import CustomTextBox from "../../Common/CustomTextBox/CustomTextBox";
import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";
import { dropDownOptions, msgs, values } from "../../utils/appConstants";
import UploadFileCommon from "../../Common/UploadFileCommon/UploadFileCommon";
import CommonConfirmationModal from "../../Common/CommonConfirmModal/CommonConfirmModal";

const RaiseDispute = () => {
  useScrollToTop();

  // Destructure necessary values and methods from the custom hook
  const {
    secondEvidence,
    firstEvidence,
    eventList,
    formik,
    raiseDispute,
    isLoading,
    evidenceOneProp,
    evidenceTwoProp,
    handleSelect,
    confirmModal,
    successModal,
    setSuccessModal,
    setConfirmModal,
  } = useRaiseDispute();

  return (
    <FormikProvider value={formik}>
      <form noValidate onSubmit={formik.handleSubmit}>
        <div className="container">
          <div className="createMarket raiseDispute">
            <div className="marketHeading">
              <h2>{msgs.raiseDispute}</h2>
            </div>
            <div className="disputeSec">
              <div className="disputeLeft">
                {/* Event Selection */}
                <div className="innerSec">
                  <div className="cmnSelect">
                    <label>{msgs.chooseEvent}</label>
                    <CustomSelect
                      name="event"
                      value={formik.values?.event}
                      placeholder={msgs.selectEvent}
                      options={eventList}
                      handleSelect={handleSelect}
                    />
                  </div>
                </div>
                {/* Category Selection */}
                <div className="innerSec">
                  <div className="cmnSelect">
                    <label>{msgs.chooseCategory}</label>
                    <CustomSelect
                      name="category"
                      value={formik.values?.category}
                      placeholder={msgs.selectCategory}
                      options={dropDownOptions?.raisedDisputeCategory}
                    />
                  </div>
                </div>
                {/* Email Input */}
                <div className="innerSec">
                  <div className="mutiInput">
                    <InputCustom
                      label="Email"
                      name="email"
                      max={300}
                      placeholder={msgs.enterEmail}
                    />
                  </div>
                </div>
                {/* Description TextBox */}
                <div className="innerSec">
                  <div className="commonTextArea">
                    <label>{msgs.description}</label>
                    <CustomTextBox
                      name="description"
                      placeholder={msgs.enterDescription}
                      max={300}
                      showCount={true}
                    />
                  </div>
                </div>
                {/* File Upload */}
                <div className="innerSec upload-box">
                  <UploadFileCommon
                    formik={formik}
                    props={evidenceOneProp}
                    imgInfo={firstEvidence?.value}
                    values={values}
                    loading={firstEvidence?.loading}
                  />{" "}
                  <UploadFileCommon
                    formik={formik}
                    props={evidenceTwoProp}
                    imgInfo={secondEvidence?.value}
                    values={values}
                    loading={secondEvidence?.loading}
                  />
                </div>
                {/* Error Message */}
                {formik.errors?.["img"] && formik.touched["img"] ? (
                  <div className="error errorRaiseDispute">
                    {formik.errors["img"]}
                  </div>
                ) : null}

                {/* Submit Button */}
                <div className="previewBtn">
                  <ButtonCustom label="Submit" htmlType="submit" />
                </div>
              </div>
              {/* Preview Details Component */}
              <PreviewDetails preview={formik?.values?.eventDetails} />
            </div>
            <CommonConfirmationModal
              show={confirmModal}
              header={msgs.areYouSure}
              desc={msgs.initiateDispute}
              closable={false}
              loading={isLoading}
              handleYes={async (e) => {
                e.preventDefault();
                await raiseDispute();
              }}
              handleCancel={() => setConfirmModal(false)}
            />
            <CommonSuccessModal
              show={successModal}
              header={msgs.successful}
              desc={msgs.disputeSubmitted}
              handleCancel={() => {
                setSuccessModal(!successModal);
              }}
            />
          </div>
        </div>
      </form>
    </FormikProvider>
  );
};

export default RaiseDispute;
