import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomSearch from "../../Common/CustomSearch/CustomSearch";

// Mock the SearchIcon component
jest.mock("../../assets/StoreAsset/StoreAsset", () => ({
  SearchIcon: () => <span>🔍</span>,
}));

describe("CustomSearch", () => {
  const mockOnChange = jest.fn();

  it("renders with the correct layout and custom styles", () => {
    render(
      <CustomSearch
        name="search"
        handleOnChange={mockOnChange}
        mainClassLayout="customLayout"
        InputCustomStyle="customStyle"
      />
    );

    // Check if the input is rendered with correct class names
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument(); 

    // Check if the layout is applied correctly
    expect(screen.getByText("🔍")).toBeInTheDocument();
    expect(screen.getByRole("textbox").closest("div")).toHaveClass(
      "inputLayout"
    );
    expect(screen.getByRole("textbox").closest("div")).toHaveClass(
      "customLayout"
    );
    expect(screen.getByRole("textbox").closest("span")).toBeInTheDocument(
      "input_custum"
    );
    expect(screen.getByRole("textbox").closest("span")).toBeInTheDocument(
      "inputSearch"
    );
    expect(screen.getByRole("textbox").closest("span")).toBeInTheDocument(
      "customStyle"
    );
  });

  it("calls handleOnChange with the correct value when input changes", () => {
    render(
      <CustomSearch
        name="search"
        handleOnChange={mockOnChange}
        mainClassLayout="customLayout"
        InputCustomStyle="customStyle"
      />
    );

    // Simulate input change
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    });

    // Check if the handleOnChange callback was called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith("test");
  });

    it("renders with the clear button enabled", () => {
      render(
        <CustomSearch
          name="search"
          handleOnChange={mockOnChange}
          mainClassLayout="customLayout"
          InputCustomStyle="customStyle"
        />
      );

      // Check if the clear button is present
    expect(screen.getByRole("textbox").closest("span")).toBeInTheDocument(
        "ant-input-clear-icon"
      );
    });
});
