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
import React from "react";
import "../Header.scss";
import CustomList from "../../CustomList/CustomList";
import { headerMenuData } from "../../../utils/appConstants";

function HeaderMenu({ className }) {
  return (
    <div className={`headerLink ${className}`}>
      <CustomList
        list={headerMenuData}
        liClassName="headerLink_menu_item"
        ulClassName="headerLink_menu"
        linkClasName="active"
        opentoNewTab={false}
      />
    </div>
  );
}

export default HeaderMenu;
