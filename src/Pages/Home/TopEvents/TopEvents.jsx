/**
 * TopEvents Component
 *
 * Displays a list of top events with a "View All" button if there are more events available.
 *
 */
import React from "react";
import "./Events.scss";
import EventsCard from "./EventsCard";
import { msgs } from "../../../utils/appConstants";
import { ButtonCustom } from "../../../Common/ButtonCustom/ButtonCustom";
import { useGetTopEvents } from "../../../Hooks/useGetTopEvents";

const TopEvents = () => {
  const { metaData, filter, topEventsShow, getLatestEvents, goToMarketPlace } =
    useGetTopEvents();

  return (
    <div className="eventSec" id="topEvents">
      <div className="eventView">
        <h2>{msgs.topEvents}</h2>
        {metaData?.total > topEventsShow ? (
          <ButtonCustom
            label={msgs.viewAll}
            btnBorder={true}
            onClick={goToMarketPlace}
          />
        ) : null}
      </div>
      <EventsCard
        data={getLatestEvents()}
        loading={metaData?.loading}
        filter={filter}
      />
    </div>
  );
};

export default TopEvents;
