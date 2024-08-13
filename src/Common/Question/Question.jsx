/**
 * Question Component
 *
 * This component displays a question related to a market event.
 * It fetches the event data and displays the question with the
 * corresponding coin image, price, and time.
 *
 *
 * @param {Function} props.promise - A function that returns a promise
 *                                   that resolves with the event data.
 * .record - An object containing the event record.
 *
 *
 */
import React from "react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import {
  eventIdURL,
  globalTimeFormat,
  timeStampToDate,
} from "../../utils/helpers/commonHelper";
import { msgs } from "../../utils/appConstants";
import ProfileImg from "../../assets/BlueLogo.svg";
import { Context } from "../../Pages/ContextProvider/ContextProvider";

const Question = ({ promise, record }) => {
  const { coinUrl } = useContext(Context);

  const [details, setDetails] = useState({
    name: "",
    price: "",
  });

  /**
   * Time and Date
   *
   * Format the time and date according to the global time format.
   */
  const timeAndDate = globalTimeFormat(
    record?.targetDateTime
      ? moment(timeStampToDate(record?.targetDateTime))
      : record?.createdAt
  );
  /**
   * Coin URL
   *
   * Get the coin URL from the context API or use the default image.
   */
  const url = Object.keys(coinUrl).length
    ? coinUrl?.[details?.name || record?.currencyType]
    : ProfileImg;

  /**
   * Get Data
   *
   * Fetch the event data using the promise function.
   */
  const getData = async () => {
    const { eventId, ipfsData, priceLevel, currencyType } = record || {};

    if (eventId && !ipfsData && !priceLevel) {
      const res = await promise(eventIdURL(eventId));
      if (res?.name) setDetails(res);
    } else if (priceLevel) {
      setDetails({ name: currencyType, price: priceLevel });
    } else {
      setDetails(ipfsData);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="cardCustom marketplace">
      <span className="marketTd fix_width">
        <img src={url} alt="coin" />
        {details?.name || "-"} {msgs.toBePriceAt} {details?.price || 0}{" "}
        {msgs.usdtOrMore} {timeAndDate}?
      </span>
    </div>
  );
};

export default Question;
