import { createContext, useContext, useEffect, useState } from "react";

/**
 * Context for storing logged-in state.
 */
export const MyLoggedInContext = createContext();

/**
 * Provider for managing logged-in state.
 *
 * @param {object} props - Provider props.
 * @param {ReactNode} props.children - Child components.
 */
export const LoggedInProvider = ({ children }) => {
  const [loggedInValue, setLoggedInValue] = useState("");
  const address = sessionStorage.getItem("isLogged");

  useEffect(() => {
    if (address?.length) {
      setLoggedInValue(address);
    }
  }, [address]);

  return (
    <MyLoggedInContext.Provider value={{ loggedInValue, setLoggedInValue }}>
      {children}
    </MyLoggedInContext.Provider>
  );
};

/**
 * Hook for accessing logged-in state.
 *
 * @returns {object} - Logged-in state and setter.
 * @returns {string} loggedInValue - Current logged-in value.
 * @returns {function} setLoggedInValue - Setter for logged-in value.
 */
export const useIsLoggedIn = () => useContext(MyLoggedInContext);
