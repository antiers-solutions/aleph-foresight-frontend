/**
 * RecentActivity component displays a carousel of recent activities.
 * @returns {JSX.Element} - Rendered component
 */
import React from "react";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import "./RecentActivity.scss";
import NoData from "../../Common/NoData/NoData";
import { msgs } from "../../utils/appConstants";
import Path from "../../Routing/Constant/RoutePaths";
import RecentActivityCard from "./RecentActivityCard";
import { useGetActivity } from "../../Hooks/useGetActivity";
import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";

const RecentActivity = () => {
  const navigate = useNavigate();
  const { metaData } = useGetActivity(false);

  // Handle navigation to the activity page
  const handleViewAllClick = () => {
    navigate(Path?.ACTIVITY);
  };

  return (
    <div className="recentActivity">
      <div className="container">
        <div className="recentHeading">
          <h2>{msgs.recentActivity}</h2>
          <div className="recentBtn">
            {/* Show 'View All' button if there are recent activities */}
            {metaData?.recentAvitvityData?.length ? (
              <ButtonCustom
                label={msgs.viewAll}
                btnBorder={true}
                onClick={handleViewAllClick}
              />
            ) : null}
          </div>
        </div>
        {/* Display carousel or NoData component based on availability of recent activities */}
        {metaData?.recentAvitvityData?.length ? (
          <>
            <Carousel
              swipe={true}
              data-testid="activity-carousel"
              edgeFriction={4} // Adjusts the friction when swiping edges
              autoplay={true} // Enable autoplay
              autoplaySpeed={5000} // Time interval between slides
              speed={3000} // Transition speed between slides
              dots={metaData?.recentAvitvityData[0].length === 6} // Show dots if exactly 6 items
            >
              {metaData?.recentAvitvityData?.map((item, index) => (
                <RecentActivityCard data={item} key={index} />
              ))}
            </Carousel>
          </>
        ) : (
          // Show NoData component if no recent activities
          <div className={"recentNodata"}>
            <NoData loading={metaData?.loading} data="Activities" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
