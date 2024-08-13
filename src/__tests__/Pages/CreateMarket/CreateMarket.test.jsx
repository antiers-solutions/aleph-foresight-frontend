import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { useLocation } from "react-router-dom";
import { msgs } from "../../../utils/appConstants";
import { useCreateMarket } from "../../../Hooks/useCreateMarket";
import CreateMarket from "../../../Pages/CreateMarket/CreateMarket";
import {
  defaultTargetDate,
  defaultClosureDate,
  handleTargetDateChange,
} from "../../../Pages/CreateMarket/createMarket.helper";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
}));
// Mock dependencies
jest.mock("../../../Hooks/useCreateMarket", () => ({
  useCreateMarket: jest.fn(),
}));

jest.mock("../../../Pages/CreateMarket/createMarket.helper", () => ({
  defaultTargetDate: new Date("2024-01-01T00:00:00Z"),
  defaultClosureDate: new Date("2024-01-01T00:00:00Z"),
  handleTargetDateChange: jest.fn(),
}));

jest.mock("../../../utils/appConstants", () => ({
  msgs: {
    createMarket: "Create Market",
    chooseCrypto: "Choose Crypto",
    selectCoin: "Select Crypto",
    priceLevel: "Price Level",
    enterPrice: "Enter Price",
    targetDateTime: "Target Date & Time",
    selectDate: "Select Date",
    eventDuration: "Event Duration",
    eventDays: "Event Days",
    bettingClosureTime: "Betting Closure Time",
    bettingClosureDate: "Betting Closure Date & Time",
    preview: "Preview",
    successful: "Successful",
    eventPublished: "Event Published",
  },
}));

jest.mock("../../../Pages/Marketplace/CommonSuccessModal", () => ({
  __esModule: true,
  default: ({ show, handleCancel }) =>
    show ? <div>CommonSuccessModal</div> : null,
}));

jest.mock("../../../Pages/CreateMarket/PreviewModal", () => ({
  __esModule: true,
  default: ({ show, handleCancel }) => (show ? <div>PreviewModal</div> : null),
}));

jest.mock("../../../Common/CustomDate/CustomDate", () => ({
  __esModule: true,
  default: ({ onChange, defaultValue, ...props }) => (
    <input
      type="date"
      defaultValue={defaultValue}
      onChange={(e) => onChange(new Date(e.target.value))}
      {...props}
    />
  ),
}));

jest.mock("../../../Common/InputCustom/InputCustom", () => ({
  __esModule: true,
  default: (props) => <input {...props} />,
}));

jest.mock("../../../Common/CustomSelect/CustomSelect", () => ({
  __esModule: true,
  default: (props) => (
    <select {...props}>
      {props.options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

jest.mock("../../../Common/ButtonCustom/ButtonCustom", () => ({
  __esModule: true,
  ButtonCustom: (props) => <button {...props}>{props.label}</button>,
}));

describe("CreateMarket Component", () => {
  beforeEach(() => {
    useLocation.mockReturnValue({ state: "/path" });
    useCreateMarket.mockReturnValue({
      formik: {
        values: {
          coin: "",
          priceLevel: "",
          targetDate: defaultTargetDate,
          eventDurationDays: 0,
          eventDurationHours: 0,
          closureTime: defaultClosureDate,
        },
        handleSubmit: jest.fn(),
      },
      coinUrl: "",
      showCoins: [{ value: "btc", label: "Bitcoin" }],
      handleCancel: jest.fn(),
      previewOpen: false,
      confirmOpen: false,
      toggleConfirm: jest.fn(),
      togglePreview: jest.fn(),
      formatInnerLabel: jest.fn((value, label) => `${value} ${label}`),
    });
  });

  it("should render without crashing", () => {
    render(<CreateMarket />);
    expect(screen.getByText(msgs.createMarket)).toBeInTheDocument();
  });

  it("should render form elements", () => {
    render(<CreateMarket />);
    expect(screen.getByText(msgs.chooseCrypto)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(msgs.enterPrice)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(msgs.selectDate)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(msgs.bettingClosureDate)
    ).toBeInTheDocument();
    expect(screen.getByText(msgs.preview)).toBeInTheDocument();
  });

  it("should handle target date change", () => {
    render(<CreateMarket />);
    fireEvent.change(screen.getByPlaceholderText(msgs.selectDate), {
      target: { value: "2024-01-02" },
    });
    expect(handleTargetDateChange).toHaveBeenCalled();
  });

  it("should show modals when appropriate", () => {
    useCreateMarket.mockReturnValue({
      ...useCreateMarket(),
      previewOpen: true,
      confirmOpen: true,
    });
    render(<CreateMarket />);
    expect(screen.getByText("PreviewModal")).toBeInTheDocument();
    expect(screen.getByText("CommonSuccessModal")).toBeInTheDocument();
  });

  it("should call handleSubmit on form submit", () => {
    const { formik } = useCreateMarket();
    render(<CreateMarket />);
    fireEvent.click(screen.getByText(msgs.preview));
    expect(formik.handleSubmit).toHaveBeenCalled();
  });
});
