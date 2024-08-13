import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import {
  eventIdURL,
  globalTimeFormat,
  timeStampToDate,
} from "../../utils/helpers/commonHelper";
import Question from "../../Common/Question/Question";
import { Context } from "../../Pages/ContextProvider/ContextProvider";

jest.mock("moment", () =>
  jest.fn(() => ({
    format: jest.fn(() => "formatted-date"),
  }))
);

jest.mock("../../utils/helpers/commonHelper", () => ({
  eventIdURL: jest.fn(),
  globalTimeFormat: jest.fn(() => "formatted-date"),
  timeStampToDate: jest.fn(),
}));

jest.mock("../../assets/BlueLogo.svg", () => "mock-profile-img.svg");

describe("Question Component", () => {
  const mockPromise = jest.fn();
  const mockRecord = {
    eventId: "123",
    createdAt: "2023-01-01T00:00:00Z",
    targetDateTime: "2023-12-31T23:59:59Z",
    currencyType: "BTC",
    priceLevel: "10000",
  };

  const mockContext = {
    coinUrl: {
      BTC: "mock-btc-img-url",
    },
  };

  const renderComponent = () => {
    render(
      <Context.Provider value={mockContext}>
        <Question promise={mockPromise} record={mockRecord} />
      </Context.Provider>
    );
  };

  beforeEach(() => {
    mockPromise.mockClear();
    eventIdURL.mockClear();
    globalTimeFormat.mockClear();
    timeStampToDate.mockClear();
  });

  test("renders loading spinner when loading is true", async () => {
    mockPromise.mockResolvedValue({ name: "BTC", price: "10000" });

    renderComponent();

    await waitFor(() => {
      mockPromise();
      expect(mockPromise).toHaveBeenCalled();
      expect(globalTimeFormat).toHaveBeenCalledTimes(2);
    });

    const coinImage = screen.getByAltText("coin");
    const text = screen.getByText(
      /BTC to be priced at 10000 USDT or more as on ?/i
    );

    expect(coinImage).toHaveAttribute("src", "mock-btc-img-url");
    expect(text).toBeInTheDocument();
  });

  test("renders default values when promise does not resolve with data", async () => {
    mockPromise.mockResolvedValue(null);

    renderComponent();

    await waitFor(() => {
      mockPromise();
      expect(mockPromise).toHaveBeenCalled();
      expect(globalTimeFormat).toHaveBeenCalledTimes(2);
    });

    const coinImage = screen.getByAltText("coin");
    const text = screen.getByText(
      /BTC to be priced at 10000 USDT or more as on ?/i
    );

    expect(coinImage).toHaveAttribute("src", "mock-btc-img-url");
    expect(text).toBeInTheDocument();
  });

  test("uses default profile image when coin URL is not available", async () => {
    mockPromise.mockResolvedValue({ name: "Bitcoin", price: "20000" });

    const noCoinUrlContext = {
      coinUrl: {},
    };

    render(
      <Context.Provider value={noCoinUrlContext}>
        <Question promise={mockPromise} record={mockRecord} />
      </Context.Provider>
    );

    await waitFor(() => {
      mockPromise();
      expect(mockPromise).toHaveBeenCalled();
      expect(globalTimeFormat).toHaveBeenCalledTimes(2);
    });

    const coinImage = screen.getByAltText("coin");
    const text = screen.getByText(
      /BTC to be priced at 10000 USDT or more as on ?/i
    );

    expect(coinImage).toHaveAttribute("src", "mock-profile-img.svg");
    expect(text).toBeInTheDocument();
  });
});
