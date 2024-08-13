/**
 * Custom hook for handling bet functionality.
 *
 *  - Component props.
 * @param {Boolean} props.updated - Flag to check if data is updated.
 * @param {String} props.betClosureDate - Bet closure date in timestamp format.
 *
 * @returns {Object} - Object containing various functions and variables for handling bets.
 */
import React from "react";
import moment from "moment";
import { Button } from "antd";
import { useFormik } from "formik";
import BigNumber from "bignumber.js";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  divideByHundred,
  formatNumber,
  timeStampToDate,
  toCapitalize,
} from "../utils/helpers/commonHelper";
import { contractEvents } from "../utils/helpers/contractHelpers";
import { getWalletBalance } from "../utils/helpers/walletHelpers";
import { bet as betValidation } from "../utils/validationSchema";
import {
  contractMethods,
  env,
  maxBetAmount,
  msgs,
} from "../utils/appConstants";
import { NoIcon, YesIcon } from "../assets/StoreAsset/StoreAsset";
import { Context } from "../Pages/ContextProvider/ContextProvider";
import { getPlatFormFees } from "../Pages/Marketplace/marketPlace.helper";

export const useBet = ({ updated, betClosureDate }) => {
  const { setFetchBalance, fetchBalance } = useContext(Context);
  const { eventId, betOn } = useParams();
  const state = { eventId, betOn };
  const isEventClosed = !moment().isSameOrBefore(
    timeStampToDate(betClosureDate)
  );

  const [bet, setBetOn] = useState();
  const [confirmModal, setConfirmedModal] = useState(false);
  const [betDetails, setBetDetails] = useState({
    walletBalance: 0,
    platformFee: 0,
    odd: 0,
    even: 0,
    loading: false,
  });

  const maxAmount = betDetails?.walletBalance
    ? betDetails?.walletBalance
    : maxBetAmount;

  /**
   * Function to handle form submission.
   */
  function onSubmit() {
    betEvent();
  }

  const formik = useFormik({
    initialValues: betValidation?.initialValues(bet),
    validationSchema: betValidation?.validationSchema(
      betDetails?.walletBalance
    ),
    onSubmit,
  });

  const isDisabled =
    formik.isSubmitting ||
    !parseInt(betDetails?.walletBalance) ||
    !moment().isSameOrBefore(timeStampToDate(betClosureDate));

  /**
   * Function to check if yes/no buttons are disabled.
   *
   * @returns {Boolean} - True if buttons are disabled, false otherwise.
   */
  const isYesNoDisabled = () =>
    formik.isSubmitting ||
    !betDetails?.walletBalance ||
    (bet === "yes" ? !betDetails?.even : !betDetails?.odd) ||
    !moment().isSameOrBefore(timeStampToDate(betClosureDate));

  /**
   * Component for rendering yes/no buttons.
   *
   *  - Component props.
   * @param {String} props.bet - Bet type (yes/no).
   *
   * @returns {JSX.Element} - Yes/no button component.
   */
  const YesNoButton = ({ bet }) => {
    return (
      <Button
        className={decideClassName(bet)}
        onClick={() => handleBet(bet)}
        disabled={isYesNoDisabled()}
      >
        {" "}
        {bet === "yes" ? <YesIcon /> : <NoIcon />}
        {msgs[bet]}{" "}
        {bet === "yes" ? betDetails?.even || 0 : betDetails?.odd || 0}
      </Button>
    );
  };

  /**
   * Function to decide class name for yes/no buttons.
   *
   * @param {String} betOn - Bet type (yes/no).
   *
   * @returns {String} - Class name for yes/no button.
   */
  const decideClassName = (betOn) => {
    return `${betOn}Btn ${bet === betOn && !isEventClosed ? "active" : "noDisable"}`;
  };

  /**
   * Function to get user wallet balance and
   */
  const getUserWalletBalance = async () => {
    setBetDetails((prev) => ({ ...prev, loading: true }));
    const number = new BigNumber(await getWalletBalance());
    let quotient = Number(formatNumber(number)).toFixed(env?.precision);
    let quotientNumber = Number(quotient).toFixed(env?.precision);

    await getOddsEven();
    await getFee();
    setFetchBalance(!fetchBalance);
    setBetDetails((prev) => ({
      ...prev,
      walletBalance: quotientNumber,
      loading: false,
    }));
  };

  /**
   * Function to handle bet event.
   */
  const betEvent = async () => {
    try {
      const payload = {
        eventName: contractMethods.bet,
        betOn: toCapitalize(bet),
        amount: +formik?.values?.amount,
        eventId: state?.eventId,
      };
      const response = await contractEvents(payload);

      if (response) {
        setTimeout(() => {
          setConfirmedModal(true);
          formik.setFieldValue("betOn", state?.betOn);
          formik.setFieldValue("amount", "");
          formik.setFieldTouched("amount", false);
          formik.setSubmitting(false);
          getUserWalletBalance();
        }, 6000);
      } else {
        formik.setSubmitting(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Function to handle max amount to place bet make as input .
   */
  const handleMax = () => {
    if (!formik.isSubmitting && !isDisabled) {
      const maxAmount = Math.min(betDetails?.walletBalance - 1, maxBetAmount);
      formik.setFieldValue("amount", maxAmount);
    }
  };

  /**
   * Handles the bet placement by updating the betOn state and formik field value.
   *
   * @param {string} value - The value to bet on.
   *
   */
  const handleBet = (value) => {
    setBetOn(value);
    formik.setFieldValue("betOn", value);
  };

  /**
   * Retrieves the platform fees for the given event ID and sets the fee
   *
   * @async
   * @returns {Promise<void>}
   *
   */
  const getFee = async () => {
    const response = await getPlatFormFees(state?.eventId);
    if (response)
      setBetDetails((prev) => ({
        ...prev,
        platformFee: divideByHundred(Number(response)),
      }));
  };

  /**
   * Retrieves the odds for even and odd bets for the given event ID and sets the result in state
   *
   * @async
   *
   */
  const getOddsEven = async () => {
    try {
      const response = await contractEvents({
        eventName: contractMethods.oddEven,
        eventId: state?.eventId,
      });

      if (response?.length) {
        setBetDetails((prev) => ({
          ...prev,
          even: divideByHundred(Number(new BigNumber(response[0]))),
          odd: divideByHundred(Number(new BigNumber(response[1]))),
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Effect hook to initialize the betOn state and formik field value when the component mounts.
   * Also fetches the user's wallet balance.
   */
  useEffect(() => {
    if (state && !updated) {
      setBetOn(state?.betOn);
      formik.setFieldValue("betOn", state?.betOn);
      getUserWalletBalance();
    }
  }, []);

  /**
   * Triggers a re-fetch of the balance when the component's data is updated.
   */
  useEffect(() => {
    if (updated) setFetchBalance(!fetchBalance);
  }, [updated]);

  return {
    isEventClosed,
    formik,
    maxAmount,
    isYesNoDisabled,
    YesNoButton,
    isDisabled,
    decideClassName,
    bet,
    betEvent,
    handleBet,
    handleMax,
    confirmModal,
    betDetails,
    getFee,
    getUserWalletBalance,
    setConfirmedModal,
  };
};
