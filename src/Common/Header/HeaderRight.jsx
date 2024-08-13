/**
 * HeaderRight component that renders the right side of the header.
 * It handles the menu toggle, search bar, and button for creating a market or connecting a wallet.
 *
 */
import { Drawer, Grid } from "antd";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderMenu from "./Menu/HeaderMenu";
import useWallet from "../../Hooks/useWallet";
import LoggedInMenu from "./Menu/LoggedInMenu";
import { msgs } from "../../utils/appConstants";
import Path from "../../Routing/Constant/RoutePaths";
import CustomSearch from "../CustomSearch/CustomSearch";
import useHeaderSearch from "../../Hooks/useHeaderSearch";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";
import { Wallet } from "../../assets/StoreAsset/StoreAsset";
import { isLoggedIn } from "../../utils/helpers/walletHelpers";
import { Context } from "../../Pages/ContextProvider/ContextProvider";

const HeaderRight = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { useBreakpoint } = Grid;
  const { lg, sm } = useBreakpoint();
  const { isDisabled, addNetwork } = useWallet();
  const { totalEvents } = useContext(Context);

  const [show, setShow] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { setSearch, search } = useHeaderSearch({
    pathname,
    setShow,
  });

  const toggleMenu = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <div className="headerHome_right">
        {isLoggedIn() && lg ? (
          <LoggedInMenu />
        ) : (
          <ButtonCustom
            label={msgs.connect}
            leftIcon={<Wallet />}
            onClick={() => addNetwork()}
            disabled={isDisabled}
          />
        )}
        {!lg ? (
          <>
            <div className="menuToggle" onClick={toggleMenu}>
              <span></span>
            </div>
            <Drawer
              placement="right"
              onClose={toggleMenu}
              open={drawerOpen}
              width={sm ? "378px" : "300px"}
              className="drawerMenu"
            >
              <HeaderMenu />
              {!lg ? (
                <>
                  {show ? (
                    <CustomSearch
                      value={search}
                      placeholder={msgs.searchMarket}
                      handleOnChange={setSearch}
                      disabled={!totalEvents && !search}
                    />
                  ) : null}
                  <ButtonCustom
                    label={isLoggedIn() ? msgs.createMarket : msgs.connect}
                    btnBorder={true}
                    onClick={() => {
                      isLoggedIn()
                        ? navigate(Path?.CREATEMARKET)
                        : addNetwork();
                      toggleMenu();
                    }}
                  />
                </>
              ) : null}
            </Drawer>
          </>
        ) : null}
      </div>
    </>
  );
};

export default HeaderRight;
