import React from "react";
import dayjs from "dayjs";
import moment from "moment";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { dateFormat, msgs } from "../../utils/appConstants";
import {
  formatDuration,
} from "../../utils/helpers/commonHelper";
dayjs.extend(customParseFormat);

export const anyMinutes = (anydate) => {
  if (anydate && !(anydate instanceof Date)) return false;
  const date = anydate ?? new Date()  ;
  const anyMinutes = date.getMinutes() != 0;
  return anyMinutes;
};

export const modifyDate = (date, value, operation) => {
  switch (operation) {
    case "addHours":
      return dayjs(dayjs(date).add(value, "hour")).add(
        anyMinutes(date) ? 1 : 0,
        "hour"
      );
    case "minusHours":
      return dayjs(date).subtract(value, "hour");
    case "addDays":
      return dayjs(date).add(value, "days");
    default:
      return dayjs();
  }
};

export const defaultTargetDate = modifyDate(new Date(), 24, "addHours");

export const defaultClosureDate = modifyDate(
  defaultTargetDate,
  12,
  "minusHours"
);
export const maxDateTime = dayjs().add(365, "day"); //max date & time, 365 days from today's date

export const minDateTime = defaultTargetDate; //min date & time, 48 hours from today's date

export const getDaysAndHours = (targetDate) => {
  const startTime = new Date();
  const endTime = dayjs(targetDate);
  let gapInDays = 0;
  let gapInHours = 0;

  if (endTime?.isAfter(startTime)) {
    const duration = moment.duration(endTime.diff(startTime));
    gapInDays = Math.floor(duration.asDays());
    gapInHours = Math.floor(duration.asHours() % 24);
  }
  return {
    gapInDays,
    gapInHours,
  };
};

export const initialValues = {
  eventDurationDays: 2,
  eventDurationHours: 0,
  targetDate: defaultTargetDate,
  closureTime: defaultClosureDate,
};

export const handleNull = (formik) => {
  formik.setFieldValue("eventDurationDays", 0);
  formik.setFieldValue("eventDurationHours", 0);
  formik.setFieldValue("closureTime", "");
};

export const handleTargetDateChange = (targetDate, formik) => {
  if (targetDate) {
    const { gapInDays, gapInHours } = getDaysAndHours(targetDate);
    const hoursToMinusForBetting = gapInDays >= 2 ? 24 : 12;
    const closureTime = modifyDate(
      targetDate,
      hoursToMinusForBetting,
      "minusHours"
    );
    if (formik) {
      formik.setFieldValue("eventDurationDays", gapInDays);
      formik.setFieldValue("eventDurationHours", gapInHours);
      formik.setFieldValue("closureTime", closureTime);
    } else {
      return {
        closureTime: closureTime,
        eventDurationDays: gapInDays,
        eventDurationHours: gapInHours,
      };
    }
  } else {
    handleNull(formik);
  }
};

export const disabledDatePickerDate = (current) => {
  return (
    current &&
    (current < minDateTime.startOf("day") || current > maxDateTime.endOf("day"))
  );
};

export const disabledDatePickerTime = (current) => {
  if (!current) {
    return {};
  }
  const isSameMinDay = current.isSame(minDateTime, "day");
  const isSameMaxDay = current.isSame(maxDateTime, "day");

  const disabledHours = () => {
    if (isSameMinDay) {
      return Array.from({ length: 24 }, (_, i) => i).filter(
        (hour) => hour < minDateTime.hour()
      );
    }
    if (isSameMaxDay) {
      return Array.from({ length: 24 }, (_, i) => i).filter(
        (hour) => hour > maxDateTime.hour()
      );
    }
    return [];
  };
  return {
    disabledHours,
  };
};

export const previewPublishModalData = (props) => {
  const {
    coin,
    coinUrl,
    priceLevel,
    targetDate,
    closureTime,
    eventDurationDays,
    eventDurationHours,
  } = props;

  return [
    {
      label: msgs.bettingCrypto,
      desc: (
        <>
          <img
            src={coinUrl?.[coin]}
            alt={coin}
            className="coin-icons marginright"
          />
          {coin}
        </>
      ),
    },
    {
      label: msgs.priceLevel,
      desc: (
        <>
          {priceLevel || 0} {msgs.usdt}
        </>
      ),
    },
    {
      label: msgs.targetDateTime,
      desc: dayjs(targetDate).format(dateFormat?.calendar),
    },
    {
      label: msgs.eventDuration,
      desc: (
        <>
          {" "}
          {`${formatDuration(eventDurationDays, "Day")} | ${formatDuration(
            eventDurationHours,
            "Hour"
          )}`}
        </>
      ),
    },
    {
      label: msgs.bettingClosureTime,
      desc: dayjs(closureTime).format(dateFormat?.calendar),
    },
  ];
};
