import React from "react";
import { FormikProvider } from "formik";
import { useLocation } from "react-router-dom";
import "./CreateMarket.scss";
import PreviewModal from "./PreviewModal";
import CustomDate from "../../Common/CustomDate/CustomDate";
import InputCustom from "../../Common/InputCustom/InputCustom";
import CustomSelect from "../../Common/CustomSelect/CustomSelect";
import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";
import {
  defaultTargetDate,
  defaultClosureDate,
  handleTargetDateChange,
} from "./createMarket.helper";
import { msgs } from "../../utils/appConstants";
import Path from "../../Routing/Constant/RoutePaths";
import { useCreateMarket } from "../../Hooks/useCreateMarket";
import CommonSuccessModal from "../Marketplace/CommonSuccessModal";
import useEventHeader from "../../Hooks/useEventHeader";

const CreateMarket = () => {
  const { state } = useLocation();
  const isLocationSame = state?.from === Path?.ABOUTMARKETPLACE;

  const { isEditable, checkEditability } = useEventHeader({
    data: state?.data,
  });
  
  const {
    formik,
    coinUrl,
    showCoins,
    handleCancel,
    previewOpen,
    confirmOpen,
    toggleConfirm,
    togglePreview,
    formatInnerLabel,
  } = useCreateMarket({
    fromAboutMarket: isLocationSame,
    isEditable,
    checkEditability,
  });

  return (
    <FormikProvider value={formik}>
      <form noValidate onSubmit={formik.handleSubmit}>
        <div className="container">
          <div className="createMarket">
            <div className="marketHeading">
              <h2>{msgs.createMarket}</h2>
            </div>
            {/* choose crypto and prive level  */}
            <div className="innerSec">
              <div className="cmnSelect">
                <label>{msgs.chooseCrypto}</label>
                <CustomSelect
                  name="coin"
                  options={showCoins}
                  disabled={isLocationSame && isEditable}
                  value={formik?.values?.coin}
                  placeholder={msgs.selectCoin}
                />
              </div>
              <InputCustom
                type="number"
                decimal={7}
                maxLength={5}
                max={1000000}
                innertxt={msgs.usdt}
                name="priceLevel"
                label={msgs.priceLevel}
                formik={formik}
                inputInnerTxt={true}
                placeholder={msgs.enterPrice}
              />
            </div>
            {/* Target date and time and event duration */}
            <div className="innerSec">
              <div className="cmnDatePicker">
                <label>{msgs.targetDateTime}</label>
                <CustomDate
                  name="targetDate"
                  showTime={true}
                  placeholder={msgs.selectDate}
                  defaultValue={defaultTargetDate}
                  onChange={(val) => handleTargetDateChange(val, formik)}
                />
              </div>
              {/* days and hours */}
              <div className="mutiInput">
                <InputCustom
                  type="number"
                  readOnly={true}
                  inputInnerTxt={true}
                  name="eventDurationDays"
                  label={msgs.eventDuration}
                  mainClassLayout="cursorNot"
                  placeholder={msgs.eventDays}
                  innertxt={formatInnerLabel(
                    formik.values?.eventDurationDays > 1,
                    msgs.day
                  )}
                />
                <InputCustom
                  type="number"
                  readOnly={true}
                  inputInnerTxt={true}
                  innertxt={formatInnerLabel(
                    formik.values?.eventDurationHours > 1,
                    msgs.hour
                  )}
                  name="eventDurationHours"
                  placeholder="Enter hours"
                  mainClassLayout="hoursInput cursorNot"
                />
              </div>
            </div>
            {/* Betting closure time */}
            <div className="innerSec">
              <div className="singleInput">
                <div className="cmnDatePicker">
                  <label>{msgs.bettingClosureTime}</label>
                  <CustomDate
                    showTime={true}
                    disabled={true}
                    name="closureTime"
                    defaultValue={defaultClosureDate}
                    placeholder={msgs.bettingClosureDate}
                  />
                </div>
              </div>
            </div>
            <div className="previewBtn">
              <ButtonCustom label={msgs.preview} htmlType="submit" />
            </div>
            <PreviewModal
              show={previewOpen}
              coinUrl={coinUrl}
              values={formik?.values}
              eventEdited={isLocationSame}
              eventId={state?.eventId}
              handleCancel={togglePreview}
              successModal={toggleConfirm}
            />
            <CommonSuccessModal
              show={confirmOpen}
              header={msgs.successful}
              desc={msgs.eventPublished}
              handleCancel={handleCancel}
            />
          </div>
        </div>
      </form>
    </FormikProvider>
  );
};

export default CreateMarket;
