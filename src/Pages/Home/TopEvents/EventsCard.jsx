/**
 * EventsCard component displays a list of event cards with betting options.
 *
 * @param {Array} props.data - List of event data.
 * @param {Boolean} props.loading - Flag to indicate if data is being loaded.
 *
 * @returns {JSX.Element} EventsCard component.
 */
import React from "react";
import moment from "moment";
import { Button, Skeleton } from "antd";
import "./Events.scss";
import { msgs } from "../../../utils/appConstants";
import ProfileImg from "../../../assets/BlueLogo.svg";
import {
  formatPrice,
  globalTimeFormat,
  timeStampToDate,
} from "../../../utils/helpers/commonHelper";
import { useEventCards } from "../../../Hooks/useEventCards";
import { NoIcon, YesIcon } from "../../../assets/StoreAsset/StoreAsset";
import CommonConfirmationModal from "../../../Common/CommonConfirmModal/CommonConfirmModal";
import NoData from "../../../Common/NoData/NoData";

const EventsCard = ({ data, loading,filter }) => {
  const { handleBetOn, handleCancel, coinUrl, handleYes, show, isLoading } =
    useEventCards();
 
  return (
    <div className="cardCustom marketplace">
      {loading ? (
        Array.from({ length: 6 }, (_, index) => index + 1).map(({item,index}) => (
          <div className="cardSkeleton"  key={index} >
            <Skeleton active paragraph={{ rows: 5 }} />
          </div>
        ))
      ) : data?.length ? (
        data?.map((val, index) => {
          const url = Object.keys(coinUrl).length
            ? coinUrl[val?.currencyType]
            : ProfileImg;

          return (
            <>
              {
                <div key={index} className="cardOuter">
                  <div className="topCard">
                    <img src={url} alt="coin-url" className="cardOuter_img" />
                    <div className="currentPrice">
                      <h4>
                        <span>{msgs.currentPrice}: </span>
                        {`${
                          val?.currentPrice
                            ? formatPrice(val?.currentPrice)
                            : "-"
                        } ${msgs.usdt}`}
                      </h4>
                      <h2>
                        {val?.currencyType} {msgs.toBePriceAt}{" "}
                        {val?.priceLevel ? formatPrice(val?.priceLevel) : 0}{" "}
                        {msgs.usdtOrMore}{" "}
                        {globalTimeFormat(
                          moment(timeStampToDate(val?.targetDateTime))
                        )}
                        ?
                      </h2>
                    </div>
                  </div>
                  <div className="cardBtn">
                    <Button
                      className="yesBtn"
                      onClick={() =>
                        handleBetOn({
                          betOn: "yes",
                          eventId: val?.eventId,
                        })
                      }
                    >
                      <YesIcon />
                      {msgs.yes}
                    </Button>
                    <Button
                      className="noBtn"
                      onClick={() =>
                        handleBetOn({
                          betOn: "no",
                          eventId: val?.eventId,
                        })
                      }
                    >
                      <NoIcon />
                      {msgs.no}
                    </Button>
                  </div>
                </div>
              }
            </>
          );
        })
      ) : (
        <div className="recentNodata">
          <NoData loading={false} data="Events" />
        </div>
      )}
      <CommonConfirmationModal
        closable={false}
        desc={msgs.connectionRequest}
        handleCancel={handleCancel}
        handleYes={handleYes}
        header={msgs.connect}
        loading={isLoading}
        show={show}
      />
    </div>
  );
};

export default EventsCard;
