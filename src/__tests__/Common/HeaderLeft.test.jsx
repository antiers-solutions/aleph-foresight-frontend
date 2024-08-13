import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Grid } from "antd";
import { useLocation } from "react-router-dom";
import { msgs } from "../../utils/appConstants";
import Path from "../../Routing/Constant/RoutePaths";
import HeaderLeft from "../../Common/Header/HeaderLeft";
import useHeaderSearch from "../../Hooks/useHeaderSearch";
import { Context } from "../../Pages/ContextProvider/ContextProvider";
// Mock dependencies
jest.mock("../../Hooks/useHeaderSearch", () => ({
  __esModule: true,
  default: () => ({
    setSearch: jest.fn(),
    search: "",
  }),
}));

jest.mock(
  "../../Common/CustomSearch/CustomSearch",
  () =>
    ({ value, placeHolder, handleOnChange, disabled, mainClassLayout }) =>
      (
        <input
          value={value}
          placeholder={placeHolder}
          onChange={(e) => handleOnChange(e.target.value)}
          disabled={disabled}
          className={mainClassLayout}
        />
      )
);

jest.mock("../../Common/Header/Menu/HeaderMenu", () => () => (
  <div>HeaderMenu Component</div>
));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  Grid: {
    useBreakpoint: jest.fn(() => ({ md: true })),
  },
}));

describe("HeaderLeft Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const { Grid } = require("antd");
    Grid.useBreakpoint.mockReturnValue({ lg: false, sm: true });
    useLocation.mockReturnValue({ pathname: "/path" });
  });

  test("renders CustomSearch and HeaderMenu on large screens", () => {
    jest.spyOn(Grid, "useBreakpoint").mockReturnValue({ lg: true });

    render(
      <Context.Provider value={{ totalEvents: true, searched: "test" }}>
        <HeaderLeft />
      </Context.Provider>
    );

    expect(screen.getByPlaceholderText(msgs.searchMarket)).toBeInTheDocument();
    expect(screen.getByText("HeaderMenu Component")).toBeInTheDocument();
  });

  test("does not render CustomSearch and HeaderMenu on small screens", () => {
    jest.spyOn(Grid, "useBreakpoint").mockReturnValue({ lg: false });

    render(
      <Context.Provider value={{ totalEvents: false, searched: "" }}>
        <HeaderLeft />
      </Context.Provider>
    );

    expect(
      screen.queryByPlaceholderText(msgs.searchMarket)
    ).not.toBeInTheDocument();
    expect(screen.queryByText("HeaderMenu Component")).not.toBeInTheDocument();
  });

  test("navigates to home page when logo is clicked", () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigate);

    jest.spyOn(Grid, "useBreakpoint").mockReturnValue({ lg: true });

    render(
      <Context.Provider value={{ totalEvents: false, searched: "" }}>
        <HeaderLeft />
      </Context.Provider>
    );

    const logo = screen.getByAltText("Logo");
    fireEvent.click(logo);

    expect(navigate).toHaveBeenCalledWith(Path?.HOME);
  });

  test("search input behaves correctly", () => {
    jest.spyOn(Grid, "useBreakpoint").mockReturnValue({ lg: true });

    const setSearch = jest.fn();
    jest.spyOn(useHeaderSearch(), "setSearch").mockImplementation(setSearch);

    render(
      <Context.Provider value={{ totalEvents: true, searched: "" }}>
        <HeaderLeft />
      </Context.Provider>
    );

    const searchInput = screen.getByPlaceholderText(msgs.searchMarket);
    fireEvent.change(searchInput, { target: { value: "new search" } });
    setSearch("new search");
    expect(setSearch).toHaveBeenCalledWith("new search");
  });
});
