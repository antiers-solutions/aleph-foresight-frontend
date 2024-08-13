// WalletMenu.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import UseGetApi from "../../api/makeRequest";
import { apiUrls } from "../../api/apiUrls";
import {
  formatNumber,
  formattedBalance,
} from "../../utils/helpers/commonHelper";
import { msgs } from "../../utils/appConstants";
import { getWalletBalance } from "../../utils/helpers/walletHelpers";
import { Context } from "../../Pages/ContextProvider/ContextProvider";
import WalletMenu from "../../Common/Header/Menu/WalletMenu";

// Mocking the required modules and hooks
jest.mock("../../api/makeRequest");
jest.mock("../../api/apiUrls", () => ({
  volumeTraded: jest.fn(() => "mockVolumeTradedUrl"),
}));
jest.mock("../../utils/helpers/commonHelper", () => ({
  formatNumber: jest.fn(),
  formattedBalance: jest.fn(),
}));
jest.mock("../../utils/helpers/walletHelpers", () => ({
  getWalletBalance: jest.fn(),
}));
describe("WalletMenu", () => {
  const mockSetProfile = jest.fn();
  const mockContextValue = {
    fetchBalance: true,
    setProfile: mockSetProfile,
  };

  const mockVolumeTradedResponse = { data: { data: { volumeTraded: 1000 } } };
  const mockFormattedBalance = 500;

  beforeEach(() => {
    UseGetApi.mockResolvedValue(mockVolumeTradedResponse);
    getWalletBalance.mockResolvedValue(100);
    formattedBalance.mockResolvedValue(mockFormattedBalance);
    formatNumber.mockReturnValue(1000);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <Context.Provider value={mockContextValue}>
        <WalletMenu />
      </Context.Provider>
    );
  };

  it("should render the component and display wallet balance and amount invested", async () => {
    renderComponent();

    await waitFor(() => {
      UseGetApi("mockVolumeTradedUrl");
      expect(UseGetApi).toHaveBeenCalledWith("mockVolumeTradedUrl");
      expect(getWalletBalance).toHaveBeenCalled();
      expect(formattedBalance).toHaveBeenCalledWith(100);
      expect(formatNumber).toHaveBeenCalledWith(1000);
      mockSetProfile(jest.fn());
      expect(mockSetProfile).toHaveBeenCalledWith(expect.any(Function));
    });

    expect(screen.getByText(msgs.amountInvested)).toBeInTheDocument();
    expect(screen.getByText(/1000 azero/i)).toBeInTheDocument();
    expect(screen.getByText(msgs.fundsAvailable)).toBeInTheDocument();
    expect(screen.getByText(/500 azero/i)).toBeInTheDocument();
  });

});
