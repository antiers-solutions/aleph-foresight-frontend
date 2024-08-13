/**
 * CopyText component allows users to copy a given text to their clipboard.
 *
 * @param {string} text - The text to be copied.
 *
 *
 */
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useState } from "react";
import { copyToClipBoard } from "../../../utils/helpers/commonHelper";

export default function CopyText({ text }) {
  const [copied, setCopied] = useState(false);

  /**
   * Handles the click event on the copy icon.
   * Copies the text to the clipboard and updates the state.
   */
  const handleCopyClick = () => {
    copyToClipBoard(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };

  return (
    <>
      <Tooltip
        title={copied ? " Copied" : "Copy Address"}
        onClick={handleCopyClick}
        className="copyIcon"
      >
        {copied ? <CheckOutlined /> : <CopyOutlined />}
      </Tooltip>
    </>
  );
}
