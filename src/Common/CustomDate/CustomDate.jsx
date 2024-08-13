/**
 * CustomDate component for Formik forms.
 *
 * This component wraps the Ant Design DatePicker component and integrates it with Formik.
 * It provides a date picker with a custom format, min and max dates, and disabled dates and times.
 *
 * @param {string} name - The name of the field in the Formik form.
 * @param {function} onChange - A callback function that will be called when the date changes.
 * @param {object} rest - Additional props that will be passed to the DatePicker component.
 *
 */
import React from "react";
import { Field } from "formik";
import { DatePicker } from "antd";
import FormikError from "../FormikError/FormikError";
import { dateFormat } from "../../utils/appConstants";
import {
  maxDateTime,
  minDateTime,
  disabledDatePickerDate,
  disabledDatePickerTime,
} from "../../Pages/CreateMarket/createMarket.helper";
import { preventDefault } from "../../utils/helpers/commonHelper";

const CustomDate = ({ name, onChange, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form: { touched, errors, setFieldValue, values } }) => {
        return (
          <>
            <DatePicker
              {...rest}
              {...field}
              id={name}
              showHour={true}
              showNow={false}
              showMinute={false}
              showSecond={false}
              value={values[name]}
              minDate={minDateTime}
              maxDate={maxDateTime}
              format={dateFormat?.calendar}
              disabledTime={disabledDatePickerTime}
              disabledDate={disabledDatePickerDate}
              onChange={(date) => {
                setFieldValue(name, date);
                onChange(date);
              }}
              onKeyUp={(e) => preventDefault(e)}
              onKeyDown={(e) => preventDefault(e)}
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
export default CustomDate;
