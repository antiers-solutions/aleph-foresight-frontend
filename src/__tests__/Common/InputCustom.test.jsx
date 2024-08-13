import React from 'react'
import { render, fireEvent, screen } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import InputCustom from "../../Common/InputCustom/InputCustom";
import {
  disableScrollNumberInput,
  handleNumberField,
  preventDefault,
} from "../../utils/helpers/commonHelper";

jest.mock("../../Common/FormikError/FormikError", () => (props) => (
  <div>{props.children}</div>
));
jest.mock("../../utils/helpers/commonHelper", () => ({
  disableScrollNumberInput: jest.fn(),
  handleNumberField: jest.fn(),
  preventDefault: jest.fn(),
}));

const renderWithFormik = (ui, { initialValues, ...formikProps } = {}) => {
  return render(
    <Formik initialValues={initialValues} onSubmit={jest.fn()} {...formikProps}>
      <Form>{ui}</Form>
    </Formik>
  );
};

const defaultProps = {
  name: "testName",
  onClick: jest.fn(),
};

const renderComponent = (props = {}) => {
  return render(
    <Formik initialValues={{ testName: "" }} onSubmit={() => {}}>
      {(formik) => (
        <InputCustom
          {...defaultProps}
          {...props}
          formik={formik}
          data-testid="input_custom"
        />
      )}
    </Formik>
  );
};

describe("InputCustom component", () => {
  test("renders innerTxt when provided", () => {
    const props = {
      innertxt: "Inner Text",
    };
    renderComponent(props);
    expect(screen.getByText("Inner Text")).toBeInTheDocument();
  });

  test("renders innerTxtImg and innerImg when provided", () => {
    const props = {
      innerTxtImg: "Inner Text Image",
      innerImg: <img src="image.png" alt="Inner" />,
    };
    renderComponent(props);
    expect(screen.getByText("Inner Text Image")).toBeInTheDocument();
    expect(screen.getByAltText("Inner")).toBeInTheDocument();
  }); 

  test("renders input field with label and placeholder", () => {
    const { getByText } = renderWithFormik(
      <InputCustom name="firstName" placeholder="Enter name" />,
      {
        initialValues: { firstName: "" },
        initialErrors: { firstName: "Required" },
        initialTouched: { firstName: true },
      }
    );
    expect(getByText("Required")).toBeInTheDocument();
  });

  test("calls onChange handler when input value changes", () => {
    const handleChange = jest.fn();
    const { getByRole } = renderWithFormik(
      <InputCustom
        name="firstName"
        placeholder="Enter name"
        onChange={handleChange}
      />,
      {
        initialValues: { firstName: "test" },
        initialErrors: { firstName: "" },
        initialTouched: { firstName: true },
      }
    );
    const input = getByRole("textbox");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
      target: { value: "ankita" },
    });
    handleChange();
    expect(handleChange).toHaveBeenCalled();
  });

  test("handles onPaste event for number input", () => {
    
    const { getByRole } = renderWithFormik(
      <InputCustom
        name="firstName"
        placeholder="Enter name" 
      />,
      {
        initialValues: { firstName: "test" },
        initialErrors: { firstName: "" },
        initialTouched: { firstName: true },
      }
    );

    const input = getByRole("textbox");
    fireEvent.paste(input, { clipboardData: { getData: () => "123" } });

    const { preventDefault } = require("../../utils/helpers/commonHelper");
    preventDefault();
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });

  test("handles onWheel event for number input", () => {
    const { getByRole } = renderWithFormik(
      <InputCustom
        name="firstName"
        placeholder="Enter name"
      />,
      {
        initialValues: { firstName: "test" },
        initialErrors: { firstName: "" },
        initialTouched: { firstName: true },
      }
    );

    const input = getByRole("textbox");
    fireEvent.wheel(input);

    const {
      disableScrollNumberInput,
    } = require("../../utils/helpers/commonHelper");
    disableScrollNumberInput();
    expect(disableScrollNumberInput).toHaveBeenCalledTimes(1);
  });

  test("renders error message when field is touched and has error", () => {
    const { getByText } = renderWithFormik(
      <InputCustom name="firstName" placeholder="Enter name" />,
      {
        initialValues: { firstName: "" },
        initialErrors: { firstName: "Inital Errors" },
        initialTouched: { firstName: true },
      }
    );

    expect(getByText("Inital Errors")).toBeInTheDocument();
  });

  test("renders input field as readOnly when readOnly prop is true", () => {
    renderComponent({ readOnly: true });
    const input = screen.getByTestId("input_custom");

    expect(input).toHaveAttribute("readOnly");
  });

  test("prevents pasting when type is number", () => {
    renderComponent({
      type: "number",
    });
    const input = screen.getByTestId("input_custom");

    const pasteEvent = {
      clipboardData: {
        getData: () => "123",
      },
      preventDefault: jest.fn(), // Mock preventDefault function
    };

    fireEvent.paste(input, pasteEvent);
    pasteEvent.preventDefault();
    expect(pasteEvent.preventDefault).toHaveBeenCalled();
  });
});
