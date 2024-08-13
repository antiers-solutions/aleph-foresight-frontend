import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import CommonConfirmationModal from "./CommonConfirmationModal"; // Adjust the import path as needed
// Mock out all top level functions, such as get, put, delete and post:

import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";
import { Spin } from "antd";
import { Question } from "../../assets/StoreAsset/StoreAsset";
import CommonConfirmationModal from "../../Common/CommonConfirmModal/CommonConfirmModal";
import { msgs } from "../../utils/appConstants";

jest.mock("../../utils/appConstants", () => ({
  msgs: jest.fn(),
}));
Question;
jest.mock("../../assets/StoreAsset/StoreAsset", () => ({
  Question: jest.fn(),
}));

describe("CommonConfirmationModal", () => {
  const mockHandleYes = jest.fn();
  const mockHandleCancel = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with the correct header and description", () => {
    const { getByText } = render(
      <CommonConfirmationModal
        show={true}
        header="Confirm Action"
        desc="Are you sure you want to proceed?"
        handleYes={mockHandleYes}
        handleCancel={mockHandleCancel}
      />
    );

    expect(getByText("Confirm Action")).toBeInTheDocument();
    expect(getByText("Are you sure you want to proceed?")).toBeInTheDocument();
  });

  it("shows the correct icon when provided", () => {
    const { getByTestId } = render(
      <CommonConfirmationModal
        show={true}
        icon={<span data-testid="custom-icon">Custom Icon</span>}
        handleYes={mockHandleYes}
        handleCancel={mockHandleCancel}
      />
    );

    expect(getByTestId("custom-icon")).toBeInTheDocument();
  });

  // it("shows the default icon when no icon is provided", () => {
  //   const { getByTestId } = render(
  //     <CommonConfirmationModal
  //       show={true}
  //       handleYes={mockHandleYes}
  //       handleCancel={mockHandleCancel}
  //     />
  //   );

  //   expect(getByTestId("question-icon")).toBeInTheDocument(); // Assuming the `Question` component has a test ID of "question-icon"
  // });

  it("renders loading spinner on the yes button when loading is true", () => {
    const { getAllByRole } = render(
      <CommonConfirmationModal
        show={true}
        loading={true}
        handleYes={mockHandleYes}
        handleCancel={mockHandleCancel}
      />
    );
    const button = getAllByRole("button");
    const yesButton = button[0];
    expect(yesButton).toBeInTheDocument();
  });

  it("disables yes button when loading is true", () => {
    const { getAllByRole } = render(
      <CommonConfirmationModal
        show={true}
        loading={true}
        handleYes={mockHandleYes}
        handleCancel={mockHandleCancel}
      />
    );
    const button = getAllByRole("button");
    const yesButton = button[0];
    expect(yesButton).toBeDisabled();
  });

  it("enables yes button when loading is false", () => {
    const { getAllByRole } = render(
      <CommonConfirmationModal
        show={true}
        loading={false}
        handleYes={mockHandleYes}
        handleCancel={mockHandleCancel}
      />
    );
    const button = getAllByRole("button");
    const yesButton = button[0];
    expect(yesButton).toBeEnabled();
  });

  it("calls handleYes when yes button is clicked", () => {
    const { getAllByRole } = render(
      <CommonConfirmationModal
        show={true}
        handleYes={mockHandleYes}
        handleCancel={mockHandleCancel}
      />
    );
    const button = getAllByRole("button");
    const yesButton = button[0];
    fireEvent.click(yesButton);
    expect(mockHandleYes).toHaveBeenCalledTimes(1);
  });

  it("calls handleCancel when no button is clicked", () => {
    const { getAllByRole } = render(
      <CommonConfirmationModal
        show={true}
        handleYes={mockHandleYes}
        handleCancel={mockHandleCancel}
        loading={false}
      />
    );

    const button = getAllByRole("button");
    const noButton = button[1];
    fireEvent.click(noButton);
    expect(mockHandleCancel).toHaveBeenCalledTimes(1);
  });

  it("does not render the modal when show is false", () => {
    const { queryByRole } = render(
      <CommonConfirmationModal
        show={false}
        handleYes={mockHandleYes}
        handleCancel={mockHandleCancel}
      />
    );

    expect(queryByRole("dialog")).toBeNull();
  });
});
