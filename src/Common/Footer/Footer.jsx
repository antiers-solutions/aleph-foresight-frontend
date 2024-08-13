/**
 * Social media links and footer menu configuration.
 *
 * This module exports two constants: `socialLink` and `footerMenu`.
 * `socialLink` is an array of objects containing social media icons.
 * `footerMenu` is an array of objects containing footer menu items with labels and routes.
 *
 */
import React, { useContext } from "react";
import "./Footer.scss";
import BetBig from "./BetBig/BetBig";
import CustomList from "../CustomList/CustomList";
import { footerMenu, socialLink } from "./footer.helper";
import { Context } from "../../Pages/ContextProvider/ContextProvider";

const Footer = () => {
  const { setFilter, setSearch } = useContext(Context);

  const handleClick = (navigateTo) => {
    setFilter("volume");
    setSearch("");
    navigateTo && window.open(navigateTo, "_blank");
  };

  return (
    <div className="footer">
      <BetBig />
      <div className="container">
        <div className="innerFooter">
          <div className="listing">
            <CustomList
              list={footerMenu}
              linkClasName="active"
              opentoNewTab={false}
            />
          </div>
          <div className="socialLink">
            <CustomList
              list={socialLink}
              opentoNewTab={true}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
