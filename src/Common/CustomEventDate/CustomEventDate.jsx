/**
 * CustomEventDate Component
 *
 * Formats and displays event date and time according to the provided format.
 *
 *
 * @param {Date} props.date - The date to be formatted
 * @param {String} props.dateFormat - The format of the date
 * @returns {JSX.Element} - The formatted date and time
 *
 *
 */
import React from "react";
import { eventDateFormat } from "../../utils/helpers/commonHelper";

const CustomEventDate = ({ date, dateFormat }) => {
  const { formattedDate, formattedTime } = eventDateFormat(date, dateFormat);
  return (
    <>
      {formattedDate || "-"}
      &nbsp;| &nbsp;
      <span>{formattedTime || "-"}</span>
    </>
  );
};

export default CustomEventDate;
