/**
 * BetSlip component allows users to place a bet on an event.
 * @param {Function} callApi - Function to call API after bet is placed.
 * @param {boolean} updated - Indicates if the component has been updated.
 * @param {number} betClosureDate - Timestamp for bet closure date.
 */
import React from "react";
import { Skeleton, Spin } from "antd";
import { FormikProvider } from "formik";
import { useBet } from "../../Hooks/useBet";
import { msgs } from "../../utils/appConstants";
import CommonSuccessModal from "./CommonSuccessModal";
import InputCustom from "../../Common/InputCustom/InputCustom";
import FormikError from "../../Common/FormikError/FormikError";
import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";

const BetSlip = ({ callApi, updated, betClosureDate }) => {
  // Initialize custom hook for bet functionality
  const {
    formik,
    bet,
    handleMax,
    confirmModal,
    betDetails,
    isDisabled,
    maxAmount,
    YesNoButton,
    setConfirmedModal,
    isEventClosed,
  } = useBet({ updated, betClosureDate });
 
  return (
    <div className="rightSec">
      {
        <div className="betSlipCard">
          <div className="platForm">
            <h2 className="slipHeading">{msgs.betSlip}</h2>
              {/* Display Platform Fee */}
              <p>
              {msgs.platformFee}<span className="p-colon">:</span> {betDetails?.platformFee || 0}%
            </p>
          </div>
          {/* Yes/No Buttons */}
          <div className="yesnoBtn betSlipSkeleton">
            {betDetails?.loading ? (
              <>
                <Skeleton.Input active paragraph={{ rows: 5 }} />
                <Skeleton.Input active paragraph={{ rows: 5 }} />
              </>
            ) : (
              <>
                <YesNoButton bet={"yes"}  />
                <YesNoButton bet={"no"}  />
              </>
            )}
          </div>

          {/* Formik Form for Bet Slip */}
          <FormikProvider value={formik}>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
              className="formBetslip"
            >
              {/* Enter Amount Section */}
              <div className="enterAmount">
                <div className="labelSec">
                  <h2>{msgs.enterAmount}</h2>
                  <p
                    onClick={handleMax}
                    className={`max-p ${isDisabled ? "no-pointer" : null}`}
                  >
                    {msgs.max}
                  </p>
                </div>
                {betDetails?.loading ? (
                  <Skeleton.Input active paragraph={{ rows: 5 }} />
                ) : (
                  <InputCustom
                    name="amount"
                    type="number"
                    formik={formik}
                    decimal={7}
                    inputInnerTxt={true}
                    disabled={isDisabled}
                    innertxt={msgs.azero}
                    max={parseInt(maxAmount)}
                    placeholder={msgs.enterAmount}
                    maxLength={parseInt(maxAmount).toString().length - 1}
                  />
                )}
                <FormikError>{formik.errors["betOn"]}</FormikError>
              </div>
              {/* Display Wallet Balance */}
              {betDetails?.loading ? (
                <Skeleton.Input
                  active
                  paragraph={{ rows: 5 }}
                  className="secondBetBtn"
                />
              ) : (
                <div className="balanceAzero">
                  <p>
                    {`${msgs.balance}: ${betDetails?.walletBalance || 0} ${
                      msgs.azero
                    }`}{" "}
                  </p>
                </div>
              )}
              {/* Submit Button */}
              {betDetails?.loading ? (
                <Skeleton.Input active paragraph={{ rows: 5 }} />
              ) : (
                <ButtonCustom
                  customClass={
                    isEventClosed
                      ? "noBtn"
                      : bet === "yes"
                      ? `yesBtn ${betDetails?.loading ? "applyMargin" : null}`
                      : `noBtn ${betDetails?.loading ? "applyMargin" : null}`
                  }
                  label={
                    formik.isSubmitting ? (
                      <Spin />
                    ) : betClosureDate && isEventClosed ? (
                      msgs.eventClosed
                    ) : (
                      msgs.buy
                    )
                  }
                  htmlType="submit"
                  disabled={isDisabled}
                />
              )}

            </form>
          </FormikProvider>
          <CommonSuccessModal
            show={confirmModal}
            header={msgs.successful}
            desc={msgs.betConfirmed}
            handleCancel={() => {
              setConfirmedModal(false);
              callApi();
            }}
          />
        </div>
      }
    </div>
  );
};

export default BetSlip;
