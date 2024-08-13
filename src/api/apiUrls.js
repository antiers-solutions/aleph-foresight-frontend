import { constructQueryString } from "../utils/helpers/commonHelper";

export const apiUrls = {
  logout: () => "/api/user/logout",
  checkSession: () => "/api/user/me",
  totalUser: () => "/api/user/getTotalUser",
  getCoins: () => "/api/currency/getTopMarket",
  totalVolume: () => "/api/user/getTotalVolume",
  raiseDispute: () => "/api/dispute/raiseDispute",
  connectWallet: () => "/api/user/connect-wallet",
  profileUpload: () => "/api/user/upload-profile",
  getIpfsUrl: () => "/api/contract/createIpfsUrl",
  totalTraded: () => "/api/contract/totalTraded",
  volumeTraded: () => "/api/contract/volumeTraded",
  netPositions: () => "/api/contract/netPosition",
  getPlatformFees: () => "/api/contract/platFormFee",
  amountInvested: () => "/api/contract/amountInvested",
  disputeEvents: () => "/api/dispute/getDisputeEvent",
  totalEvents: () => "/api/user/getTotalEvents",
  getProfile: (params) =>
    `/api/user/get-profile${constructQueryString(params)}`,
  getEvents: (params) =>
    `/api/contract/getEvents${constructQueryString(params)}`,
  getActivities: (params) =>
    `/api/contract/getOrder${constructQueryString(params)}`,
  getDisputeList: (params) =>
    `/api/dispute/getDispute${constructQueryString(params)}`,
  createdEventsOfCurrentUser: (params) =>
    `/api/contract/getUserEvent${constructQueryString(params)}`,
  getBetsOfParticularEventOfCurrentUser: (params) =>
    `/api/contract/getOnEventsBet${constructQueryString(params)}`,
  getEventDetails: (params) =>
    `/api/contract/getEventDetails${constructQueryString(params)}`,
  getClosedOpenPosition: (params) =>
    `/api/contract/getClosedPosition${constructQueryString(params)}`,
  getPayout: (params) => `/api/contract/payout${constructQueryString(params)}`,
};
