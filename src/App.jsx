/**
 * The main App component that sets up the React Router and handles wallet events.
 *
 * @returns {JSX.Element} The App component.
 *
 */
import { useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import "./index.scss";
import routes from "./Routing/Routes";
import "../src/Common/Header/Header.scss";
import { useIsLoggedIn } from "./context/useLoggedIn";
import { isLoggedIn } from "./utils/helpers/walletHelpers";
import { handleLogout } from "./Common/Header/header.helper";
import { Context } from "./Pages/ContextProvider/ContextProvider";

const App = () => {
  const provider = window.ethereum;
  const { setLoading } = useContext(Context);
  const { loggedInValue, setLoggedInValue } = useIsLoggedIn();
  const address = isLoggedIn();

  /**
   * Handles changes to the wallet accounts.
   *
   * @param {string[]} accounts - The new accounts.
   */
  const handleAccountsChanged = async (accounts) => {
      if (accounts[0] && (loggedInValue?.length || address)) {
        setLoggedInValue("");
        setLoading(true);
        await handleLogout();
        setLoading(false);
      }
  };

  /**
   * Handles changes to the wallet network.
   *
   * @param {number} networkId - The new network ID.
   */
  const handleNetworkChanged = async (networkId) => {
    if (networkId && (loggedInValue?.length || address)) {
      setLoggedInValue("");
      setLoading(true);
      await handleLogout();
      setLoading(false);
    }
  };

  /**
   * Sets up event listeners for wallet events.
   */
  useEffect(() => {
    if (provider) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleNetworkChanged);

      return () => {
        window.ethereum.off("accountsChanged", handleAccountsChanged);
        window.ethereum.off("chainChanged", handleNetworkChanged);
      };
    }
  }, [provider, loggedInValue, address]);

  const router = createBrowserRouter(routes);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
