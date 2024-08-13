/**
 * Hook to manage positions and handle withdraw and yes/no bets.
 *
 * @param {object} props - Props object with `getYesNoBets` function.
 * @returns {object} Object with various states and functions to manage positions.
 *
 */
import { useContext, useState } from "react";
import { contractMethods, msgs } from "../utils/appConstants";
import { contractEvents } from "../utils/helpers/contractHelpers";
import { Context } from "../Pages/ContextProvider/ContextProvider";
import { formatNumber, timeStampToDate } from "../utils/helpers/commonHelper";

export const usePositions = ({ getYesNoBets }) => {
  const { setFetchBalance, fetchBalance } = useContext(Context);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [updated, setGetUpdatedBalance] = useState(false); //State to track whether to update balance.
  const [rowDetails, setRowDetails] = useState({
    isLoading: false,
    rowIndex: null,
    eventId: null,
    eventClosureTime: null,
  });
  const [contractDetails, setContractDetails] = useState({
    name: contractMethods.withdraw,
    isLoading: false,
  });

  /**
   * Toggle confirm modal.
   */
  const toggleConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  /**
   * Toggle success modal.
   */
  const toggleSuccessModal = () => {
    setShowSuccessModal(!showSuccessModal);
  };

  /**
   * Handle withdraw action.
   *
   * @param {object} event - Event object.
   * @param {object} record - Record object.
   */
  const handleWithdraw = async (event, record) => {
    if (event?.target?.innerText === msgs.withdraw) {
      setRowDetails((prev) => ({ ...prev, isLoading: true }));
      const bets = await getYesNoBets(record?.eventId);
      if (
        formatNumber(bets?.["yes"]) === 0 ||
        formatNumber(bets?.["no"]) === 0
      ) {
        toggleConfirmModal();
      }
      setRowDetails((prev) => ({ ...prev, isLoading: false }));
    }
  };

  /**
   * Handle row click event.
   *
   * @param {object} record - Record object.
   * @returns {object} Object with onClick function.
   */
  const onRow = (record) => {
    return {
      onClick: async (event) => {
        const isWithdraw =
          record?.bets?.["yes"] === 0 || record?.bets?.["no"] === 0;

        if (isWithdraw) {
          setRowDetails((prev) => ({
            ...prev,
            rowIndex: record?._id,
            eventId: record?.eventId,
            eventClosureTime: timeStampToDate(record?.targetDateTime),
          }));
          handleWithdraw(event, record);
        }
      },
    };
  };

  /**
   * Handle yes action.
   */
  const handleYes = async () => {
    try {
      setContractDetails((prev) => ({ ...prev, isLoading: true }));
      const response = await contractEvents({
        eventName: contractDetails?.name,
        eventId: rowDetails?.eventId,
      });

      if (response) {
        toggleSuccessModal();
        setGetUpdatedBalance(!updated);
        setFetchBalance(!fetchBalance);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setContractDetails((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return {
    rowDetails,
    updated,
    contractDetails,
    onRow,
    handleYes,
    showSuccessModal,
    showConfirmModal,
    toggleConfirmModal,
    toggleSuccessModal,
  };
};
