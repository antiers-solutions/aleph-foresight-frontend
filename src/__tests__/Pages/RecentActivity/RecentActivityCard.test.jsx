// RecentActivityCard.test.js
import React from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useEventCards } from "../../../Hooks/useEventCards";
import { betOn } from "../../../Pages/Marketplace/marketPlace.helper";
import { Context } from "../../../Pages/ContextProvider/ContextProvider";
import RecentActivityCard from "../../../Pages/RecentActivity/RecentActivityCard";
import {
  formatNumber,
  formatPrice,
  globalTimeFormat,
  showTime,
  timeStampToDate,
} from "../../../utils/helpers/commonHelper";

// Mocking dependencies
jest.mock("moment", () => jest.requireActual("moment"));

jest.mock("../../../utils/appConstants", () => ({
  msgs: {
    toBePriceAt: " to be priced at ",
    usdtOrMore: `USDT or more as on`,
  },
}));

jest.mock("../../../Pages/RecentActivity/recentActivity.helper", () => ({
  showUserName: jest.fn(),
  getClassName: jest.fn(),
}));

jest.mock("../../../utils/helpers/commonHelper", () => ({
  formatNumber: jest.fn(),
  formatPrice: jest.fn(),
  globalTimeFormat: jest.fn(),
  showTime: jest.fn(),
  timeStampToDate: jest.fn(),
  truncateText: jest.fn(),
}));
jest.mock("../../../Hooks/useEventCards", () => ({
  useEventCards: jest.fn(),
}));
jest.mock("../../../Pages/Marketplace/marketPlace.helper", () => ({
  betOn: {
    activity: jest.fn(),
  },
}));
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
}));

describe("RecentActivityCard", () => {
  const mockHandleBetOn = jest.fn();
  const mockCoinUrl = { USD: "ProfileImg" };
  const mockBetOn = {
    activity: jest.fn(() => ({ true: "Bought", false: "Sold" })),
  };

  const mockData = [
    {
      eventId: "1",
      currencyType: "USD",
      priceLevel: 100,
      targetDateTime: new Date().toISOString(),
      userDetails: {
        profilePicture: { small: "mockProfilePic" },
        userName: "John Doe",
      },
      bidType: "true",
      currentBet: 500,
      updatedAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    useEventCards.mockReturnValue({ handleBetOn: mockHandleBetOn });
    jest.spyOn(moment.prototype, "format").mockReturnValue("formattedDate");
    formatNumber.mockReturnValue("formattedNumber");
    formatPrice.mockReturnValue("formattedPrice");
    globalTimeFormat.mockReturnValue("formattedGlobalTime");
    showTime.mockReturnValue("formattedShowTime");
    timeStampToDate.mockReturnValue(new Date());
    betOn.activity.mockReturnValue(mockBetOn.activity);
    useLocation.mockReturnValue({ pathname: "/path" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (data) => {
    render(
      <Context.Provider value={{ coinUrl: mockCoinUrl }}>
        <RecentActivityCard data={data} />
      </Context.Provider>
    );
  };

  it("should render recent activities correctly", () => {
    renderComponent(mockData);

    expect(
      screen.getByText(
        /USD to be priced at formattedPrice USDT or more as on formattedGlobalTime?/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/formattedNumber/i)).toBeInTheDocument();
    expect(screen.getByText(/formattedShowTime/i)).toBeInTheDocument();
  });

  it("should handle card click and call handleBetOn", () => {
    renderComponent(mockData);

    fireEvent.click(screen.getByTestId("recent-activity-card")); // assuming cardOuter has role='button'

    expect(mockHandleBetOn).toHaveBeenCalledWith({
      betOn: "yes",
      eventId: "1",
    });
  });

  it("should use default image if coinUrl is empty", () => {
    const mockDataWithEmptyCoinUrl = [
      {
        ...mockData[0],
        currencyType: "USD",
      },
    ];

    renderComponent(mockDataWithEmptyCoinUrl);

    expect(screen.getByAltText("USD")).toHaveAttribute("src", "ProfileImg");
  });
});
