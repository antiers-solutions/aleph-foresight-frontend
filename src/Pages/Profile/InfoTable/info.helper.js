import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import EventsCreated from "./EventsCreated";
import ActivityProfile from "./ActivityProfile";
import ClosedPositions from "./ClosedPositions";
import OpenPositionProfile from "./OpenPositionProfile";
import { env, msgs } from "../../../utils/appConstants";
import {
  formatNumber,
  getIpfs,
  globalTimeFormat,
  truncateText,
} from "../../../utils/helpers/commonHelper";
import Question from "../../../Common/Question/Question";
import { betOn } from "../../Marketplace/marketPlace.helper";
import { EditIcon } from "../../../assets/StoreAsset/StoreAsset";

// Function to generate tab items dynamically based on active tab key
export const tabItems = () => [
  {
    key: "1",
    label: msgs.openPosition,
    children: <OpenPositionProfile />,
  },
  {
    key: "2",
    label: msgs.closePosition,
    children: <ClosedPositions />,
  },
  {
    key: "3",
    label: msgs.acitvity,
    children: <ActivityProfile />,
  },
  {
    key: "4",
    label: msgs.eventsCreated,
    children: <EventsCreated />,
  },
  // In progress , in future enable it
  // {
  //   key: "5",
  //   label: msgs.myDisputes,
  //   children: <Mydisputes />,
  // },
];

// Columns configuration for the Activity Profile table
export const activityProfileColumns = [
  {
    title: msgs.event,
    dataIndex: "market",
    key: "market",
    render: (_, record) => <Question record={record} promise={getIpfs} />,
  },
  {
    title: msgs.type,
    dataIndex: "bought",
    key: "bought",
  },
  {
    title: msgs.betAmount,
    dataIndex: "bet",
    key: "bet",
  },
  {
    title: msgs.dateAndTime,
    dataIndex: "datetime",
    key: "datetime",
  },
  {
    title: msgs.verdict,
    dataIndex: "verdict",
    key: "verdict",
    render: (_, record) => {
      const resultClass =
        record?.result != null
          ? betOn?.closedType?.[Number(record.result)]?.class
          : "yellow";

      const resultText = betOn?.closedType?.[record?.result]?.val || "Pending";

      return <span className={resultClass}>{resultText}</span>;
    },
  },
  {
    title: msgs.action,
    dataIndex: "action",
    key: "action",
    render: () => {
      return (
        <Link to="">
          <EditIcon />
        </Link>
      );
    },
  },
];

// Function to generate columns for the Created Profile table
export const eventsCreatedColumns = () => {
  return [
    {
      title: msgs.txnHash,
      dataIndex: "txnHash",
      key: "txnHash",
      render: (_, record) => (
        <Tooltip title={record?.txnId}>
          <span className="txnHash">{truncateText(record?.txnId)}</span>
        </Tooltip>
      ),
    },
    {
      title: msgs.event,
      dataIndex: "event",
      key: "event",
      render: (_, record) => {
        return <Question record={record} promise={getIpfs} />;
      },
    },
    {
      title: msgs.createdOn,
      dataIndex: "createdon",
      key: "createdon",
      render: (_, record) => {
        return globalTimeFormat(record?.createdAt);
      },
    },
    {
      title: msgs.noOfBets,
      dataIndex: "trades",
      key: "trades",
      render: (_, record) => {
        return <>{record?.noOfBets||0}</>;
      },
    },
    {
      title: msgs.volume,
      dataIndex: "volume",
      key: "volume",
      render: (_, record) => {
        return (
          <>
            {Number(formatNumber(record?.volume)).toFixed(env?.precision)} {msgs.azero}
          </>
        );
      },
    },
    {
      title: msgs.rewards,
      dataIndex: "rewards",
      key: "rewards",
      render: (_, record) => {
        return (
          <>
            {record?.reward
              ? Number(formatNumber(record?.reward)).toFixed(env?.precision)
              : 0}{" "}
            {msgs.azero}
          </>
        );
      },
    },
  ];
};

// Function to decide the button title based on the position type and its status
export const decideTitle = (title, isDisabled) => {
  switch (title) {
    case "open":
      return msgs.withdraw;
    case "closed":
      if (!isDisabled) return msgs.claim;
      return msgs.withdraw;
    default:
      return "-";
  }
};
