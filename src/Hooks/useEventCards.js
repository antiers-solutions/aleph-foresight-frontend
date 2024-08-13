/**
 * Custom hook to handle event card functionality.
 *
 * @param {object} data - Event data.
 * @returns {object} An object containing functions and state variables to handle event card interactions.
 *
 */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWallet from "./useWallet";
import Path from "../Routing/Constant/RoutePaths";
import { isLoggedIn } from "../utils/helpers/walletHelpers";
import { Context } from "../Pages/ContextProvider/ContextProvider";

export const useEventCards = () => {
  const navigate = useNavigate();
  const { addNetwork } = useWallet();
  const { coinUrl } = useContext(Context);

  /**
   * State variable to show/hide the event card.
   */
  const [show, setShow] = useState(false);
  /**
   * State variable to store event parameters.
   */
  const [params, setParams] = useState(null);
  /**
   * State variable to indicate loading status.
   */
  const [isLoading, setLoading] = useState(false);

  /**
   * Handles cancel button click.
   */
  const handleCancel = () => {
    setShow(!show);
  };

  /**
   * Handles yes button click.
   */
  const handleYes = async () => {
    setLoading(true);
    const response = await addNetwork();
    if (response?.data?.data?.wallet_address) {
      navigateToAbout(params);
      handleCancel();
      setLoading(false);
    }
    setLoading(false);
  };

  /**
   * Navigates to Aboutmarketplace page.
   *
   * @param {object} params - Event parameters.
   */
  const navigateToAbout = (params) => {
    navigate(
      Path?.ABOUTMARKETPLACE + `${params?.betOn || "yes"}/${params?.eventId}`
    );
  };

  /**
   * Handles bet on button click i.e to navigate to Aboutmarketplace page in logged in/out state
   *
   * @param {object} params - Event parameters.
   */
  const handleBetOn = async (params) => {
    if (isLoggedIn()) {
      navigateToAbout(params);
    } else {
      handleCancel();
      setParams(params);
    }
  };

  return {
    handleBetOn,
    handleCancel,
    handleYes,
    isLoading,
    show,
    coinUrl,
    navigateToAbout,
  };
};
