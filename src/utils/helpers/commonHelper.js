import dayjs from "dayjs";
import moment from "moment";
import { message } from "antd";
import BigNumber from "bignumber.js";
import UseGetApi from "../../api/makeRequest";
import { antdPopupCoppyConstant, dateFormat, env, msgs } from "../appConstants";
import { defaultTargetDate } from "../../Pages/CreateMarket/createMarket.helper";

/**
 * Handles image upload event.
 *
 * @param {object} e - The event object.
 * @returns {object} An object containing the uploaded image URL and any error messages.
 *
 */
export const handleImgUpload = (e) => {
  try {
    const file = e?.file || e;
    if (file) {
      const localURL = URL.createObjectURL(file?.originFileObj);
      if (!(file?.size / 1024 / 1024 > 5)) {
        return {
          error: false,
          data: localURL,
        };
      } else {
        return {
          error: true,
          msg: msgs.faultImg,
        };
      }
    } else return false;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Prevents the default behavior of an event.
 *
 * @param {object} event - The event object.
 *
 */
export const preventDefault = (event) => event.preventDefault();

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} value - The string to capitalize.
 * @returns {string} The capitalized string.
 *
 */
export const toCapitalize = (value) => {
  if (!value) return "";
  return value.replace(value.charAt(0), value.charAt(0).toUpperCase());
};

export const minDateTime = defaultTargetDate; //min date & time, 24 hours from today's date

export const maxDateTime = dayjs().add(365, "day"); //max date & time, 365 days from today's date

/**
 * Converts a timestamp to a Unix timestamp.
 *
 * @param {Date} time - The timestamp to convert.
 * @returns {number} The Unix timestamp.
 *
 */
export const getTimeStamp = (date) => {
  if (!date) return false;
  const expiryTime = moment(new Date(date)).unix();
  const hours = new Date(date).getHours();
  const seconds = new Date(date).getSeconds();
  const minutes = new Date(date).getMinutes() * 60;
  return expiryTime - (hours + seconds + minutes);
};

/**
 * Returns whether an object has any keys.
 *
 * @param {object} values - The object to check.
 * @returns {boolean} Whether the object has any keys.
 *
 */
export const ObjectKeyLength = (values) => {
  return (
    values &&
    typeof values === "object" &&
    !Array.isArray(values) &&
    Object.keys(values).length > 0
  );
};

/**
 * Disables the scroll on number input by blurring the active element.
 *
 */
export const disableScrollNumberInput = () => {
  document.activeElement.blur();
};

/**
 * Converts a timestamp to a Date object.
 *
 * If the input is a number, it is assumed to be a Unix timestamp (in seconds) and is converted to a Date object.
 * If the input is not a number, it is assumed to be a string representation of a date and is parsed into a Date object.
 *
 * @param {number|string} date - The timestamp or date string to convert.
 * @returns {Date} The converted Date object.
 *
 */
export const timeStampToDate = (date) => {
  const reg = new RegExp(/^\d+$/);
  if (reg.test(date)) return new Date(date * 1000);
  return new Date(date);
};
/**
 * Formats an event date according to the provided format.
 *
 * If the input date is null or undefined, returns an object with null values for formattedDate and formattedTime.
 *
 * @param {number|string} date - The timestamp or date string to format.
 * @param {string} format - The format string to use for formatting the date.
 * @returns {Object} An object with formattedDate and formattedTime properties.
 *
 */
export const eventDateFormat = (date, format) => {
  if (!date)
    return {
      formattedDate: null,
      formattedTime: null,
    };
  const formattedDate = moment(timeStampToDate(date)).format(format);
  const formattedTime = moment(timeStampToDate(date)).format("hh:mm A");

  return {
    formattedDate,
    formattedTime,
  };
};

/**
 * Formats a date object using the provided format string or the default date format (dateFormat?.five)
 * @param {Date} date - The date object to format
 * @param {string} format - The format string to use for formatting the date (optional)
 * @returns {string} The formatted date string
 *
 */
export const globalTimeFormat = (date, format) =>
  moment(date).format(format || dateFormat?.five);

/**
 * Copies the provided data to the clipboard and displays a success message
 * @param {string} dataToCopy - The data to copy to the clipboard
 *
 */
export const copyToClipBoard = (dataToCopy) =>
  navigator.clipboard.writeText(dataToCopy).then(() => {
    message.success({ content: msgs.copied, key: antdPopupCoppyConstant });
  });

/**
 * Transforms an array of objects into an object where the value of the specified key is used as the key for the new object
 * @param {Array<Object>} arrayOfObjects - The array of objects to transform
 * @param {string} key - The key to use as the key for the new object
 * @param {string} value - The value to use as the value for the new object
 *
 */
export const transformedObject = (arrayOfObjects, key, value) => {
  const transformedObject = arrayOfObjects.reduce((acc, obj) => {
    acc[obj[key]] = obj[value];
    return acc;
  }, {});
  return transformedObject;
};

/**
 * Returns the URL for the specified explorer based on the provided array and key/value pairs
 * @param {Object} params - An object containing the parameters for the URL
 * @param {string} params.baseUrl - The base URL for the explorer
 * @param {Array<Object>} params.arr - The array of objects to search for the specified key/value pair
 * @param {string} params.findKey - The key to search for in the array of objects
 * @param {string|number} params.findValue - The value to search for in the array of objects
 * @param {string} params.getKey - The key in the object to use as the value for the URL
 * @returns {string} The URL for the specified explorer
 *
 */
export const getExplorerURL = ({
  baseUrl,
  arr,
  findKey,
  getKey,
  findValue,
}) => {
  return baseUrl
    ? baseUrl +
        arr.find((item) => item[findKey] === findValue)?.[getKey]?.toLowerCase()
    : "";
};

/**
 * Chunks an array into smaller arrays of a specified size.
 *
 * @param {Array} array The array to chunk.
 * @param {number} chunkSize The size of each chunk.
 * @returns {Array<Array>} An array of chunked arrays.
 *
 */
export const chunkData = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

/**
 * Removes leading zeros from a numeric string, handling decimal points.
 *
 * @param {string} value The numeric string to convert.
 * @returns {string} The converted string without leading zeros.
 */
export const convertLeadingZeros = (value) => {
  if (value === "") return "";
  if (value.includes(".")) {
    let [integerPart, decimalPart] = value.split(".");
    integerPart = String(Number(integerPart));
    return integerPart === "0"
      ? `0.${decimalPart}`
      : `${integerPart}.${decimalPart}`;
  } else {
    return String(Number(value));
  }
};

/**
 * Formats a price value to a specified precision, removing trailing zeros.
 *
 * @param {number|string} number The price value to format.
 * @returns {string} The formatted price string.
 */
export const formatPrice = (number, precision = env?.precision) => {
  if (!number) return 0;
  const price = parseFloat(number)?.toFixed(precision);
  let stringWithoutTrailingZeroes = price.toString().replace(/\.?0+$/, "");
  return stringWithoutTrailingZeroes;
};

/**
 * Handles input events for a number field, ensuring the value conforms to a specific format.
 *
 * @param {Event} params.e - The input event.
 * @param {string} params.name - The name of the field.
 * @param {Object} params.formik - The formik instance.
 * @param {number} params.max - The maximum allowed value.
 * @param {number} params.decimal - The number of decimal places allowed.
 * @param {number} params.maxLength - The maximum length of the input value.
 *
 */
export const handleNumberField = ({
  e,
  name,
  formik,
  max,
  decimal,
  maxLength,
}) => {
  const convertedValue = convertLeadingZeros(e.target.value);
  const priceRegex = new RegExp(
    `^$|^(([1-9]?\\d{0,${maxLength}}|${max})(\\.\\d{0,${decimal}})?|([0]\\.\\d{1,${decimal}}))$`
  );

  if (priceRegex.test(convertedValue) || !convertedValue) {
    formik.setFieldValue(name, convertedValue);
  } else {
    e.preventDefault();
  }
};

/**
 * Formats a number by dividing it by 10^18.
 *
 * @param {number} value - The number to format.
 * @returns {number} The formatted number.
 *
 */
export const formatNumber = (value) => {
  if (!value) return 0;
  return value / Math.pow(10, 18);
};

/**
 * Formats a given balance by dividing it by 10^18 and rounding to a specified precision.
 *
 * @param {string} balance - The balance to be formatted.
 * @returns {string} The formatted balance.
 *
 */
export const formattedBalance = async (balance) => {
  if (!balance) return 0;
  const number = new BigNumber(balance);
  const divisor = new BigNumber(Math.pow(10, 18).toString());

  const quotient = number / divisor;
  const quotientNumber = Number(quotient)?.toFixed(env?.precision);

  return quotientNumber;
};

/**
 * Creates a dropdown menu object with a single item.
 *
 * @param {string} menu - The label for the dropdown menu item.
 * @returns {object} The dropdown menu object.
 */
export const getDropDownMenu = (menu) => {
  return {
    items: [
      {
        key: "1",
        label: menu,
      },
    ],
  };
};

/**
 * Fetches data from IPFS using the provided URL.
 *
 * @param {string} url - The IPFS URL to fetch data from.
 * @returns {object} - An object containing the fetched data, or a default object with `name` and `price` set to `null` if no data is available.
 */
export const getIpfs = async (url) => {
  try {
    const response = await UseGetApi(url, null, null, null, true);
    if (response?.data) return response?.data;
    return {
      name: null,
      price: null,
    };
  } catch (error) {
    console.error(error);
  }
};

/**
 * Formats a target time as a human-readable string, indicating the time elapsed since the target time.
 *
 * @param {moment} targetTime - The target time to format.
 * @returns {string} - A human-readable string indicating the time elapsed since the target time.
 *
 */
export const showTime = (targetTime) => {
  if (!targetTime) return "-";
  const now = moment();
  const secs = moment.duration(now.diff(targetTime)).asSeconds();
  const mins = moment.duration(now.diff(targetTime)).asMinutes();
  const hours = moment.duration(now.diff(targetTime)).asHours();
  const days = moment.duration(now.diff(targetTime)).asDays();

  if (secs < 60) {
    return `${Math.floor(secs)}s ago`;
  } else if (secs > 60) {
    if (mins > 60) {
      if (hours > 24) {
        return `${formatDuration(Math.floor(days), " day", false)} ago`;
      } else return `${formatDuration(Math.floor(hours), " hr", false)} ago`;
    } else return `${formatDuration(Math.floor(mins), " min", false)} ago`;
  }
};

export const decideColor = (condition) => {
  switch (condition) {
    case "negative":
      return { class: "red downArrow", color: "#ff3932", direction: "down" };
    case "positive":
      return { class: "green", color: "#2CCC78", direction: "top" };
    default:
      break;
  }
};

export const trimAddressLength = (address = "", startLen = 7, endLen = 7) => {
  if (!address) return "-";
  return `${address.substring(0, startLen)}...${address.substring(
    address.length - endLen,
    address.length
  )}`;
};

export const eventIdURL = (url) => {
  return env?.ipfsBackend + "/ipfs/" + url;
};

export const divideByHundred = (value) => {
  if (!value) return 0;
  return Number(value) / 100;
};

export const arrayBufferToBase64 = (buffer) => {
  try {
    const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    const decodedString = atob(base64String);
    return decodedString;
  } catch (error) {
    console.error(error);
  }
};

export const constructQueryString = (params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value || value === 0) {
      query.append(key, value);
    }
  });
  return `?${query.toString()}`;
};

export const toLocaleString = (numInString, precision) =>
  Number(numInString || 0)
    .toFixed(precision)
    ?.toLocaleString();

export const truncateText = (fullText) => {
  if (!fullText) return "-";
  const textLength = fullText.toString().length;
  const startText = fullText.slice(0, 3);
  const endText = fullText.slice(-4);

  if (textLength > 8) {
    return `${startText}.....${endText}`;
  } else {
    return fullText;
  }
};

export const goToExplorer = (id) => {
  return window.open(`${env?.txnExplorerUrl}/tx/${id}`, "_blank");
};

export const formatDuration = (value, unit, anyspace = true) =>
  anyspace
    ? `${value || 0} ${value > 1 ? `${unit}s` : unit}`
    : `${value || 0}${value > 1 ? `${unit}s` : unit}`;
