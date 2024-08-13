import { Tooltip } from "antd";
import { truncateText } from "../../utils/helpers/commonHelper";

/**
 * Renders a username with a tooltip for the full name.
 * @param {string} val - The username to display.
 * @returns {JSX.Element} - A span element with tooltip for the username.
 */
export const showUserName = (val) => {
  return (
    <Tooltip title={val} placement="top">
      <span className="concise-text">{truncateText(val)}</span>
    </Tooltip>
  );
};

/**
 * Maps a value to a corresponding CSS class name for styling purposes.
 * @param {string} value - The value to determine the class name for.
 * @returns {string} - A CSS class name based on the input value.
 */
export const getClassName = (value) => {
  switch (value.toLowerCase()) {
    case "true":
    case "yes":
    case "claimed":
      return "green";
    case "false":
    case "no":
      return "red";
    case "withdraw":
      return "withdraw";
    default:
      return "grey";
  }
};
