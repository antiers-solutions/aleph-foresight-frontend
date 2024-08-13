import { web3 } from "../../utils/helpers/contractHelpers";
import {
  isLoggedIn,
  connectWalletHandler,
  waitForReceipt,
} from "../../utils/helpers/walletHelpers";

// import { setLoggedIn, isLoggedIn, connectWalletHandler, waitForReceipt, getWalletBalance } from './contractHelpers';

jest.mock("../../utils/helpers/contractHelpers", () => ({
  web3: {
    eth: {
      getBalance: jest.fn(),
    },
  },
}));

// Mock sessionStorage
beforeEach(() => {
  jest.clearAllMocks();
  global.sessionStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
});

// Mock window.ethereum
global.window = Object.create(window);
global.window.ethereum = {
  request: jest.fn(),
};

// Mock web3
const mockWeb3 = {
  eth: {
    getBalance: jest.fn(),
  },
};
global.web3 = mockWeb3;

describe("contractHelpers", () => {
  describe("isLoggedIn", () => {
    beforeEach(() => {
      // Clear the sessionStorage before each test
      sessionStorage.clear();
    });

    it("should return false if sessionStorage is empty", () => {
      expect(isLoggedIn()).toBe(false); // sessionStorage returns string, not boolean
    });

    it('should return the value of "isLogged" from sessionStorage if set', () => {
      sessionStorage.setItem("isLogged", "true");
      expect(isLoggedIn()).toBe("true");
    });

    it('should return false if "isLogged" in sessionStorage is falsy', () => {
      sessionStorage.setItem("isLogged", "");
      expect(isLoggedIn()).toBe(false); // Handles falsy value but note that it should be a string in the implementation
    });
  });

  describe("connectWalletHandler", () => {
    it("should request accounts from MetaMask and return the first address", async () => {
      const address = "0x123";
      window.ethereum.request.mockResolvedValue([address]);
      await expect(connectWalletHandler()).resolves.toBe(address);
    });

    it("should handle errors from MetaMask", async () => {
      window.ethereum.request.mockRejectedValue(new Error("MetaMask error"));
      await expect(connectWalletHandler()).resolves.toBeUndefined();
    });
  });

  describe("waitForReceipt", () => {
    it("should resolve with receipt when transaction is confirmed", async () => {
      const receipt = { status: "0x1" };
      const transactionHash = "0x123";
      window.ethereum.request = jest
        .fn()
        .mockResolvedValueOnce(null) // First call returns no receipt
        .mockResolvedValueOnce(receipt); // Second call returns the receipt

      await expect(waitForReceipt(transactionHash)).resolves.toBe(receipt);
    });

    it("should reject if there is an error retrieving the receipt", async () => {
      const transactionHash = "0x123";
      window.ethereum.request.mockRejectedValue(new Error("Receipt error"));

      await expect(waitForReceipt(transactionHash)).rejects.toThrow(
        "Receipt error"
      );
    });
  });
  
});
