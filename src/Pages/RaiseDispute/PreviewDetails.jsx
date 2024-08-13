// Component to display detailed information about an event

import React from "react";
import { msgs } from "../../utils/appConstants";
import { globalTimeFormat } from "../../utils/helpers/commonHelper";
import { getClassName } from "../RecentActivity/recentActivity.helper";

const Details = ({ preview }) => {
  // Extract data from the preview prop for convenience
  const eventDetails = preview?.[0]?.others || {};

  return (
    <div className="disputeDetail">
      <div className="innerDetail">
        <h2>{msgs.eventName}</h2>
        <p> {eventDetails?.name || "-"}</p>
      </div>
      <div className="innerDetail">
        <h2>{msgs.eventRaised}</h2>
        <p>
          {" "}
          {eventDetails?.raised ? globalTimeFormat(eventDetails?.raised) : "-"}
        </p>
      </div>
      <div className="innerDetail">
        <h2>{msgs.eventSettleMent}</h2>
        <p> {eventDetails?.settled || "-"}</p>
      </div>
      <div className="innerDetail">
        <h2>{msgs.betDate}</h2>
        <p>
          {" "}
          {eventDetails?.betDate
            ? globalTimeFormat(eventDetails?.betDate)
            : "-"}
        </p>
      </div>
      <div className="innerDetail">
        <h2>{msgs.betAmount}</h2>
        <p>
          {" "}
          {eventDetails?.betAmount
            ? `${eventDetails?.betAmount} ${msgs.azero}`
            : "-"}{" "}
        </p>
      </div>
      <div className="innerDetail">
        <h2>{msgs.settledPosition}</h2>
        <p className={"red"}>
          {eventDetails?.betAmount
            ? `-${eventDetails?.betAmount} ${msgs.azero}`
            : "-"}
        </p>
      </div>
      <div className="innerDetail">
        <h2>{msgs.settledAs}</h2>
        <p className={getClassName(eventDetails?.settlement)}>
          {eventDetails?.settlement || "-"}
        </p>
      </div>
    </div>
  );
};

const PreviewDetails = React.memo(Details);
export default PreviewDetails;
