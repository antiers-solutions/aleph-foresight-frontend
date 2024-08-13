/**
 * HeaderLeft component that renders the logo, search bar, and menu for large screens.
 *
 * @returns {JSX.Element} The HeaderLeft component.
 *
 */
import { Grid } from "antd";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import HeaderMenu from "./Menu/HeaderMenu";
import { msgs } from "../../utils/appConstants";
import Path from "../../Routing/Constant/RoutePaths";
import CustomSearch from "../CustomSearch/CustomSearch";
import useHeaderSearch from "../../Hooks/useHeaderSearch";
import { Context } from "../../Pages/ContextProvider/ContextProvider";

const HeaderLeft = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { useBreakpoint } = Grid;
  const { lg } = useBreakpoint();
  const { totalEvents } = useContext(Context);

  const [show, setShow] = useState(true);
  const { setSearch, search } = useHeaderSearch({
    pathname,
    setShow,
  });

  return (
    <div className="headerlogo">
      <div className="headerLeft">
        <img src={Logo} alt="Logo" onClick={() => navigate(Path?.HOME)} />
        {lg ? (
          <CustomSearch
            value={search}
            disabled={!totalEvents && !search}
            placeholder={msgs.searchMarket}
            handleOnChange={setSearch}
            mainClassLayout={!show ? "hide-search" : null}
          />
        ) : null}
      </div>
      {lg ? <HeaderMenu /> : null}
    </div>
  );
};

export default HeaderLeft;
