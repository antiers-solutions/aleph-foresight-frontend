/**
 * Main entry point of the React application.
 *
 * This script renders the App component wrapped in the ContextProvider and LoggedInProvider.
 *
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { LoggedInProvider } from "./context/useLoggedIn";
import { ContextProvider } from "./Pages/ContextProvider/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <LoggedInProvider>
      <App />
    </LoggedInProvider>
  </ContextProvider>
);

reportWebVitals();
