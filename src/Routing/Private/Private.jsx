/**
 * Private component to handle private routes.
 *
 * This component checks if the route is private and if the user is logged in.
 * If the route is private and the user is not logged in, it redirects to the home page.
 *
 *
 * @param {Boolean} props.isPrivate - Whether the route is private or not.
 *
 * @returns {JSX.Element} - The DashboardLayout component or a Navigate component to the home page.
 *
 */
import React from "react";
import { Navigate } from "react-router-dom";
import Path from "../Constant/RoutePaths";
import { isLoggedIn } from "../../utils/helpers/walletHelpers";
import DashboardLayout from "../../Common/Layouts/DashboardLayout/DashboardLayout";

const Private = ({ isPrivate }) => {
  if (isPrivate) {
    if (isLoggedIn()) return <DashboardLayout />;
    else return <Navigate to={Path?.HOME} replace />;
  } else {
    return <DashboardLayout />;
  }
};

export default Private;
