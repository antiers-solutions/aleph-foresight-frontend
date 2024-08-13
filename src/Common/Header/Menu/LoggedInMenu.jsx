/**
 * HeaderMenu component
 *
 * A React component that renders a menu in the header section of the application.
 *
 * @param {string} className - An optional class name to be added to the container element.
 *
 * @returns {React.ReactElement} A React element representing the header menu.
 *
 */
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WidgetMenu from "./WidgetMenu";
import WalletMenu from "./WalletMenu";
import Path from "../../../Routing/Constant/RoutePaths";
import DropdownCustom from "../../DropdownCustom/Dropdown";
import { ButtonCustom } from "../../ButtonCustom/ButtonCustom";
import { getDropDownMenu } from "../../../utils/helpers/commonHelper";
import { Context } from "../../../Pages/ContextProvider/ContextProvider";
import { DownArrow, WalletIcon } from "../../../assets/StoreAsset/StoreAsset";

const LoggedInMenu = () => {
  const navigate = useNavigate();
  const { profileDetails } = useContext(Context);
  const { pathname } = useLocation();

  return (
    <>
      <ButtonCustom
        label="Create Market"
        btnBorder={true}
        onClick={() => navigate(Path?.CREATEMARKET)}
      />
      <DropdownCustom
        menu={getDropDownMenu(WalletMenu())}
        icon={<WalletIcon />}
        className="walletHeader"
        overlayClassName="wallet_overlay"
      />
      <DropdownCustom
        menu={getDropDownMenu(WidgetMenu(profileDetails, pathname))}
        overlayClassName="customize_overlay"
        icon={
          <>
            <img
              src={profileDetails?.img}
              alt="ProfileLogo"
              className="prifileLogo"
            />
            <DownArrow />{" "}
          </>
        }
        className="profileDropDown"
      />
    </>
  );
};

export default LoggedInMenu;
