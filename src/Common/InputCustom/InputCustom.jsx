/**
 * A custom input component that wraps Ant Design's Input component with additional features.
 *
 * @param {object} props
 * @param {string} [props.innertxt] - Inner text to display inside the input field.
 * @param {string} [props.innerTxtImg] - Inner text image to display inside the input field.
 * @param {string} [props.innerImg] - Inner image to display inside the input field.
 * @param {string} [props.label] - Label text to display above the input field.
 * @param {string} [props.labelcustom] - Custom class for the label element.
 * @param {string} [props.InputCustomStyle] - Custom class for the input element.
 * @param {string} [props.name] - Name of the input field.
 * @param {number} [props.max] - Maximum value for the input field (only applicable for number type).
 * @param {string} [props.type] - Type of the input field (e.g. "text", "number", etc.).
 * @param {boolean} [props.onlyBorder] - Whether to render only the border of the input field.
 * @param {string} [props.mainClassLayout] - Custom class for the main layout element.
 * @param {boolean} [props.inputInnerTxt] - Whether to render inner text inside the input field.
 * @param {boolean} [props.decimal] - Whether to allow decimal values for the input field (only applicable for number type).
 * @param {number} [props.maxLength] - Maximum length of the input field.
 * @param {object} [props.formik] - Formik instance.
 * @param {object} [props.rest] - Additional props to pass to the Input component.
 *
 */
import React from "react";
import { Input } from "antd";
import { Field } from "formik";
import "./InputCustom.scss";
import {
  disableScrollNumberInput,
  handleNumberField,
  preventDefault,
} from "../../utils/helpers/commonHelper";
import FormikError from "../FormikError/FormikError"; 

const InputCustom = ({
  innertxt,
  innerTxtImg,
  innerImg,
  label,
  labelcustom,
  InputCustomStyle,
  name,
  max,
  type,
  onlyBorder,
  mainClassLayout,
  inputInnerTxt,
  decimal,
  maxLength,
  formik,
  disabled,
  ...rest
}) => {

  return (
    <Field name={name}>
      {({ field, form: { touched, errors, values, handleChange } }) => {
        return (
          <div
            className={`inputLayout ${mainClassLayout} ${
              disabled ? "input-diabled" : ""
            }`}
          >
            <>
              {label ? (
                <>
                  <label className={`label ${labelcustom}`}>{label}</label>
                </>
              ) : null}
              <Input
                {...rest}
                {...field}
                id={name}
                type={type}
                maxLength={max}
                disabled={disabled}
                value={values[name]}
                autoComplete="off"
                className={`input_custom ${InputCustomStyle} 
                    ${inputInnerTxt ? "inputInnerTxt" : ""}
                    ${onlyBorder ? "onlyBorder" : ""}
                  `}
                onChange={(e) => {
                  if (type === "number")
                    handleNumberField({
                      e,
                      max,
                      decimal,
                      maxLength,
                      formik,
                      name,
                    });
                  else {
                    handleChange(e);
                  }
                }}
                onPaste={(e) => type === "number" && preventDefault(e)}
                onWheel={
                  type === "number" ? disableScrollNumberInput : () => {}
                }
              />
            </>

            {touched[name] && errors[name] ? (
              <FormikError>{errors[name]}</FormikError>
            ) : null}

            {innertxt ? <span className="innerTxt">{innertxt}</span> : null}

            {innerTxtImg ? (
              <span className="innerTxtImg">
                {innerTxtImg}
                {innerImg}{" "}
              </span>
            ) : null}
          </div>
        );
      }}
    </Field>
  );
};

export default InputCustom;
