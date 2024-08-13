/**
 * AboutMarketplace Component
 * 
 * This component renders the About Marketplace page, which includes the event header, 
 * about event section, positions table, and bet slip component.
 * 
 */
import { Skeleton, Table } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Marketplace.scss";
import BetSlip from "./BetSlip";
import AboutEvent from "./AboutEvent";
import EventHeader from "./EventHeader";
import { columns } from "./marketPlace.helper";
import { msgs } from "../../utils/appConstants";
import CommonSuccessModal from "./CommonSuccessModal";
import { usePositions } from "../../Hooks/usePositions";
import useScrollToTop from "../../Hooks/useScrollToTop";
import { Context } from "../ContextProvider/ContextProvider";
import { BackIcon } from "../../assets/StoreAsset/StoreAsset";
import { useGetMarketPlace } from "../../Hooks/useGetMarketPlace";
import { useTablePagination } from "../../Hooks/useTablePagination";
import CommonConfirmationModal from "../../Common/CommonConfirmModal/CommonConfirmModal";

const AboutMarketplace = () => {
  // Scroll to top on component mount
  useScrollToTop();

  // Access global state from context
  const { coinList } = useContext(Context);
  const navigate = useNavigate();

  // Fetch marketplace data and handle related actions
  const {
    bets,
    callApis,
    metaData,
    getDetails,
    getYesNoBets,
    getBetsOfParticularEventOfCurrentUser,
  } = useGetMarketPlace();

  // Handle table pagination
  const { handleTableChange, tableParams } = useTablePagination(
    getBetsOfParticularEventOfCurrentUser,
    metaData?.total || 0
  );

  // Handle positions and modal visibility
  const {
    updated,
    rowDetails,
    contractDetails,
    onRow,
    handleYes,
    showSuccessModal,
    showConfirmModal,
    toggleConfirmModal,
    toggleSuccessModal,
  } = usePositions({ getYesNoBets });

  return (
    <div className="container">
      {/* Back Navigation */}
      <div className="marketBack">
        <p onClick={() => navigate(-1)}>
          <BackIcon />
          {msgs.back}
        </p>
      </div>
      {/* About Marketplace Content */}
      <div className="aboutMarket">
        <div className="leftSec">
          <EventHeader
            data={metaData?.eventDetails}
            bets={bets}
            isLoading={metaData?.loading}
          />
          <div className="anoutEvent">
            <AboutEvent metaData={{ data: metaData?.eventDetails, coinList }} />
            <div className="positionTable">
              <h2>{msgs?.positions}</h2>
              { 
                metaData?.loading ? (
                <div
                  className="no-events-found"
                  data-testid="skeleton-container"
                >
                  <Skeleton active paragraph={{ rows: 5 }} />
                </div>
              ) : (
                <Table
                  dataSource={metaData?.data}
                  columns={columns(rowDetails?.isLoading)}
                  className="commonTable"
                  pagination={
                    metaData?.total > 10 ? tableParams.pagination : false
                  }
                  onChange={handleTableChange}
                  onRow={onRow}
                />
              )}
            </div>
          </div>
        </div>

        {/* Bet Slip Component */}
        <BetSlip
          callApi={() => {
            callApis();
            getDetails();
          }}
          betClosureDate={metaData?.eventDetails?.bettingClosureTime}
          updated={updated}
        />
        {/* Confirmation Modal */}
        <CommonConfirmationModal
          show={showConfirmModal}
          header={msgs.areYouSure}
          desc={msgs.initiateWithdraw}
          loading={contractDetails?.isLoading}
          handleYes={handleYes}
          handleCancel={toggleConfirmModal}
        />
        <CommonSuccessModal
          show={showSuccessModal}
          header={msgs.successful}
          desc={msgs.withdrawSuccessDesc}
          handleCancel={() => {
            toggleSuccessModal();
            toggleConfirmModal();
            getBetsOfParticularEventOfCurrentUser(bets);
            getYesNoBets(rowDetails?.eventId);
          }}
        />
      </div>
    </div>
  );
};

export default AboutMarketplace;
