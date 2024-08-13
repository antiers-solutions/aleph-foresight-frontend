/**
 * Custom hook for creating a market.
 *
 * @param {boolean} fromAboutMarket - Whether the market is being redirected from the AboutMarketplace.jsx page.
 *
 * @returns {object} An object containing the following properties:
 *  - eventDetails: The event details from the context.
 *  - formik: The Formik instance for managing the form.
 *  - coinUrl: The coin URL from the context.
 *  - showCoins: The list of coins to display.
 *  - handleCancel: A function to handle cancelling the market creation.
 *  - previewOpen: A boolean indicating whether the preview modal is open.
 *  - confirmOpen: A boolean indicating whether the confirmation modal is open.
 *  - toggleConfirm: A function to toggle the confirmation modal.
 *  - togglePreview: A function to toggle the preview modal.
 *  - formatInnerLabel: A function to format the inner label of a field.
 *
 */
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useScrollToTop from "./useScrollToTop";
import Path from "../Routing/Constant/RoutePaths";
import { creatMarket } from "../utils/validationSchema";
import { Context } from "../Pages/ContextProvider/ContextProvider";
import { initialValues } from "../Pages/CreateMarket/createMarket.helper";
import { message } from "antd";

export const useCreateMarket = ({
  fromAboutMarket,
  isEditable,
  checkEditability,
}) => {
  // Scroll to top on component mount
  useScrollToTop();
  const navigate = useNavigate();
  const { coinList, coinUrl, eventDetails } = useContext(Context);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showCoins, setshowCoins] = useState([]);

  // Formik setup for form management
  const formik = useFormik({
    onSubmit,
    initialValues: creatMarket.initialValues(initialValues),
    validationSchema: creatMarket.validationSchema(),
  });

  const handlePublish = () => {
    togglePreview();
    formik.setSubmitting(false);
  };
  // Toggle preview modal
  const togglePreview = () => {
    setPreviewOpen(!previewOpen);
  };

  // Handle form submission
  async function onSubmit() {
    if (!fromAboutMarket) return handlePublish();

    const res = await checkEditability();
    if (!res) {
      handlePublish();
    } else {
      message.info("Someone has already placed a bet on the event.");
      formik.resetForm();
    }
  }

  // Toggle confirmation modal
  const toggleConfirm = () => {
    setConfirmOpen(!confirmOpen);
  };

  const handleCancel = () => {
    toggleConfirm();
    togglePreview();
    formik?.resetForm();
    navigate(Path.MARKETPLACE);
  };

  // Return formatted inner label
  const formatInnerLabel = (error, message) => {
    if (!error) return message;
    return `${message}s`;
  };

  useEffect(() => {
    if (!coinList.length) return;
    const alterCoins = coinList?.map((item) => ({
      label: (
        <div className="cardCustom marketplace">
          <span className="marketTd fix_width">
            <img src={item?.iconUrl} height={20} width={20} alt="coin" />
            {item?.symbol}
          </span>
        </div>
      ),
      value: item?.symbol,
    }));
    setshowCoins(alterCoins);
  }, [coinList]);

  useEffect(() => {
    if (fromAboutMarket && isEditable) {
      formik.setValues({
        coin: eventDetails?.coins ?? null,
        priceLevel: eventDetails?.priceLevel ?? null,
        targetDate: eventDetails?.targetDate ?? "",
        eventDurationDays: eventDetails?.eventDurationDays,
        eventDurationHours: eventDetails?.eventDurationHours ?? null,
        closureTime: eventDetails?.closureTime ?? "",
      });
    } else {
      formik.resetForm();
    }
  }, [isEditable]);

  return {
    eventDetails,
    formik,
    coinUrl,
    showCoins,
    handleCancel,
    previewOpen,
    confirmOpen,
    toggleConfirm,
    togglePreview,
    formatInnerLabel,
  };
};
