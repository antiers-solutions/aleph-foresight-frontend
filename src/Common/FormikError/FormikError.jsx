/**
 * A simple error component for displaying form validation errors.
 *
 * @param {React.ReactNode} children - The error message to be displayed.
 *
 */
import React from "react";

const FormikError = ({ children }) => {
  return <div className="error">{children}</div>;
};

export default FormikError;
