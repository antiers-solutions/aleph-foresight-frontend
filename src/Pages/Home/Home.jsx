/**
 * Home Component
 *
 * This component serves as the main entry point for the application.
 * It renders the banner, top markets, top events, and recent activity sections.
 *
 * @returns {JSX.Element} The JSX element representing the Home component.
 *
 */
import React from "react";
import "./Home.scss";
import Banner from "./Banner";
import TopEvents from "./TopEvents/TopEvents";
import TopMarkets from "./TopMarkets/TopMarkets";
import RecentActivity from "../RecentActivity/RecentActivity";

function Home() {
  return (
    <div className="homeSec">
      <div className="container">
        <Banner />
        <TopMarkets />
        <TopEvents />
      </div>
      <RecentActivity />
    </div>
  );
}

export default Home;
