import React from "react";
import { Button } from "antd";
import { render } from "@testing-library/react";
import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";

describe("ButtonCustom", () => {
  it("renders with correct label and title", () => {
    const { getByText, getByTitle } = render(
      <ButtonCustom label="Click Me" title="Button Title" />
    );

    expect(getByText("Click Me")).toBeInTheDocument();
    expect(getByTitle("Button Title")).toBeInTheDocument();
  });

  it("applies custom CSS classes", () => {
    const { container } = render(
      <ButtonCustom label="Click Me" customClass="myCustomClass" />
    );

    expect(container.firstChild).toHaveClass("btnCustom myCustomClass");
  });

  it("applies border class when btnBorder is true", () => {
    const { container } = render(
      <ButtonCustom label="Click Me" btnBorder={true} />
    );

    expect(container.firstChild).toHaveClass("btnBorder");
  });

  it("renders left and right icons correctly", () => {
    const { container, getByTestId } = render(
      <ButtonCustom
        label="Click Me"
        leftIcon={<span data-testid="left-icon">Left</span>}
        rightIcon={<span data-testid="right-icon">Right</span>}
      />
    );

    expect(getByTestId("left-icon")).toBeInTheDocument();
    expect(getByTestId("right-icon")).toBeInTheDocument();
  });

  it("handles htmlType prop correctly", () => {
    const { container } = render(
      <ButtonCustom label="Click Me" htmlType="submit" />
    );

    const buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveAttribute("type", "submit");
  });

  it("renders additional props", () => {
    const { container } = render(
      <ButtonCustom label="Click Me" disabled />
    );

    const buttonElement = container.querySelector("button");
    expect(buttonElement).toBeDisabled();
  });
});
