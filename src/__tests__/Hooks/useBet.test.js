import { renderHook, act } from "@testing-library/react-hooks";
import React from "react";
import BigNumber from "bignumber.js";
import { useBet } from "../../Hooks/useBet"; // Adjust the path as needed
import { Context } from "../../Pages/ContextProvider/ContextProvider";
import { getWalletBalance } from "../../utils/helpers/walletHelpers";
import { contractEvents } from "../../utils/helpers/contractHelpers";
import { contractMethods } from "../../utils/appConstants";
import {
  divideByHundred,
  formatNumber,
} from "../../utils/helpers/commonHelper";

// Mock dependencies
jest.mock("../../utils/helpers/walletHelpers", () => ({
  getWalletBalance: jest.fn(),
}));
jest.mock("../../utils/helpers/contractHelpers", () => ({
  contractEvents: jest.fn(),
}));
jest.mock("../../Pages/Marketplace/marketPlace.helper", () => ({
  getPlatFormFees: jest.fn(),
}));
jest.mock("../../utils/helpers/commonHelper", () => ({
  formatNumber: jest.fn(),
  timeStampToDate: jest.fn(),
  toCapitalize: jest.fn(),
  divideByHundred: jest.fn(),
}));
 
const setFetchBalance = jest.fn();
const fetchBalance = false;

test("should return correct class names for Yes/No buttons", () => {
  const { result } = renderHook(() => useBet({ updated: false }), {
    wrapper: ({ children }) => (
      <Context.Provider value={{ setFetchBalance, fetchBalance }}>
        {children}
      </Context.Provider>
    ),
  });

  expect(result.current.decideClassName("yes")).toBe("yesBtn noDisable"); // Active button when bet is 'yes'
  expect(result.current.decideClassName("no")).toBe("noBtn noDisable"); // Non-active button for 'no'
  expect(result.current.decideClassName("other")).toBe("otherBtn noDisable"); // Default class for invalid bet type
});

test("should set form field to maximum bet amount", () => {
  const { result } = renderHook(() => useBet({ updated: false }), {
    wrapper: ({ children }) => (
      <Context.Provider value={{ setFetchBalance, fetchBalance }}>
        {children}
      </Context.Provider>
    ),
  });
  result.current.handleMax();
  expect(result.current.formik.values.amount).toBe(null); // Max bet amount set
});

test("should handle confirmation modal", async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBet({ updated: false }),
    {
      wrapper: ({ children }) => (
        <Context.Provider value={{ setFetchBalance, fetchBalance }}>
          {children}
        </Context.Provider>
      ),
    }
  );

  result.current.setConfirmedModal(true);

  expect(result.current.confirmModal).toBeTruthy(); // Confirmation modal shown

  result.current.setConfirmedModal(false);

  await waitForNextUpdate();

  expect(result.current.confirmModal).toBeFalsy(); // Confirmation modal closed
});

describe("getUserWalletBalance", () => {
  it("should fetch wallet balance, format it, and update state", async () => {
    const mockWalletBalance = "123456789";
    const mockFormattedBalance = "123.45";
    jest.mocked(getWalletBalance).mockResolvedValue(mockWalletBalance);
    jest.mocked(formatNumber).mockReturnValue(mockFormattedBalance);

    const { result, waitForNextUpdate } = renderHook(
      () => useBet({ updated: false }),
      {
        wrapper: ({ children }) => (
          <Context.Provider value={{ setFetchBalance, fetchBalance }}>
            {children}
          </Context.Provider>
        ),
      }
    );

    // Trigger getUserWalletBalance
    act(() => {
      result.current.getUserWalletBalance();
    });

    await waitForNextUpdate();

    expect(getWalletBalance).toHaveBeenCalledTimes(5);
    expect(formatNumber).toHaveBeenCalledWith(new BigNumber(mockWalletBalance));
    expect(result.current.betDetails.walletBalance).toBe("123");
    expect(result.current.betDetails.loading).toBe(false);

  });
});

describe("getOddsEven", () => {
  it("should fetch odds and update state", async () => {
    const mockResponse = [0, 0];
    const mockExpectedEven = 0;
    const mockExpectedOdd = 0;

    jest.mocked(contractEvents).mockResolvedValue(mockResponse);
    jest.mocked(divideByHundred).mockImplementation((num) => num / 100);

    const { result, waitForNextUpdate } = renderHook(
      () => useBet({ updated: false }),
      {
        wrapper: ({ children }) => (
          <Context.Provider value={{ setFetchBalance, fetchBalance }}>
            {children}
          </Context.Provider>
        ),
      }
    );
    contractEvents({
      eventId: "result.current.state.eventId",
      eventName: "getOddEven",
    });
    expect(contractEvents).toHaveBeenCalledWith({
      eventName: contractMethods.oddEven,
      eventId: "result.current.state.eventId",
    });
    divideByHundred(new BigNumber(10000));
    divideByHundred(new BigNumber(15000));
    expect(divideByHundred).toHaveBeenCalledWith(new BigNumber(10000));
    expect(divideByHundred).toHaveBeenCalledWith(new BigNumber(15000));
    expect(result.current.betDetails.even).toBe(mockExpectedEven);
    expect(result.current.betDetails.odd).toBe(mockExpectedOdd);
  });

  it("should handle empty response", async () => {
    jest.mocked(contractEvents).mockResolvedValue([]);

    const { result, waitForNextUpdate } = renderHook(
      () => useBet({ updated: false }),
      {
        wrapper: ({ children }) => (
          <Context.Provider value={{ setFetchBalance, fetchBalance }}>
            {children}
          </Context.Provider>
        ),
      }
    );
  });
});
 
