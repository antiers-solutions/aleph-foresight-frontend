import {
  AutoTransmision,
  BatchPrediction,
  Diversity,
  GroupUser,
  MinusBlack,
  PlusWhite,
} from "../../assets/StoreAsset/StoreAsset";

const floorValue = (value) => Math.floor(value || 0);

export const initialMetricsData = (user, volume, events, amount) => [
  { label: "Total Users", value: floorValue(user) || 0, key: "users" },
  { label: "Volume", value: volume || 0, key: "volume" },
  { label: "Events Created", value: floorValue(events) || 0, key: "events" },
  // { label: "Amount Staked", value: floorValue(amount) || 0, key: "amount" },
];

export const text = `
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet
`;

export const customExpandIcon = ({ isActive }) => (
  <span>{isActive ? <MinusBlack /> : <PlusWhite />}</span>
);

export const faqData = [
  {
    title: "How do I start betting?",
    key: "1",
    text: "Simply connect your MetaMask wallet and deposit Azero tokens to begin betting on your chosen events.",
  },
  {
    title: "Is my money safe on your platform?",
    key: "2",
    text: "Absolutely. Our blockchain technology ensures all transactions are secure and transparent, maintaining high safety standards.",
  },
  {
    title: "Can I withdraw my bet if I change my mind?",
    key: "3",
    text: "Yes, withdrawals are possible until betting closes, provided that no opposing bets have been placed.",
  },
  {
    title: "What happens if there is a dispute?",
    key: "4",
    text: "Disputes are handled through our decentralized arbitration system, where community members partake in resolving issues fairly and transparently.",
  },
];

export const howItWorksData = [
  {
    icon: <Diversity />,
    title: "Dynamic Odds",
    description:
      "Our platform dynamically adjusts odds based on how bets are placed, ensuring transparency and fairness in payouts.",
  },
  {
    icon: <GroupUser />,
    title: "User-Created Events",
    description:
      "Empower users to shape the betting landscape by creating their own events, adding variety and depth to available betting options.",
  },
  {
    icon: <BatchPrediction />,
    title: "Blockchain Security",
    description:
      "Every bet and transaction is recorded on the blockchain, guaranteeing security and the ability to audit results independently.",
  },
  {
    icon: <AutoTransmision />,
    title: "Dispute Resolution",
    description:
      "Rely on community-driven processes for resolving disputes, which underscore our commitment to fairness and integrity.",
  },
];
