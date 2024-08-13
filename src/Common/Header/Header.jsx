/**
 * Header component that renders the top navigation bar.
 *
 * @returns {JSX.Element} The Header component.
 *
 *
 */
import React, { useEffect, useRef } from "react";
import "./Header.scss";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import useCurrentWidth from "../../Hooks/useCurrentWidth";
import { useHandleScroll } from "../../Hooks/useHandleScroll";
import useGetProfile from "../../Hooks/useGetProfile";

const Header = () => {
  const width = useCurrentWidth();
  const isScrolled = useHandleScroll(width);
  const { getProfileDetails } = useGetProfile();

  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
    <>
      <div
        className={`headerHome ${isScrolled ? "scroll" : ""}`}
        id="home"
        data-testid="header"
      >
        <div className="headerHome_container">
          <HeaderLeft />
          <HeaderRight />
        </div>
      </div>
    </>
  );
};

export default Header;
