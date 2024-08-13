import React from "react";
import { useLocation } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import HeaderRight from "../../Common/Header/HeaderRight";
import { isLoggedIn } from "../../utils/helpers/walletHelpers";
import { Context } from "../../Pages/ContextProvider/ContextProvider";

// Mock dependencies
jest.mock("../../Hooks/useWallet", () => ({
  __esModule: true,
  default: () => ({
    isDisabled: false,
    addNetwork: jest.fn(),
  }),
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));
jest.mock("../../Hooks/useHeaderSearch", () => ({
  __esModule: true,
  default: () => ({
    setSearch: jest.fn(),
    search: "",
  }),
}));

jest.mock("../../utils/helpers/walletHelpers", () => ({
  isLoggedIn: jest.fn(),
}));

jest.mock(
  "../../Common/ButtonCustom/ButtonCustom",
  () =>
    ({ label, onClick, leftIcon, disabled }) =>
      (
        <button onClick={onClick} disabled={disabled}>
          {leftIcon} {label}
        </button>
      )
);

jest.mock("../../Common/Header/Menu/LoggedInMenu", () => () => (
  <div>LoggedInMenu Component</div>
));
jest.mock("../../Common/Header/Menu/HeaderMenu", () => () => (
  <div>HeaderMenu Component</div>
));
jest.mock(
  "../../Common/CustomSearch/CustomSearch",
  () =>
    ({ value, placeHolder, handleOnChange, disabled }) =>
      (
        <input
          value={value}
          placeholder={placeHolder}
          onChange={(e) => handleOnChange(e.target.value)}
          disabled={disabled}
        />
      )
);
jest.mock("../../assets/StoreAsset/StoreAsset", () => ({
  Wallet: () => <span>Wallet Icon</span>,
}));
jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  Grid: {
    useBreakpoint: jest.fn(() => ({ md: true })),
  },
})); 
describe("HeaderRight Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const { Grid } = require("antd");
    Grid.useBreakpoint.mockReturnValue({ lg: false, sm: true });
    useLocation.mockReturnValue({ pathname: "/path" });
  });
  test("renders LoggedInMenu if user is logged in", () => {
    isLoggedIn.mockReturnValue(true);
    render(
      <Context.Provider value={{ totalEvents: false, searched: "" }}>
        <HeaderRight />
      </Context.Provider>
    );

    expect(screen.getByText("LoggedInMenu Component")).toBeInTheDocument();
    expect(screen.queryByText("Wallet Icon")).not.toBeInTheDocument();
  });
});
