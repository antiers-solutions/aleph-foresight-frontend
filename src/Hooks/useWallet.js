/**
 * Custom hook to handle wallet-related functionality.
 *
 * @returns {Object} An object containing the `isDisabled` state and the `addNetwork` function.
 *
 */
import { useState } from "react";
import { message } from "antd";
import { BrowserProvider } from "ethers";
import { useNavigate } from "react-router-dom";
import { apiUrls } from "../api/apiUrls";
import UseGetApi from "../api/makeRequest";
import { contractMethods, env, msgs } from "../utils/appConstants";
import Path from "../Routing/Constant/RoutePaths";
import { useIsLoggedIn } from "../context/useLoggedIn";
import { setLoggedIn } from "../utils/helpers/walletHelpers";
import useGetProfile from "./useGetProfile";
import { contractEvents } from "../utils/helpers/contractHelpers";

const useWallet = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const { setLoggedInValue } = useIsLoggedIn();
  const { getProfileDetails } = useGetProfile();

  /**
   * Gets the provider instance for the given web provider and address.
   *
   * @param {Object} webProvider The web provider instance.
   * @param {string} address The wallet address.
   * @returns {Promise<Object>} A promise resolving to the payload.
   *
   */
  const getProvider = async (webProvider, address) => {
    try {
      const providers = new BrowserProvider(webProvider);
      const payload = await openSignModal(providers, address);
      return payload;
    } catch (error) {
      console.error({ error });
    }
  };

  /**
   * Adds the network to the wallet.
   *
   * @returns {Promise<void>} A promise resolving when the network is added.
   *
   */
  const addNetwork = async () => {
    try {
      const provider = window.ethereum;
      if (provider) {
        const address = window.ethereum.selectedAddress;
        const chainId = await provider.request({ method: "eth_chainId" });
        const targetChainId = env.chainId;

        if (!chainId) {
          return message.info(msgs.Retrive_Meta_Account);
        }
        switch (chainId) {
          case targetChainId:
            return await getProvider(provider, address); // Use provider directly
          default:
            try {
              await provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: targetChainId }],
              });
              return await getProvider(provider, address);
            } catch (switchError) {
              if (switchError.code === 4902) {
                try {
                  await provider.request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainId: targetChainId, //chain id in hex
                        chainName: env.name, //name of chain
                        rpcUrls: [env.rpcUrl], //rpc url of chain, can add multiple, it supports https
                        blockExplorerUrls: [
                          env.txnExplorerUrl, //url to navigate on a platform where user can cross check its' tx
                        ],
                        nativeCurrency: {
                          name: env.currency, //currency name
                          symbol: env.currency, //currency symbol
                          decimals: 18, //decimal value of currency
                        },
                      },
                    ],
                  });
                  return await getProvider(provider, address);
                } catch (error) {
                  console.error(error);
                  message.error(`${msgs.Network_Add_Error}, ${error?.message}`);
                }
              }
            }
            break;
        }
      } else {
        message.info("Please install Metamask");
      }
    } catch (error) {
      console.error(error);
      message.error(error?.message);
    }
  };

  /**
   * Opens the sign modal for the given provider and address.
   *
   * @param {Object} provider The provider instance.
   * @param {string} address The wallet address.
   * @returns {Promise<Object>} A promise resolving to the payload.
   *
   */
  const openSignModal = async (provider, address) => {
    try {
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(
        address ? address : signer?.address
      );
      const adminAddress = await contractEvents({
        eventName: contractMethods.adminAddress,
      });

      if (adminAddress?.toLowerCase() === signer?.address?.toLowerCase())
        return message.error(msgs.wrongUser);

      setIsDisabled(true);
      return await verifySignMessage(
        signature,
        address ? address : signer?.address
      );
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Verifies the sign message for the given signature and address.
   *
   * @param {string} signature The signature.
   * @param {string} address The wallet address.
   * @returns {Promise<Object>} A promise resolving to the response.
   *
   */
  const verifySignMessage = async (signature, address) => {
    try {
      const response = await UseGetApi(apiUrls.connectWallet(), "post", {
        wallet_address: address,
        signature_key: signature,
      });
      if (address && response?.data?.data?.wallet_address) {
        setLoggedIn(address);
        setLoggedInValue(address);
        navigate(Path?.HOME);
        await getProfileDetails();
        return response;
      }
    } catch (error) {
      return message.error("Wrong Wallet Address");
    } finally {
      setIsDisabled(false);
    }
  };

  return {
    isDisabled,
    addNetwork,
  };
};

export default useWallet;
