/**
 * A customizable button component that extends the Ant Design Button component.
 *
 * @param {object} props - The component props.
 * @param {string} props.label - The button label.
 * @param {string} props.title - The button title.
 * @param {string} props.htmlType - The button type (e.g. "submit", "button").
 * @param {boolean} props.btnBorder - Whether to display a border around the button.
 * @param {ReactNode} props.leftIcon - The icon to display on the left side of the button.
 * @param {ReactNode} props.rightIcon - The icon to display on the right side of the button.
 * @param {string} props.customClass - A custom CSS class to apply to the button.
 * @param {object} props.rest - Additional props to pass to the Ant Design Button component.
 *
 */
import React from "react";
import { Button } from "antd";
import "./ButtonCustom.scss";

export const ButtonCustom = ({
  label,
  title,
  htmlType,
  btnBorder,
  leftIcon,
  rightIcon,
  customClass,
  ...rest
}) => {
  return (
    <Button
      className={`btnCustom ${btnBorder ? "btnBorder" : ""} ${
        customClass || ""
      }`}
      htmlType={htmlType || undefined}
      title={title || ""}
      {...rest}
    >
      {leftIcon ? <span className="leftIcon">{leftIcon}</span> : null}
      {label ? label : null}
      {rightIcon ? <span className="rightIcon">{rightIcon}</span> : null}
    </Button>
  );
};
