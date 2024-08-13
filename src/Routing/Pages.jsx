/**
 * Returns an object containing arrays of private and public pages for the application.
 *
 * Each page is represented as an object with a `path` property and an `element` property.
 * The `path` property is the URL path for the page, and the `element` property is the React component to render for that page.
 *
 * @returns {Object} An object with two properties: `PRIVATE_PAGES` and `PUBLIC_PAGES`.
 *
 */
import React from "react";
import Home from "../Pages/Home/Home.jsx";
import Path from "./Constant/RoutePaths.jsx";
import About from "../Pages/About/About.jsx";
import Profile from "../Pages/Profile/Profile.jsx";
import Activity from "../Pages/Activity/Activity.jsx";
import ContactUs from "../Pages/ContactUs/ContactUs.jsx";
import Marketplace from "../Pages/Marketplace/Marketplace.jsx";
import CreateMarket from "../Pages/CreateMarket/CreateMarket.jsx";
import RaiseDispute from "../Pages/RaiseDispute/RaiseDispute.jsx";
import AboutMarketplace from "../Pages/Marketplace/AboutMarketplace.jsx";

export default function PAGES() {
  return {
    PRIVATE_PAGES: [
      { path: Path?.PROFILE, element: <Profile /> },
      { path: Path?.CREATEMARKET, element: <CreateMarket /> },
      { path: Path?.RAISEDISPUTE, element: <RaiseDispute /> },
      {
        path: Path?.ABOUTMARKETPLACE + ":betOn/:eventId",
        element: <AboutMarketplace />,
      },
    ],
    PUBLIC_PAGES: [
      { path: Path?.HOME, element: <Home /> },
      { path: Path?.ABOUT, element: <About /> },
      { path: Path?.MARKETPLACE, element: <Marketplace /> },
      { path: Path?.ACTIVITY, element: <Activity /> },
      { path: Path?.CONTACTUS, element: <ContactUs /> },
    ],
  };
}
