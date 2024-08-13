/**
 * EventHeader component displays the header information for a specific event.
 * @param {Object} data - The data object containing event details.
 * @param {Object} bets - The bets object containing bet details.
 */
import React, { useContext } from "react";
import {
  BarChart,
  TopArrow,
  TradingArrow,
} from "../../assets/StoreAsset/StoreAsset";
import { env, msgs } from "../../utils/appConstants";
import ProfileImg from "../../assets/BlueLogo.svg";
import {
  decideColor,
  formatNumber,
  toLocaleString,
} from "../../utils/helpers/commonHelper";
import Path from "../../Routing/Constant/RoutePaths";
import useEventHeader from "../../Hooks/useEventHeader";
import { EditLine } from "../../assets/StoreAsset/StoreAsset.jsx";
import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";
import { isLoggedIn } from "../../utils/helpers/walletHelpers";
import { Context } from "../ContextProvider/ContextProvider";
import { Skeleton, message } from "antd";

const EventHeader = ({ data, bets }) => {
  const isSameUser = (id) => {
    return id.toUpperCase() === isLoggedIn().toUpperCase();
  };
  /**
   * Destructring of the useEventHeader hook
   * @param {Boolean} isEditable - The data object containing event details.
   * @param {Function} navigate - The function to navigate to other pages.
   */
  const { isEditable, checkEditability, navigate } = useEventHeader({ data });
  const { fullPageLoading } = useContext(Context);

  return (
    <div className="topHeading">
      {fullPageLoading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <>
          {/* Coin Image Section */}
          <div className="imgSec">
            <img src={data?.iconUrl || ProfileImg} alt="coin-url" />
          </div>

          {/* Current Price and Bet Details */}
          <div className="currentPrice">
            <h2>{data?.qn}</h2>
            {/* Total Bets with Icon */}
            <h4>
              <BarChart /> {(formatNumber(bets?.["total"])).toFixed(env?.precision)}{" "}
              <span>{msgs.azero}</span> |{" "}
              <span className="green">
                {/* Yes Bets */}
                {msgs.yes} {formatNumber(bets?.["yes"]).toFixed(env?.precision)} {msgs.azero}
              </span>{" "}
              |
              <span className="red">
                {/* No Bets */}
                {msgs.no} {formatNumber(bets?.["no"]).toFixed(env?.precision)} {msgs.azero}
              </span>
              <span className="totalbets">
                <TradingArrow />
              </span>
              <span>{data?.totalNoOfBet || 0}</span>
            </h4>
            <h3>
              <div>
                <span className="gray">{msgs.currentPrice}: </span>
                {/* Current Price with Currency Details */}
                {toLocaleString(
                  data?.currencyDetails?.price,
                  data?.currencyDetails?.precision
                )}{" "}
                <span>{msgs.usdt}</span>
              </div>
              <span className={decideColor(data?.sign)?.class}>
                {" "}
                <TopArrow color={decideColor(data?.sign)?.color} />{" "}
                {data?.percentageDifference?.toFixed(2) || 0}%
              </span>
            </h3>
          </div>
          {isEditable && isSameUser(data?.userId) ? (
            <ButtonCustom
              label={msgs.edit}
              rightIcon={<EditLine />}
              onClick={async () => {
                const res = await checkEditability();
                if (!res) {
                  navigate(Path.CREATEMARKET, {
                    state: {
                      from: Path.ABOUTMARKETPLACE,
                      eventId: data?.eventId,
                      data,
                    },
                  });
                } else {
                  message.info(
                    "Someone has already placed a bet on the event."
                  );
                }
              }}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default EventHeader;
