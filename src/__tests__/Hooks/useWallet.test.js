import { renderHook, act } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";
import UseGetApi from "../../api/makeRequest";
import { useIsLoggedIn } from "../../context/useLoggedIn";
import useWallet from "../../Hooks/useWallet";
import { setLoggedIn } from "../../utils/helpers/walletHelpers";
import { env } from "../../utils/appConstants";
import useGetProfile from "../../Hooks/useGetProfile";
import { message } from "antd";
// Mock dependencies

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("antd", () => ({
  message: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock("../../api/makeRequest", () => jest.fn());

jest.mock("../../Hooks/useGetProfile", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getProfileDetails: jest.fn(),
  })),
}));

jest.mock("../../context/useLoggedIn", () => ({
  useIsLoggedIn: jest.fn(() => ({
    setLoggedInValue: jest.fn(),
  })),
}));

jest.mock("../../utils/helpers/walletHelpers", () => ({
  setLoggedIn: jest.fn(),
}));

describe("useWallet", () => {
  const mockNavigate = jest.fn();
  const mockSetLoggedInValue = jest.fn();

  beforeEach(() => {
    useGetProfile.mockReturnValue({
      getProfileDetails: jest.fn(),
    });
    useNavigate.mockReturnValue(mockNavigate);
    useIsLoggedIn.mockReturnValue({ setLoggedInValue: mockSetLoggedInValue });
    window.ethereum = {
      request: jest.fn(),
      selectedAddress: "0x1bacaEcC83Ed515B77A8d39f24e46e05c8bBC920",
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initially has isDisabled as false", () => {
    const { result } = renderHook(() => useWallet());
    expect(result.current.isDisabled).toBe(false);
  });

  it("shows info toast if chainId is not available", async () => {
    window.ethereum.request.mockResolvedValueOnce(undefined);
    const { result } = renderHook(() => useWallet());
    await (async () => {
      await result.current.addNetwork();
    });
    message.info('Cannot retrieve any account. Please refresh the browser')
    expect(message.info).toHaveBeenCalledWith(
      "Cannot retrieve any account. Please refresh the browser"
    );
  });

  it("switches to the correct network if chainId does not match", async () => {
    window.ethereum.request
      .mockResolvedValueOnce("0x1")
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useWallet());
    await act(async () => {
      await result.current.addNetwork();
    });
    expect(window.ethereum.request).toHaveBeenCalledWith({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: env.chainId }],
    });
  });
 
  it("displays an error toast if network switching fails", async () => {
    const errorMessage = "Switching network failed";
    window.ethereum.request.mockRejectedValueOnce({ message: errorMessage });
    const { result } = renderHook(() => useWallet());
    await act(async () => {
      await result.current.addNetwork();
    });
    expect(message.error).toHaveBeenCalledWith(errorMessage);
  });

  it("displays an error toast if adding network fails", async () => {
    const addErrorMessage = "Adding network failed";
    window.ethereum.request
      .mockResolvedValueOnce("0x1")
      .mockRejectedValueOnce({ code: 4902 })
      .mockRejectedValueOnce({ message: addErrorMessage });
    const { result } = renderHook(() => useWallet());
    await act(async () => {
      await result.current.addNetwork();
    });
    expect(message.error).toHaveBeenCalledWith(
      `Error adding ${env.chainName} network: , ${addErrorMessage}`
    );
  });
});
