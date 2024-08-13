import moment from "moment";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import ProfileImg from "../../assets/BlueLogo.svg";
import {
  formatNumber,
  formatPrice,
  globalTimeFormat,
  showTime,
  timeStampToDate,
} from "../../utils/helpers/commonHelper";
import { env, msgs } from "../../utils/appConstants";
import { useEventCards } from "../../Hooks/useEventCards";
import { betOn } from "../Marketplace/marketPlace.helper";
import { Context } from "../ContextProvider/ContextProvider";
import { getClassName, showUserName } from "./recentActivity.helper";

/**
 * @dev RecentActivityCard component displays a list of recent activities in a card format.
 *  - Component props
 * @param {Array} props.data - Array of activity data to be displayed
 * @returns {JSX.Element} - Rendered component
 */
const RecentActivityCard = ({ data }) => {
  // Custom hook to handle recent activity logic
  const { handleBetOn } = useEventCards();
  const { coinUrl } = useContext(Context);
  const { pathname } = useLocation();

  return (
    <div className="recentActivitycard">
      {data?.length
        ? data?.map((val, index) => {
            // Determine the icon URL or fallback to a default image
            const url = Object.keys(coinUrl).length
              ? coinUrl[val?.currencyType]
              : ProfileImg;
            return (
              <div
                key={index}
                className="cardOuter"
                data-testid="recent-activity-card"
                onClick={() =>
                  handleBetOn({
                    betOn: "yes",
                    eventId: val?.eventId,
                  })
                }
              >
                <div className="topCard">
                  <div className="imageData">
                    <img
                      src={url}
                      alt={val?.currencyType}
                      className="coin-icons"
                    />
                  </div>
                  <div className="currentPrice">
                    <div className="inerDetail">
                      <h4>
                        {val?.currencyType || "-"} {msgs.toBePriceAt}{" "}
                        {val?.priceLevel
                          ? formatPrice(val?.priceLevel, "5")
                          : 0}{" "}
                        {msgs.usdtOrMore}{" "}
                        {globalTimeFormat(
                          moment(timeStampToDate(val?.targetDateTime))
                        )}
                        ?
                      </h4>

                      <p>{showTime(val?.updatedAt)}</p>
                    </div>
                    <div className="showTime">
                      <h2>
                        <span className="marketTd">
                          <img
                            src={
                              val?.userDetails?.profilePicture?.small ||
                              ProfileImg
                            }
                            alt="profile-img"
                            className="coin-icons"
                          />
                          {showUserName(
                            val?.userDetails?.userName
                              ? val?.userDetails?.userName
                              : val?.userId
                          )}
                        </span>
                        {val?.bidType === "false" || val?.bidType === "true"
                          ? "bought"
                          : ""}
                        <span
                          className={`bidDecision ${getClassName(
                            val?.bidType
                          )}`}
                        >
                          <span
                            className={betOn
                              ?.activity(pathname)
                              [val?.bidType]?.toLowerCase()}
                          >
                            {betOn?.activity(pathname)[val?.bidType || "-"]}
                          </span>
                        </span>
                        {betOn?.activity(pathname)[val?.bidType] ===
                          "Withdrew" ||
                        betOn?.activity(pathname)[val?.bidType] === "Claimed"
                          ? ""
                          : "for"}{" "}
                        <span className="azeroPrice">
                          {Number(formatNumber(val?.currentBet)).toFixed(env?.precision)} {msgs.azero}
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default RecentActivityCard;
