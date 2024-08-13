/**
 * DashboardLayout component that wraps the entire dashboard with a header, footer, and a spinning loader.
 *
 * @description This component uses the `ErrorBoundary` component to catch and handle any errors that occur within the dashboard.
 * It also uses the `Context` from the `ContextProvider` to get the `fullPageLoading` state, which determines whether to display the spinning loader.
 *
 */
import React from 'react'
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.scss";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import { Context } from "../../../Pages/ContextProvider/ContextProvider";

function DashboardLayout() {
  const { fullPageLoading } = useContext(Context);
  return (
    <ErrorBoundary>
      <div className="dashLayout ">
        <Header />
        <div className="dashLayout_container">
          <div className="dashLayout_body ">
              <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default DashboardLayout;
