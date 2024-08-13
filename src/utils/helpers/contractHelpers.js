/**
 * Web3 provider and contract interaction module.
 *
 * This module sets up a Web3 provider with a WebSocket connection and provides
 * functions to interact with a smart contract.
 *
 * @module web3Contract
 *
 */
import Web3 from "web3";
import * as contractAbi from "../contractabi.ts";
import { contractMethods, env } from "../appConstants.js";
import { connectWalletHandler, waitForReceipt } from "./walletHelpers.js";

/**
 * WebSocket provider for Web3.
 *
 * @type {Web3.providers.WebsocketProvider}
 */

export const wsProvider = new Web3(
  new Web3.providers.HttpProvider(
    env?.walletSocketUrl,
    {},
    {
      reconnect: {
        auto: true, // Enable auto reconnection
        delay: 5000, // Delay between reconnection attempts (in ms)
        maxAttempts: 5, // Maximum number of reconnection attempts
        onTimeout: false, // Disable reconnection on connection timeout
      },
    }
  )
);

wsProvider.on("error", (error) => {
  console.error(error);
});

/**
 * Web3 instance with the WebSocket provider.
 *
 * @type {Web3}
 */
export const web3 = new Web3(wsProvider);

const contractAddress = env?.contractAddress;
const contract = new web3.eth.Contract(contractAbi, contractAddress);

/**
 * Base event structure for contract interactions.
 *
 * This function provides a basic structure for interacting with the contract.
 * It handles errors, gas estimates, and transaction data encoding.
 *
 * @async
 * @param {object} params - Event parameters.
 * @param {string} params.eventName - Name of the event.
 * @param {object} params.data - Event data.
 * @returns {Promise<any>} - Promise resolving to the transaction result or contract data.
 */
const baseEventStructure = async ({ eventName, data }) => {
  try {
    const eventId = data?.eventId;
    const address = await connectWalletHandler();
    const contractAddress = env?.contractAddress;

    const gasPrice = await web3?.eth?.getGasPrice();
    const nonce = await web3?.eth?.getTransactionCount(address);
    const betAmount = data?.amount
      ? Number(data?.amount * Math.pow(10, 18))
      : null;
    const onlyReturnTxObjects = [
      "edit_expiration_time_event",
      "register_event",
      "bet_event",
      "withdraw_bet_event",
      "claim_reward_event",
    ];
    let txObject = null;

    switch (eventName) {
      case "edit_expiration_time_event":
        txObject = await contract?.methods[eventName](
          eventId,
          data?.expiryTime,
          data?.priceLevel
        );
        break;
      case "register_event":
        txObject = await contract?.methods[eventName](
          eventId,
          data?.expiryTime
        );
        break;
      case "bet_event":
        txObject = await contract?.methods[eventName](
          eventId,
          data?.betOn,
          betAmount
        );
        break;
      case "read_response_event":
        txObject = await contract?.methods[eventName](eventId, address).call();
        break;
      case "get_platform_fee_event":
      case "read_pool_amount_event":
      case "current_odds_event":
        txObject = await contract?.methods[eventName](eventId).call();
        break;
      case "read_admin_address":
      case "get_platform_fee":
      // about marketplace
      case "get_creation_fee":
        txObject = await contract?.methods[eventName]().call();
        break;
      case "withdraw_bet_event":
      case "claim_reward_event":
        txObject = await contract?.methods[eventName](eventId);
        break;
      default:
        break;
    }

    if (!onlyReturnTxObjects.includes(eventName)) return txObject;

    const gasEstimate = await txObject?.estimateGas({ from: address });

    const txdata = {
      from: address,
      to: contractAddress,
      gas: web3?.utils?.toHex(gasEstimate),
      gasPrice: web3?.utils?.toHex(gasPrice),
      nonce: web3?.utils?.toHex(nonce),
      data: txObject?.encodeABI(),
      value: data?.amount
        ? parseInt(web3?.utils?.toWei(data?.amount, "ether")).toString(16)
        : undefined,
    };

    const res = await window?.ethereum?.request({
      method: "eth_sendTransaction",
      params: [txdata],
    });

    await waitForReceipt(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Returns a structured event object based on the provided event name and data.
 *
 * @param {Object} params - Event parameters.
 * @param {string} params.eventName - Name of the event.
 * @param {number} [params.expiryTime] - Expiry time of the event.
 * @param {string} [params.betOn] - Bet type (e.g., "yes" or "no").
 * @param {number} [params.amount] - Bet amount.
 * @param {string} params.eventId - Unique event ID.
 * @returns {Object} Structured event object.
 *
 */
export const contractEvents = ({
  eventName,
  expiryTime,
  betOn,
  amount,
  eventId,
  priceLevel,
}) => {
  try {
    switch (eventName) {
      case contractMethods.adminAddress:
        return baseEventStructure({
          eventName,
          data: null,
        });
      case contractMethods.editEvent:
        return baseEventStructure({
          eventName: eventName + "_event",
          data: { eventId, expiryTime, priceLevel },
        });
      case contractMethods.register:
        return baseEventStructure({
          eventName: eventName + "_event",
          data: { eventId, expiryTime },
        });
      case contractMethods.bet:
        return baseEventStructure({
          eventName: eventName + "_event",
          data: { eventId, betOn, amount },
        });
      case contractMethods.poolAmount:
        return baseEventStructure({
          eventName: "read_pool_amount_event",
          data: { eventId },
        });
      case contractMethods.oddEven:
        return baseEventStructure({
          eventName: "current_odds_event",
          data: { eventId },
        });
      case contractMethods.platFormFee:
        return baseEventStructure({
          eventName: "get_platform_fee" + "_event",
          data: { eventId },
        });
      case contractMethods.platFormFeePreview:
        return baseEventStructure({
          eventName: "get_platform_fee",
          data: null,
        });
      case contractMethods.rewardFee:
        return baseEventStructure({
          eventName: "get_creation_fee",
          data: null,
        });
      case contractMethods.claim:
        return baseEventStructure({
          eventName: eventName + "_event",
          data: { eventId },
        });
      case contractMethods.withdraw:
        return baseEventStructure({
          eventName: eventName + "_event",
          data: { eventId },
        });
      case contractMethods.getUserBets:
        return baseEventStructure({
          eventName: eventName + "_event",
          data: { eventId },
        });
      default:
        break;
    }
  } catch (error) {}
};
