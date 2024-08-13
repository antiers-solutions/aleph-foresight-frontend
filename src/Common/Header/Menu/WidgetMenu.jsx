/**
 * WidgetMenu Component
 *
 * Renders a menu for the user with options to logout and other actions.
 *
 * @param {object} userDetails - The details of the current user.
 * @returns {JSX.Element} The WidgetMenu component.
 *
 */
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { handleLogout } from "../header.helper";
import Path from "../../../Routing/Constant/RoutePaths";
import { widgetMenuOptions } from "../../../utils/appConstants";
import { Context } from "../../../Pages/ContextProvider/ContextProvider";

const WidgetMenu = (userDetails) => {
  const navigate = useNavigate();
  const { setSearch, setLoading } = useContext(Context);

  const [activeKey, setActiveKey] = useState(null);

  /**
   * Handles the logout functionality.
   *
   * @param {object} e - The event object containing the menu key.
   */
  const logout = async (e) => {
    setActiveKey(e?.key);
    if (e?.key === "logout") {
      setLoading(true);
      const response = await handleLogout();
      if (response) {
        setSearch("");
        if (window.location.pathname != Path.HOME) navigate(Path?.HOME);
      }
      setLoading(false);
    }
  };

  return (
    <div className="profileMenu">
      <Menu
        activeKey={activeKey}
        onClick={logout}
        items={widgetMenuOptions(userDetails)}
      />
    </div>
  );
};

export default WidgetMenu;
