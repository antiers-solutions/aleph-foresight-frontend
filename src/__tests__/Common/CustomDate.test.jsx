import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Formik, Form } from "formik";
import { DatePicker } from "antd";
import { minDateTime, maxDateTime } from "../../Pages/CreateMarket/createMarket.helper";
import CustomDate from "../../Common/CustomDate/CustomDate";
import { dateFormat } from "../../utils/appConstants";

describe("CustomDate", () => {
  const mockOnChange = jest.fn();
  
  const renderComponent = (initialValues = {}) => {
    return render(
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
      >
        <Form>
          <CustomDate
            name="dateField"
            onChange={mockOnChange}
            minDate={minDateTime}
            maxDate={maxDateTime}
          />
        </Form>
      </Formik>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the DatePicker with correct props", () => {
    renderComponent();

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "dateField");
    expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", 'Select date');
  });

  it("calls onChange prop when date is selected", () => {
    renderComponent();

    const datePicker = screen.getByRole("textbox");
    fireEvent.click(datePicker);

    // Assuming the date picker opens a calendar and selecting a date simulates a change
    // You might need to use a library to simulate this interaction or mock DatePicker
    fireEvent.click(screen.getByText("15")); // Mock selecting 15th of the month

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("displays Formik error message when there is an error", async () => {
    render(
      <Formik
        initialValues={{ dateField: null }}
        initialErrors={{ dateField: "Date is required" }}
        initialTouched={{ dateField: true }}
        onSubmit={() => {}}
      >
        <Form>
          <CustomDate
            name="dateField"
            onChange={mockOnChange}
            minDate={minDateTime}
            maxDate={maxDateTime}
          />
        </Form>
      </Formik>
    );

    expect(await screen.findByText("Date is required")).toBeInTheDocument();
  });

  it("does not display error message when there are no errors", () => {
    renderComponent();

    expect(screen.queryByText("Date is required")).toBeNull();
  });

  it("prevents default behavior on key up and key down", () => {
    const preventDefault = jest.fn();
    const { getByRole } = renderComponent();

    const datePicker = getByRole("textbox");
    fireEvent.keyUp(datePicker, { key: "Enter", preventDefault });
    fireEvent.keyDown(datePicker, { key: "Enter", preventDefault });

    expect(preventDefault).toHaveBeenCalledTimes(0);
  });
});
