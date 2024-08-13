import React from "react";
import { render, screen } from "@testing-library/react";
import { eventDateFormat } from "../../utils/helpers/commonHelper";
import CustomEventDate from "../../Common/CustomEventDate/CustomEventDate";

// Mock the eventDateFormat function
jest.mock("../../utils/helpers/commonHelper", () => ({
  eventDateFormat: jest.fn(),
}));

describe("CustomEventDate", () => {
  it("renders formatted date and time correctly", () => {
    // Arrange
    const mockDate = new Date(2024, 7, 4, 12, 30);
    const mockDateFormat = "YYYY-MM-DD HH:mm:ss";
    const formattedDate = "2024-08-04";
    const formattedTime = "12:30";

    // Mock implementation
    eventDateFormat.mockReturnValue({ formattedDate, formattedTime });

    // Act
    render(<CustomEventDate date={mockDate} dateFormat={mockDateFormat} />);

    // Assert
    expect(screen.getByText(`${formattedDate} |`)).toBeInTheDocument();
    expect(screen.getByText(formattedTime)).toBeInTheDocument();
  });

  it("renders placeholders when date or time is undefined", () => {
    // Arrange
    const mockDate = new Date(2024, 7, 4);
    const mockDateFormat = "YYYY-MM-DD";
    const formattedDate = undefined;
    const formattedTime = undefined;

    // Mock implementation
    eventDateFormat.mockReturnValue({ formattedDate, formattedTime });

    // Act
    render(<CustomEventDate date={mockDate} dateFormat={mockDateFormat} />);

    // Assert
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("renders a placeholder for date and time when both are undefined", () => {
    // Arrange
    const mockDate = new Date(2024, 7, 4);
    const mockDateFormat = "YYYY-MM-DD";
    const formattedDate = undefined;
    const formattedTime = undefined;

    // Mock implementation
    eventDateFormat.mockReturnValue({ formattedDate, formattedTime });

    // Act
    render(<CustomEventDate date={mockDate} dateFormat={mockDateFormat} />);

    // Assert
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });
});
