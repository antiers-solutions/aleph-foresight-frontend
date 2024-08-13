/**
 * Constants and utility functions for the application.
 * @module constants
 *
 */
import React from "react";
import { Link } from "react-router-dom";
import Path from "../Routing/Constant/RoutePaths";
import {
  Home,
  Activity,
  CopyIcon,
  Marketplace,
  Points,
} from "../assets/StoreAsset/StoreAsset";
import { copyToClipBoard, truncateText } from "./helpers/commonHelper";

export const minBetAmount = 10;
export const claimStatus = 4;
// export const maxEditHours = 2;
export const maxEditMins = 120000; // 2 mins 120000
export const maxBetAmount = 50000;
export const antdPopupConstant = "error";
export const antdPopupCoppyConstant = "copied";

/**
 * Environment variables.
 */
export const env = {
  baseUrl: process.env.REACT_APP_API_BASE_URL_STAGE,
  projectId: process.env.REACT_APP_PROJECT_ID,
  webUrl: process.env.REACT_APP_WEBSITE_URL,
  appName: process.env.REACT_APP_NAME,
  appDesc: process.env.REACT_APP_DESCRIPTION,
  contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
  walletSocketUrl: process.env.REACT_APP_WALLET_EVENT_SOCKET_URL,
  chainId: process.env.REACT_APP_CHAINID,
  name: process.env.REACT_APP_NAME,
  currency: process.env.REACT_APP_CURRENCY,
  explorerUrl: process.env.REACT_APP_TXN_EXPLORER_URL,
  rpcUrl: process.env.REACT_APP_RPC_URL,
  txnExplorerUrl: process.env.REACT_APP_TXN_EXPLORER_URL,
  precision: process.env.REACT_APP_TO_PRECISION,
  ipfs: process.env.REACT_APP_IPFS,
  ipfsBackend: process.env.REACT_APP_IPFS_BACKEND,
  twitter: process.env.REACT_APP_TWITTER,
  telegram: process.env.REACT_APP_TELEGRAM,
};

/**
 * Wallet constants.
 */
export const wallet = {
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
  iconUrl: "https://avatars.mywebsite.com/",
};

/**
 * Messages constants used throughout the application.
 */
export const msgs = {
  wrongUser:
    "This user doesn't have access to this website",
  claimDetails: "Claim Details",
  commingSoon: "Coming Soon",
  fundsAvailable: "Funds Available",
  user: "User",
  username: "Username",
  saveChanges: "Save Changes",
  alephId: "Aleph ID",
  enterAlephId: "Enter Aleph ID",
  enterName: "Enter Username",
  profileSettings: "Profile Settings",
  edit: "Edit",
  toolTip: {
    reward:
      "Earn some %age share of platform fees as a reward for creating the market.",
    platformFee: "Ensures that platform remains operational and updated.",
  },
  event: "Event",
  evidenceDetails: "Evidence Details",
  payout: "Payout",
  volume: "Volume",
  connectionRequest: "Please connect to your wallet in order to proceed.",
  done: "Done",
  bettingCrypto: "Betting Crypto",
  priceLevel: "Price Level",
  connect: "Connect Wallet",
  disputeDetails: "Dispute Details",
  max: "Max",
  betSlip: "Bet Slip",
  faultImg: "Please upload image of size less than 5MB.",
  pleaseEnterValid: "Please enter valid",
  pleaseEnter: "Please enter ",
  pleaseUpload: "Please upload ",
  pleaseSelect: "Please select ",
  min3: "minimum 3 charchters.",
  max50: "maximum 50 charchters.",
  max15: "maximum 15 charchters.",
  min50: "minimum 50 charchters.",
  min100: "minimum 100 charchters.",
  max300: "maximum 300 charchters.",
  supportedFormat: "Supported formats: PNG, JPEG | SIZE: 5 mb",
  connectWallet: "Please connect to your wallet first.",
  areYouSure: "Are You Sure?",
  copied: "Copied Successfully!",
  initiateDispute: "You wish to initiate the dispute",
  disputeSuccess: "Successfully Dispute Raised!",
  disputeSubmitted: "Your dispute has been submitted successfully",
  initiateClaim: "You wish to initiate the claim for your winnings",
  successfullyClaimedDesc: "Your winnings has been claimed successfully",
  initiateWithdraw: "You wish to initiate the withdrawal of your funds",
  withdrawSuccessDesc: "The withdrawal has been completed successfully",
  loadMore: "Load More",
  grossWinnings: "Gross Winnings",
  eventsEnded: "Event Ended:",
  bet: "Bet",
  betBigText: {
    question: "Predict the Next Move",
    answer: "Bet and Win Big!",
  },
  logout: {
    header: "Logout Account?",
    desc: "Are you sure you want to logout?",
    logoutmsg: "Logged out successfully",
  },
  publish: "Publish",
  balance: "Balance",
  successful: "Success",
  selectCategory: "Select Category",
  selectEvent: "Select Event",
  eventPublished: "Your event has been published successfully",
  bettingClosureTime: "Betting Closure Time",
  bettingClosureDate: "Betting Closure Date & Time",
  selectDate: "Select Date & Time",
  dateAndTime: "Date & Time",
  preview: "Preview",
  action: "Action",
  amount: "Amount",
  verdict: "Verdict",
  pending: "Pending",
  date: "Date",
  targetDateTime: "Target Date & Time",
  eventDuration: "Event Duration",
  eventDays: "Enter Days",
  chooseCrypto: "Choose Crypto",
  selectCoin: "Select Crypto",
  createMarket: "Create Market",
  enterPrice: "Enter Price",
  enterAmount: "Enter Amount",
  back: "Back",
  azero: "AZERO",
  yes: "Yes",
  no: "No",
  usdt: "USDT",
  aboutTheEvent: "About The Event",
  thisMarketResolveTo: `This market will resolve to "Yes" if the CoinMarketCap 1 minute
  candle for`,
  hasFinalClosePrice: ` in the UTC has a final “Close” price of`,
  orWillResolveToNo: `or higher.
  Otherwise, this market will resolve to "No".`,
  priceAccToMarket: `Please note that this market is about the price according to
  CoinMarketCap`,
  notAccToOtherMarket: `, not according to other
  sources or spot markets.`,
  startDate: "Start Date & Time",
  bettingClosureTime: "Betting Closure Date & Time",
  endDate: "End Date & Time",
  sourceOfTruth: "Source Of Truth",
  resolutionSource: "Resolution Source",
  market: "Market",
  event: "Events",
  txnHash: "Txn Hash",
  top: "Top",
  noOfBets: "No of Bets",
  createdOn: "Created On",
  toMarkets: "Top Markets",
  allEventsTimeZone: "All the Events are in IST Time Zone",
  topEvents: "Top Events",
  amountInvested: "Amount Invested",
  events: "Events",
  viewAll: "View All",
  recentActivity: "Recent Activity",
  toBePriceAt: ` to be priced at `,
  usdtOrMore: `USDT or more as on`,
  walletAddress: "Wallet Address",
  currentPrice: `Current Price`,
  raiseDispute: "Raise Dispute",
  chooseEvent: "Choose The Event",
  category: "Category",
  chooseCategory: "Choose Category",
  enterEmail: "Enter Email",
  emailAddress: "Email Address",
  claimDecision: "Claim Decision",
  fullName: "Full Name",
  msg: "Message",
  accepted: "Accepted",
  evidenceUploaded: "Evidence Uploaded (IPFS)",
  contactUs: "Contact Us",
  uploaded: "Uploaded",
  writeHere: "Write Here",
  description: "Description",
  enterDescription: "Enter Description",
  upload: "Upload",
  eventName: "Event Name",
  send: "Send",
  eventRaised: "Event Raised Date",
  eventSettleMent: "Event Settlement Date",
  betDate: "Bet Date",
  betAmount: "Bet Amount",
  settledPosition: "Settled Position",
  settledAs: "Settled As",
  editProfile: "Edit Profile",
  openPosition: "Open Positions",
  closePosition: "Closed Positions",
  acitvity: "Activity",
  positions: "Positions",
  status: "Status",
  eventsCreated: "Events Created",
  myDisputes: "My Disputes",
  errorPage: {
    header: "Oops! Unexpected error",
    sorry: "Oops! Sorry",
    desc: "Something went wrong...",
    error: "An error occured.",
    pageNotFound: "Page Not Found",
  },
  type: "Type",
  reload: "Reload",
  claim: "Claim",
  goToHome: "Back To Home",
  searchMarket: "Search By Coin Name / Symbol",
  betConfirmed: "Your bet has been placed and confirmed successfully",
  withdraw: "Withdraw",
  platformFee: "Platform Fee ",
  netWinnings: "Net Winnings",
  totalAmount: "Total Amount",
  yourShare: "Your Share",
  rewards: "Rewards",
  buy: "Buy",
  day: "Day",
  hour: "Hour",
  previewEvent: "Preview Your Event",
  eventClosed: "Event Closed",
  Retrive_Meta_Account: `Cannot retrieve any account. Please refresh the browser`,
  Network_Add_Error: `Error adding ${env.chainName} network: `,
  about: {
    forecasting: "Improved Forecasting",
    problem: "Problem",
    solution: "The Solution",
    intro: "Introduction",
    keyFeatures: "Key Features",
    metrics: "Metrics",
    faq: "FAQ's",
  },
};

/**
 * An object containing constants used throughout the application.
 *
 * @constant
 * @type {Object}
 */
export const values = {
  imgFileTypes: [".jpg", ".jpeg", ".png"],
};

/**
 * A collection of dropdown options for various tabs and categories.
 */
export const dropDownOptions = {
  myDisputeTab: [
    {
      value: "All",
      label: "All",
    },
    {
      value: "open",
      label: "Open",
    },
    {
      value: "closed",
      label: "Closed",
    },
  ],
  activityTab: [
    {
      value: "All",
      label: "All",
    },
    {
      value: "yes",
      label: "Yes",
    },
    {
      value: "no",
      label: "No",
    },
    {
      value: "claimed",
      label: "Claimed",
    },
    {
      value: "withdraw",
      label: "Withdrawn",
    },
  ],
  marketStatus: [
    {
      value: "volume",
      label: "Highest Volume",
    },
    {
      value: "newlyAdded",
      label: "Newly Added",
    },

    {
      value: "closingSoon",
      label: "Closing Soon",
    },
  ],
  raisedDisputeCategory: [
    {
      value: "Event outcome",
      label: "Event outcome",
    },
    {
      value: "Wrong settlement",
      label: "Wrong settlement",
    },
    {
      value: "Other",
      label: "Other",
    },
  ],
};

/**
 * Regular expression checks for various input fields.
 */
export const regexChecks = {
  name: /^[a-zA-Z0-9]*$/,
  email: /^(([\w-]+\.[\w-]+)|([\w-]+))@([\w-]+\.)+[\w-]{2,4}$/,
  betAmount: /^$|^(([1-9]?\d{0,5}|1000000)(\.\d{0,7})?|([0]\.\d{1,7}))$/,
};

/**
 * Returns an array of menu options for the widget menu.
 */
export const widgetMenuOptions = (userDetails) => [
  {
    key: "user",
    label: (
      <div className="profileAddress">
        <img src={userDetails?.img} alt="profile" />
        <div className="address">
          <h1>
            {userDetails?.name || truncateText(userDetails?.walletAddress)}
          </h1>
          {/* enable it later */}
          {/* {userDetails?.ensId ? (
            <p>
              <span>{userDetails?.ensId}</span>
              <span
                onClick={() => {
                  copyToClipBoard(userDetails?.ensId);
                }}
              >
                <CopyIcon />{" "}
              </span>
            </p>
          ) : null} */}
        </div>
      </div>
    ),
  },
  {
    key: "profile",
    label: <Link to={Path?.PROFILE}>Profile </Link>,
  },
  // In progress , in future enable it
  // {
  //   key: "raiseDispute",
  //   label: <Link to={Path?.RAISEDISPUTE}>Raise Dispute </Link>,
  // },
  // {
  //   key: "arbCommittee",
  //   label: <Link to="#">Arbitration Committee </Link>,
  // },
  {
    key: "logout",
    label: <Link to="#">Logout </Link>,
  },
];

/**
 * Array of characters that prevent input from being a valid number.
 * These characters are typically used in scientific notation or to indicate a negative number,
 * but in certain contexts, they may not be desirable.
 *
 */
export const numberPrevents = ["e", "-", "+"];
export const keysAllowed = ["Backspace", "ArrowRight", "ArrowLeft"];

/**
 * Data for the header menu, defining the icons, labels, and routes for each item.
 *
 * @type {Array<{ icon: JSX.Element, label: string, to?: string }>}
 *
 */
export const headerMenuData = [
  { icon: <Home />, label: "Home", to: Path?.HOME },
  { icon: <Marketplace />, label: "Marketplace", to: Path?.MARKETPLACE },
  { icon: <Activity />, label: "Activity", to: Path?.ACTIVITY },
  {
    icon: <Points />,
    label: "Points",
  },
];

/**
 * Date format constants.
 *
 * These constants define different date formats used throughout the application.
 *
 * @constant
 * @type {Object}
 */
export const dateFormat = {
  five: "YYYY-MM-DD | HH:mm", // default
  calendar: "YYYY-MM-DD | HH:00",
};

/**
 * An array of publicly accessible page paths.
 *
 * This array contains the paths of pages that do not require authentication or authorization to access.
 */
export const publicPages = [
  Path?.HOME,
  Path?.ABOUT,
  Path?.MARKETPLACE,
  Path?.ACTIVITY,
  Path?.CONTACTUS,
];

/**
 * Enum of contract methods for interacting with the smart contract.
 *
 * @enum {string}
 */
export const contractMethods = {
  adminAddress: "read_admin_address",
  getUserBets: "read_response",
  editEvent: "edit_expiration_time",
  register: "register",
  bet: "bet",
  poolAmount: "readPoolAmount",
  oddEven: "getOddEven",
  platFormFee: "getPlatFormFee",
  platFormFeePreview: "getPlatFormFeePreview",
  rewardFee: "rewardFee",
  claim: "claim_reward",
  withdraw: "withdraw_bet",
};
