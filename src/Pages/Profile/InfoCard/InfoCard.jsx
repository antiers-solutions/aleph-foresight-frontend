/**
 * InfoCard component displays key metrics about the betting details of the loggedin user.
 * It fetches data from APIs to display the net position, volume traded, and events traded.
 *
 */
import React from "react";
import { cardData } from "./infoCard.helper";
import useInfoCard from "../../../Hooks/useInfoCard";

const InfoCard = () => {
  const { cardInfo } = useInfoCard();

  return (
    <div className="azeroOuter">
      {cardData?.map((item, index) => (
        <div className="azeroCard" key={index}>
          <div className="tradedImg">{item?.icon}</div>
          <h2>{item?.cardName}</h2>
          <h3>{`${cardInfo[item?.key]}`}</h3>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
