import { render, screen } from "@testing-library/react";
import React from "react";
import NoData from "../../Common/NoData/NoData";

// Mock the Ant Design Spin component
jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  Spin: jest.fn(() => <div data-testid="spin">Loading...</div>),
}));

test("renders 'No records Found' message when loading is false and no data type is provided", () => {
  render(<NoData loading={false} />);

  const noDataMessage = screen.getByText("No records Found");
  expect(noDataMessage).toBeInTheDocument();
});

test("renders 'No events Found' message when loading is false and data type is provided", () => {
  render(<NoData loading={false} data="events" />);

  const noDataMessage = screen.getByText("No events Found");
  expect(noDataMessage).toBeInTheDocument();
});

test("renders 'No users Found' message when loading is false and data type is provided", () => {
  render(<NoData loading={false} data="users" />);

  const noDataMessage = screen.getByText("No users Found");
  expect(noDataMessage).toBeInTheDocument();
});
