/**
 * CustomSearch Component
 *
 * A reusable search input component with customizable styles and layout.
 *
 * @param {object} props
 * @param {string} props.name - The name of the input field.
 * @param {function} props.handleOnChange - A callback function to handle changes to the input value.
 * @param {string} props.mainClassLayout - The main class for the layout of the component.
 * @param {string} props.InputCustomStyle - Custom styles for the input field.
 * @param {object} props.rest - Additional props to be passed to the Input component.
 *
 */
import React from "react";
import { Input } from "antd";
import "../InputCustom/InputCustom.scss";
import { SearchIcon } from "../../assets/StoreAsset/StoreAsset";

const CustomSearch = ({
  name,
  handleOnChange,
  mainClassLayout,
  InputCustomStyle,
  ...rest
}) => {
  return (
    <div className={`inputLayout ${mainClassLayout || ""}`}>
      <Input
        {...rest}
        name={name}
        allowClear={true}
        autoComplete="off"
        onChange={(e) => {
          handleOnChange(e.target.value);
        }}
        className={`input_custom inputSearch ${
          InputCustomStyle || ""
        } onlyBorder`}
      />
      <span className="searchImg">
        <SearchIcon />
      </span>
    </div>
  );
};

export default CustomSearch;
