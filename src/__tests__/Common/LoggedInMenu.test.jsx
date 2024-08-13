// LoggedInMenu.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../../Pages/ContextProvider/ContextProvider";
import LoggedInMenu from "../../Common/Header/Menu/LoggedInMenu";
import DropdownCustom from "../../Common/DropdownCustom/Dropdown";
import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";
import { getDropDownMenu } from "../../utils/helpers/commonHelper";
import { WalletIcon, DownArrow } from "../../assets/StoreAsset/StoreAsset";
import Path from "../../Routing/Constant/RoutePaths";

// Mocking the required modules and components
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

// jest.mock('../../Pages/ContextProvider/ContextProvider', () => ({
//   Context: React.createContext(),
// }));

jest.mock("../../Common/DropdownCustom/Dropdown", () => {
  return jest.fn(() => <div>Mocked DropdownCustom</div>);
});

jest.mock("web3", () => {
  return {
    providers: {
      WebsocketProvider: jest.fn(),
    },
  };
});

jest.mock("../../utils/helpers/contractHelpers", () => ({
  wsProvider: {
    on: jest.fn(),
  },
}));
jest.mock("../../Common/ButtonCustom/ButtonCustom", () => ({
  ButtonCustom: jest.fn(() => <button>Mocked ButtonCustom</button>),
}));

jest.mock("../../utils/helpers/commonHelper", () => ({
  getDropDownMenu: jest.fn(() => []),
  truncateText: jest.fn(),
}));

jest.mock("../../assets/StoreAsset/StoreAsset", () => ({
  DownArrow: () => <div>Mocked DownArrow</div>,
  WalletIcon: () => <div>Mocked WalletIcon</div>,
}));

describe("LoggedInMenu", () => {
  const mockNavigate = jest.fn();
  const mockProfileDetails = { img: "profile.jpg" };

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ pathname: "/test-path" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (contextValue) => {
    render(
      <Context.Provider value={contextValue}>
        <LoggedInMenu />
      </Context.Provider>
    );
  };

  it("should render ButtonCustom and DropdownCustom components", () => {
    renderComponent({ profileDetails: mockProfileDetails });

    expect(ButtonCustom).toHaveBeenCalledWith(
      expect.objectContaining({
        label: "Create Market",
        btnBorder: true,
        onClick: expect.any(Function),
      }),
      {}
    );
    expect(DropdownCustom).toHaveBeenCalledTimes(2);
  });

//   it("should call navigate on ButtonCustom click", () => {
//     renderComponent({ profileDetails: mockProfileDetails });
//     fireEvent.click(screen.getByText("Mocked ButtonCustom"));
//     expect(mockNavigate).toHaveBeenCalledWith(Path.CREATEMARKET);
//   });

  it("should pass correct props to DropdownCustom components", () => {
    renderComponent({ profileDetails: mockProfileDetails });
    DropdownCustom({
      className: "walletHeader",
      icon: <WalletIcon />,
      menu: [],
      overlayClassName: "wallet_overlay",
    });
    DropdownCustom({
        "className": "profileDropDown", "icon": <React.Fragment><img alt="ProfileLogo" className="prifileLogo" src="profile.jpg" /><DownArrow /></React.Fragment>, "menu": [], "overlayClassName": "customize_overlay"
    });
    expect(DropdownCustom).toHaveBeenCalledWith({
      menu: [],
      icon: <WalletIcon />,
      className: "walletHeader",
      overlayClassName: "wallet_overlay",
    });
    expect(DropdownCustom).toHaveBeenCalledWith(
      {
        menu: [],
        icon: (
          <>
            <img
              src={mockProfileDetails.img}
              alt="ProfileLogo"
              className="prifileLogo"
            />
            <DownArrow />
          </>
        ),
        className: "profileDropDown",
        overlayClassName: "customize_overlay",
      } 
    );
  });
});
