// RecentActivity.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import RecentActivity from "../../../Pages/RecentActivity/RecentActivity";
import NoData from "../../../Common/NoData/NoData";
import { ButtonCustom } from "../../../Common/ButtonCustom/ButtonCustom";
import { msgs } from "../../../utils/appConstants";
import Path from "../../../Routing/Constant/RoutePaths";
import { useGetActivity } from "../../../Hooks/useGetActivity";
import RecentActivityCard from "../../../Pages/RecentActivity/RecentActivityCard";

// Mocking dependencies
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../../Hooks/useGetActivity", () => ({
  useGetActivity: jest.fn(),
}));

jest.mock("antd", () => ({
  Carousel: jest.fn(({ children }) => (
    <div data-testid="activity-carousel">{children}</div>
  )),
}));

jest.mock("../../../Common/NoData/NoData", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mock NoData</div>),
}));

jest.mock("../../../Common/ButtonCustom/ButtonCustom", () => ({
  ButtonCustom: jest.fn(({ label, onClick }) => (
    <button onClick={onClick}>{label}</button>
  )),
}));

jest.mock("web3", () => {
  return {
    providers: {
      WebsocketProvider: jest.fn(),
    },
  };
});

// Mock the env variable
jest.mock("../../../utils/helpers/contractHelpers", () => ({
  wsProvider: {
    on: jest.fn(),
  },
}));

jest.mock('../../../Pages/RecentActivity/RecentActivityCard', () => () => <div>RecentActivityCard</div>);
jest.mock('../../../Common/NoData/NoData', () => () => <div>NoData</div>);

describe('RecentActivity', () => {
  const mockNavigate = jest.fn();
  const mockUseGetActivity = useGetActivity;

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders NoData component when there are no recent activities', () => {
    mockUseGetActivity.mockReturnValue({ metaData: { recentAvitvityData: [] } });

    render(<RecentActivity />);

    expect(screen.getByText('NoData')).toBeInTheDocument();
  });

  // test('renders Carousel with RecentActivityCard components when there are recent activities', () => {
  //   const recentActivities = [{}, {}, {}, {}, {}, {}]; // Mock data with exactly 6 items
  //   mockUseGetActivity.mockReturnValue({ metaData: { recentAvitvityData: recentActivities } });

  //   render(<RecentActivity />);

  //   expect(screen.getByTestId('activity-carousel')).toBeInTheDocument();
  //   recentActivities.forEach((_, index) => {
  //     expect(screen.getByText('RecentActivityCard')).toBeInTheDocument();
  //   });
  // });

  test('does not render View All button when there are no recent activities', () => {
    mockUseGetActivity.mockReturnValue({ metaData: { recentAvitvityData: [] } });

    render(<RecentActivity />);

    expect(screen.queryByText('View All')).not.toBeInTheDocument();
  });

  // test('renders View All button and navigates on click', () => {
  //   const recentActivities = [{}, {}];
  //   mockUseGetActivity.mockReturnValue({ metaData: { recentAvitvityData: recentActivities } });

  //   render(<RecentActivity />);

  //   const viewAllButton = screen.getByText('View All');
  //   expect(viewAllButton).toBeInTheDocument();

  //   fireEvent.click(viewAllButton);
  //   expect(mockNavigate).toHaveBeenCalledWith('/activity'); // Adjust path as needed
  // });
});
