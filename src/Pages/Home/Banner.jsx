/**
 * A functional React component that renders a carousel banner with two slides.
 * The banner has a background image and text on the left side, with a "Learn More" button that navigates to the marketplace page.
 *
 */
import React from "react";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import Path from "../../Routing/Constant/RoutePaths";
import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="bannerSec">
      <Carousel autoplay autoplaySpeed={8000} speed={4000}>
        {/* First Banner Slide */}
        <div className="bannerContent secondBanner">
          <div className="bannerLeftText">
            <h2>Predict the Next Move: Bet and Win Big!</h2>
            <ButtonCustom label="Explore" onClick={() =>{ navigate(Path?.MARKETPLACE)}} />
          </div>
        </div>

        {/* First Banner Slide */}
        <div className="bannerContent thirdBanner">
          <div className="bannerLeftText">
            <h2>Get Ahead of the Game: Predict, Bet and Win Big!</h2>
            <ButtonCustom label="Explore" onClick={() =>{ navigate(Path?.MARKETPLACE)}} />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
