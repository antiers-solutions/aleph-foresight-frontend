/**
 * CustomTextBox is a reusable React component that wraps Ant Design's TextArea component with Formik's Field component.
 * It provides a text area input field with error handling and character count display.
 *
 * @param {object} props
 * @param {number} props.max - The maximum number of characters allowed in the text area.
 * @param {string} props.name - The name of the field in the Formik form.
 * @param {object} props.rest - Additional props to pass to the TextArea component.
 *
 */
import React from "react";
import { Input } from "antd";
import { Field } from "formik";
import FormikError from "../FormikError/FormikError";

const CustomTextBox = ({ max, name, ...rest }) => {
  const { TextArea } = Input;

  return (
    <Field name={name}>
      {({ field, form: { touched, values, errors, handleChange } }) => {
        return (
          <>
            <TextArea
              {...rest}
              {...field}
              rows={5}
              id={name}
              maxLength={max}
              onChange={handleChange}
            />
            {touched[name] && errors[name] ? (
              <FormikError>{errors[name]}</FormikError>
            ) : null}
            <div className="count">{`${
              values?.charachterCount || 0
            }  / 300`}</div>
          </>
        );
      }}
    </Field>
  );
};

export default CustomTextBox;
