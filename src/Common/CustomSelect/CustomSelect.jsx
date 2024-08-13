/**
 * CustomSelect component: A wrapper around Ant Design's Select component, integrated with Formik.
 *
 * @param {string} name - The name of the field.
 * @param {string} value - The default value of the select.
 * @param {function} handleSelect - A callback function called when an option is selected.
 * @param {object} rest - Additional props passed to the Select component.
 *
 */
import React from "react";
import { Select } from "antd";
import { Field } from "formik";
import FormikError from "../FormikError/FormikError";

const CustomSelect = ({ name, value, handleSelect, ...rest }) => {
  
  return (
    <Field name={name}>
      {({ field, form: { touched, errors, setFieldValue } }) => {
        return (
          <>
            <Select
              {...field}
              {...rest}
              id={name}
              defaultValue={value}
              onChange={(value) => {
                setFieldValue(name, value);
              }}
              onSelect={handleSelect}
            />
            {touched[name] && errors[name] ? (
              <FormikError>{errors[name]}</FormikError>
            ) : null}
          </>
        );
      }}
    </Field>
  );
};

export default CustomSelect;
