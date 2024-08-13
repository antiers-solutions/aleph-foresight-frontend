/**
 * Context Provider for the application.
 *
 * This provider wraps the entire application and provides a centralized store for state management.
 * It utilizes React's Context API to share data between components without passing props down manually.
 *
 * @param {Node} props.children - The child components to be wrapped by the provider.
 *
 */
import React, { createContext, useState } from "react";
import { useGetCoins } from "../../Hooks/useGetCoins";
import ProfileImg from "../../../src/assets/BlueLogo.svg";
const Context = createContext();

const ContextProvider = ({ children }) => {
  /**
   * Fetches the coin list and URL from the useGetCoins hook.
   */
  const { coinList, coinUrl, isLoading } = useGetCoins();

  /**
   * State variables for the application.
   */
  const [searched, setSearch] = useState("");
  const [searchedOnHome, setSearchHome] = useState("");
  const [fetchProfileCardData, setFetchProfileCardData] = useState(false);
  const [filter, setFilter] = useState("volume");
  const [eventId, setEventId] = useState(null);
  const [paramsVal, setParams] = useState(null);
  const [profileDetails, setProfile] = useState({
    img: ProfileImg,
    name: null,
    ensId: null,
  });
  const [totalEvents, setTotalEvents] = useState(0);
  const [profileTab, setProfileTab] = useState(null);
  const [fullPageLoading, setLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState(null);
  const [fetchBalance, setFetchBalance] = useState(false);
  const [connectWallet, setConnectWallet] = useState(false);
  /**
   * Returns the Context Provider component with the state variables and functions.
   */
  return (
    <Context.Provider
      value={{
        searchedOnHome,
        setSearchHome,
        fetchProfileCardData,
        setFetchProfileCardData,
        eventDetails,
        setEventDetails,
        profileTab,
        setProfileTab,
        fetchBalance,
        setFetchBalance,
        paramsVal,
        setParams,
        connectWallet,
        setConnectWallet,
        eventId,
        setEventId,
        setFilter,
        filter,
        profileDetails,
        setProfile,
        coinList,
        coinUrl,
        isLoading,
        fullPageLoading,
        setLoading,
        setSearch,
        searched,
        setTotalEvents,
        totalEvents,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
