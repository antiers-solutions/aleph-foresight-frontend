import { web3 } from "./contractHelpers";

/**
 * Sets the logged-in address in session storage.
 *
 * @param {string} address - The Ethereum address to set as logged-in.
 *
 */
export const setLoggedIn = (address) => {
  sessionStorage.setItem("isLogged", address);
};

/**
 * Checks if a user is logged-in by retrieving the logged-in address from session storage.
 *
 * @returns {string|false} The logged-in Ethereum address, or false if not logged-in.
 *
 */
export const isLoggedIn = () => sessionStorage.getItem("isLogged") || false;

/**
 * Initiates a connection to the user's Ethereum wallet using MetaMask.
 *
 * @returns {Promise<string>} A promise resolving to the user's Ethereum address.
 *
 */
export const connectWalletHandler = async () => {
  try {
    const fromAddress = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let address_from_metamask = fromAddress[0];
    return address_from_metamask;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Waits for a transaction receipt to be available on the Ethereum blockchain.
 *
 * @param {string} transactionHash - The hash of the transaction to wait for.
 * @returns {Promise<object>} A promise resolving to the transaction receipt.
 *
 */
export const waitForReceipt = async (transactionHash) => {
  try {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const receipt = await window.ethereum.request({
            method: "eth_getTransactionReceipt",
            params: [transactionHash],
          });
          if (receipt) {
            clearInterval(interval);
            resolve(receipt);
          }
        } catch (error) {
          clearInterval(interval);
          reject(error);
        }
      }, 1000);
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Retrieves the balance of the logged-in Ethereum wallet.
 *
 * @returns {Promise<string>} A promise resolving to the wallet balance in wei.
 *
 */
export const getWalletBalance = async () => {
  try {
    if (!isLoggedIn()) return 0;
    const balance = web3.eth.getBalance(isLoggedIn());
    return balance;
  } catch (error) {
    console.error(error);
  }
};
