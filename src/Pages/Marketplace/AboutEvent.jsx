
/**
 * AboutEvent component displays detailed information about a specific event.
 * @param {Object} metaData - Metadata containing event details.
 */
import { Skeleton } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { msgs } from "../../utils/appConstants";
import { LinkIcon } from "../../assets/StoreAsset/StoreAsset";
import {
  getExplorerURL,
  globalTimeFormat,
  timeStampToDate,
  toLocaleString,
} from "../../utils/helpers/commonHelper";
import { Context } from "../ContextProvider/ContextProvider";

const AboutEvent = ({ metaData }) => {
  const { coinList, data } = metaData;
  const { fullPageLoading } = useContext(Context);

  return (
    <>
      {fullPageLoading ? (
        <>
          <div className="aboutEventHeading">
            <h2>{msgs.aboutTheEvent}</h2>
          </div>
          <Skeleton active paragraph={{ rows: 3 }} />
        </>
      ) : (
        <>
          {/* Event Heading */}
          <div className="aboutEventHeading">
            <h2>{msgs.aboutTheEvent}</h2>
          </div>
          {/* Event Details */}
          <div className="aboutDetail">
            <p>
              {msgs.thisMarketResolveTo} {data?.currencyType || "-"} "
              {globalTimeFormat(timeStampToDate(data?.targetDateTime))}"{" "}
              {msgs.hasFinalClosePrice} {toLocaleString(data?.priceLevel || 0)}{" "}
              {msgs.orWillResolveToNo}{" "}
            </p>
            <p>
              {" "}
              {msgs.priceAccToMarket} {data?.currencyType || "-"}
              {msgs.notAccToOtherMarket}
            </p>
          </div>

          {/* Event Dates */}
          <div className="betDate">
            <div className="innerMultiDate">
              <p>{msgs.startDate}</p>
              <h2>{globalTimeFormat(data?.createdAt)}</h2>
            </div>
            <div className="innerMultiDate">
              <p>{msgs.bettingClosureTime}</p>
              <h2>
                {globalTimeFormat(timeStampToDate(data?.bettingClosureTime))}
              </h2>
            </div>
            <div className="innerMultiDate">
              <p>{msgs.endDate}</p>
              <h2>{globalTimeFormat(timeStampToDate(data?.targetDateTime))}</h2>
            </div>
          </div>
        </>
      )}
      {fullPageLoading ? (
        <>
          {/* Source of Truth Heading */}
          <div className="aboutEventHeading">
            <h2>{msgs.sourceOfTruth}</h2>
          </div>
          <Skeleton.Input
            active
            paragraph={{ rows: 5 }}
            className="sourceTruth"
          />
        </>
      ) : (
        <>
          {/* Source of Truth Heading */}
          <div className="aboutEventHeading">
            <h2>{msgs.sourceOfTruth}</h2>
          </div>
          {/* Resolution Source */}
          <div className="sourceTruth">
            <div className="resolutionSec">
              <LinkIcon />
              <div className="rightSec">
                <h2>{msgs.resolutionSource}</h2>
                <Link
                  onClick={() =>
                    window.open(
                      getExplorerURL({
                        baseUrl: data?.resolutionSource,
                        arr: coinList,
                        getKey: "name",
                        findKey: "symbol",
                        findValue: data?.currencyType,
                      }),
                      "_blank"
                    )
                  }
                  to={""}
                  className="rightSec_link"
                >
                  {getExplorerURL({
                    baseUrl: data?.resolutionSource,
                    arr: coinList,
                    getKey: "name",
                    findKey: "symbol",
                    findValue: data?.currencyType,
                  })}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AboutEvent;
