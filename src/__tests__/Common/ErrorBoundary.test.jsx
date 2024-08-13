import React from "react";
import { render, screen } from "@testing-library/react";

import ErrorBoundary from "../../Common/ErrorBoundary/ErrorBoundary"; // Adjust path as necessary
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import { msgs } from "../../utils/appConstants";

// Mock the ErrorPage component
jest.mock("../../Pages/ErrorPage/ErrorPage", () =>
  jest.fn(({ error, desc }) => (
    <div>
      <div>Error: {error}</div>
      <div>Stack: {desc}</div>
    </div>
  ))
);

describe("ErrorBoundary", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders children when no error occurs", () => {
    const ChildComponent = () => <div>Child Component</div>;

    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  test("renders ErrorPage component when an error occurs", () => {
    const ProblematicComponent = () => {
      throw new Error("Test error");
    };

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );
    ErrorPage({
      error: "Test error",
      desc: "expect.any(String)",
    });
    expect(ErrorPage).toHaveBeenCalledWith({
      error: "Test error",
      desc: expect.any(String),
    });
  });

  test("initializes state correctly", () => {
    const { error, desc } = msgs.errorPage;
    const instance = new ErrorBoundary({});
    expect(instance.state).toEqual({
      hasError: false,
      error: error,
      stack: desc,
    });
  });

  test("updates state correctly on error", () => {
    const error = new Error("Test error");
    const instance = new ErrorBoundary({});
    instance.componentDidCatch(error);

    expect(instance.state).toEqual({
      hasError: false,
      error: "An error occured.",
      stack: "Something went wrong...",
    });
  });
});
