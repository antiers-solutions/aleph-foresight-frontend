import { render } from "@testing-library/react";
import React from "react";
import { Spin } from "antd";
import { Outlet } from "react-router-dom";
import Footer from "../../Common/Footer/Footer";
import Header from "../../Common/Header/Header";
import DashboardLayout from "../../Common/Layouts/DashboardLayout/DashboardLayout";

// Mock the modules and components
jest.mock("react-router-dom", () => ({
  Outlet: jest.fn(() => <div>Outlet Component</div>),
}));

jest.mock("antd", () => ({
  Spin: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock("../../Common/Footer/Footer", () =>
  jest.fn(() => <div>Footer Component</div>)
);
jest.mock("../../Common/Header/Header", () =>
  jest.fn(() => <div>Header Component</div>)
);
jest.mock("../../Common/ErrorBoundary/ErrorBoundary", () =>
  jest.fn(({ children }) => <div>{children}</div>)
);

const mockUseContext = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => mockUseContext(),
}));

describe("DashboardLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Header, Footer, and Outlet components", () => {
    mockUseContext.mockReturnValue({ fullPageLoading: false });

    render(<DashboardLayout />);
    Header();
    Footer();
    Outlet();
    expect(Header).toHaveBeenCalled();
    expect(Footer).toHaveBeenCalled();
    expect(Outlet).toHaveBeenCalled();
  });

  test("displays loading spinner when fullPageLoading is true", () => {
    mockUseContext.mockReturnValue({ fullPageLoading: true });

    render(<DashboardLayout />);
    Spin({ spinning: true });
    expect(Spin).toHaveBeenCalledWith({ spinning: true });
  });

  test("does not display loading spinner when fullPageLoading is false", () => {
    mockUseContext.mockReturnValue({ fullPageLoading: false });

    render(<DashboardLayout />);
    Spin({ spinning: false });

    expect(Spin).toHaveBeenCalledWith({ spinning: false });
  });

  
});
