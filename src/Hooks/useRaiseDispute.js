/**
 * Custom hook for raising a dispute.
 *
 * This hook provides functionality for raising a dispute, including handling form submission,
 * uploading evidence, and displaying event lists.
 *
 * @returns {object} An object containing various properties and functions for raising a dispute.
 *
 *
 */
import moment from "moment";
import { message } from "antd";
import { useFormik } from "formik";
import { create } from "ipfs-http-client";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { apiUrls } from "../api/apiUrls";
import UseGetApi from "../api/makeRequest";
import { env } from "../utils/appConstants";
import {
  eventIdURL,
  formatNumber,
  getIpfs,
  globalTimeFormat,
  formatPrice,
  timeStampToDate,
} from "../utils/helpers/commonHelper";
import ProfileImg from "../assets/BlueLogo.svg";
import Path from "../Routing/Constant/RoutePaths";
import { raiseDisput } from "../utils/validationSchema";
import { Context } from "../Pages/ContextProvider/ContextProvider";

const useRaiseDispute = () => {
  const { coinUrl } = useContext(Context);
  const navigate = useNavigate();

  const [eventList, setEventList] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [firstEvidence, setFirstEvidence] = useState({
    value: [],
    ipfs: [],
    loading: false,
  });
  const [secondEvidence, setSecondEvidence] = useState({
    value: [],
    ipfs: [],
    loading: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Raises a dispute by submitting the form data to the API.
   *
   * @async
   */
  const raiseDispute = async () => {
    try {
      setIsLoading(true);
      const payload = {
        eventId: formik?.values?.event,
        category: formik?.values?.category,
        email: formik?.values?.email,
        description: formik?.values?.description,
        evidence: formik?.values?.img,
      };
      const response = await UseGetApi(
        apiUrls?.raiseDispute(),
        "post",
        payload
      );
      if (response?.data) {
        setSuccessModal(!successModal);
        navigate(Path?.PROFILE, {
          state: { key: "5" },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles form submission.
   */
  const onSubmit = () => {
    setConfirmModal(true);
  };

  /**
   * Gets the IPFS URL for a given file.
   *
   * @param {object} info - The file information.
   * @returns {string} The IPFS URL.
   * @async
   *
   */
  const getIpfsUrl = async (info) => {
    try {
      const fileData = info?.originFileObj;
      const client = create({ url: env?.ipfs });
      const result = await client.add(fileData);
      const url = `${env?.ipfsBackend}/ipfs/${result.path}`;
      return url;
    } catch (error) {
      console.error(error.message);
    }
  };

  /**
   * Handles changes to the evidence input.
   *
   * @param {object} info - The file information.
   * @param {function} setEvidence - The function to set the evidence state.
   * @param {array} prevIpfs - The previous IPFS URLs.
   * @async
   */
  const handleEvidenceChange = async (info, setEvidence, prevIpfs) => {
    try {
      if (!navigator.onLine) {
        message.info("Please connect to the internet.");
        return false;
      }
      setEvidence({ value: info?.fileList, loading: true });
      const res = await getIpfsUrl(info?.file);
      if (res) {
        setEvidence((prev) => ({ ...prev, ipfs: [res], loading: false }));
        formik.setFieldValue("img", prevIpfs.concat([res]));
      } else {
        setEvidence({ value: [], loading: false });
        message.error({ content: "Can't upload img to server", key: "error" });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  /**
   * Handles removal of evidence.
   *
   * @param {function} setEvidence - The function to set the evidence state.
   * @param {array} values - The remaining IPFS URLs.
   */
  const handleEvidenceRemove = (setEvidence, values) => {
    setEvidence((prev) => ({ ...prev, ipfs: [] }));
    formik.setFieldValue("img", values);
  };

  /**
   * Properties for the first evidence input.
   */
  const evidenceOneProp = {
    name: "file",
    multiple: true,
    async onChange(info) {
      await handleEvidenceChange(info, setFirstEvidence, secondEvidence.ipfs);
    },
    onRemove() {
      handleEvidenceRemove(setFirstEvidence, secondEvidence.ipfs);
    },
  };

  /**
   * Properties for the second evidence input.
   */
  const evidenceTwoProp = {
    name: "file",
    multiple: true,
    async onChange(info) {
      await handleEvidenceChange(info, setSecondEvidence, firstEvidence.ipfs);
    },
    onRemove() {
      handleEvidenceRemove(setSecondEvidence, firstEvidence.ipfs);
    },
  };

  /**
   * Handles the selection of an event from the event list.
   * Updates the `eventDetails` field in the formik state with the selected event's details.
   *
   * @param {string} value - The ID of the selected event.
   */
  const handleSelect = async (value) => {
    formik.setFieldValue(
      "eventDetails",
      eventList?.filter((item) => item?.others?.["eventId"] === value)
    );
  };

  /**
   * Initializes the formik state with the initial values and validation schema.
   */
  const formik = useFormik({
    onSubmit,
    initialValues: raiseDisput?.initialValues(),
    validationSchema: raiseDisput?.validationSchema,
  });

  /**
   * Fetches the list of events from the API and processes the response.
   * Updates the `eventList` state with the processed event list.
   */
  const getEventLists = async () => {
    const response = await UseGetApi(apiUrls?.disputeEvents());
    if (response?.data) {
      const temp = [];
      response?.data?.data?.map(async (item) => {
        const res = await getIpfs(eventIdURL(item?.eventId));

        const timeAndDate = globalTimeFormat(
          item?.targetDateTime
            ? moment(timeStampToDate(item?.targetDateTime))
            : item?.createdAt
        );

        const url = Object.keys(coinUrl).length ? coinUrl?.[res?.name] : "";

        const name = (
          <div className="cardCustom marketplace">
            <span className="marketTd fix_width">
              <img src={url ?? ProfileImg} alt="coin-url" />
              {res?.name || "-"} to be priced at {formatPrice(res?.price)} USDT
              or more as on {timeAndDate}?
            </span>
          </div>
        );

        temp.push({
          label: name,
          value: item?.eventId,
          others: {
            eventId: item?.eventId,
            name,
            raised: item?.createdAt || "-",
            settled: item?.eventExpireTime || "-",
            settlement: item?.settlement || "-",
            betAmount: Number(formatNumber(item?.ordersDetails?.[0]?.amount)).toFixed(env?.precision),
            settledAmount: Number(formatNumber(item?.ordersDetails?.[0]?.amount)).toFixed(env?.precision),
            betDate: item?.ordersDetails?.[0]?.updatedAt,
          },
        });
        setEventList(temp);
      });
    }
  };

  /**
   * Updates the `charachterCount` field in the formik state whenever the `description` field changes.
   */
  useEffect(() => {
    formik.setFieldValue("charachterCount", formik.values.description.length);
  }, [formik.values.description]);

  /**
   * Fetches the event list when the `coinUrl` object is populated.
   */
  useEffect(() => {
    if (Object.keys(coinUrl).length) getEventLists();
  }, [coinUrl]);

  return {
    isLoading,
    eventList,
    secondEvidence,
    firstEvidence,
    raiseDispute,
    formik,
    evidenceOneProp,
    evidenceTwoProp,
    confirmModal,
    setSuccessModal,
    setConfirmModal,
    successModal,
    handleSelect,
  };
};

export default useRaiseDispute;
