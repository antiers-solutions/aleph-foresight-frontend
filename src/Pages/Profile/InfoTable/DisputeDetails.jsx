/**
 *  - Component props
 * .modalData - Object of event details to be displayed
 * @param {Boolean} props.visible - Boolean value decides the modal to be visible or not
 * @param {Function} props.onClose - Function that handles closing event of modal
 * @param {String} props.title - String value that shows the title of modal
 * @param {String} props.width - String value that sets the width of the modal
 * @param {String} props.borderRadius - String value that sets the border radius of the modal
 * @returns {JSX.Element} - Rendered component
 **/

import moment from "moment";
import { Modal, Tooltip } from "antd";
import React, { useState } from "react";
import "./DisputeDetails.scss";
import CopyText from "./CopyText";
import {
  getIpfs,
  toCapitalize,
  trimAddressLength,
} from "../../../utils/helpers/commonHelper";
import EvidenceModal from "./EvidenceModal";
import Question from "../../../Common/Question/Question";
import { dateFormat, msgs } from "../../../utils/appConstants";
import { FileUpload } from "../../../assets/StoreAsset/StoreAsset";

function Details({ modalData, visible, onClose, title, width, borderRadius }) {
  const [open, setOpen] = useState(false);
  const [previewData, setPreviewData] = useState([]);

  const disputeCardData = (modalData) => [
    {
      id: 1,
      heading: msgs.event,
      paragraph: Object.keys(modalData)?.length ? (
        <span className="bitdata">
          <Question record={modalData} promise={getIpfs} />
        </span>
      ) : (
        "-"
      ),
    },
    {
      id: 2,
      heading: msgs.walletAddress,
      paragraph: modalData?.userId ? (
        <span className="cursorPointer">
          <Tooltip title={modalData?.userId}>
            {trimAddressLength(modalData?.userId)}{" "}
          </Tooltip>
          <CopyText text={modalData?.userId}></CopyText>
        </span>
      ) : (
        "-"
      ),
    },
    {
      id: 3,
      heading: msgs.category,
      paragraph: <span>{modalData?.category || "-"}</span>,
    },
    {
      id: 4,
      heading: msgs.date,
      paragraph: (
        <span>
          {modalData?.createdAt
            ? moment(modalData?.createdAt).format(dateFormat?.five)
            : "-"}
        </span>
      ),
    },
    {
      id: 5,
      heading: msgs.status,
      paragraph: modalData?.status ? (
        <span className={modalData?.status == "closed" ? "red" : "green"}>
          {toCapitalize(modalData?.status)}
        </span>
      ) : (
        "-"
      ),
    },
    {
      id: 6,
      heading: msgs.claimDecision,
      paragraph: <span className="green">{msgs.accepted}</span>,
    },
    {
      id: 7,
      heading: msgs.evidenceUploaded,
      paragraph: (
        <div
          className="uploadFileBtn"
          onClick={async () => {
            setOpen(true);
            setPreviewData(modalData?.evidenceUrl);
          }}
        >
          <FileUpload /> <span>{msgs.uploaded}</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        title={title}
        width={width}
        open={visible}
        footer={false}
        centered={true}
        onCancel={onClose}
        className="commonModal"
        borderRadius={borderRadius}
      >
        <div className="disputeDetails">
          <div className="disputeDetails__details">
            {disputeCardData(modalData)?.map((card) => (
              <div className="disputeDetails__details__inner">
                <h4>{card?.heading || "-"}</h4>
                <p>{card?.paragraph || "-"}</p>
              </div>
            ))}
            <div className="disputeDetails__details__description">
              <h4>{msgs.description}</h4>
              <p className="desc">{modalData?.description || "-"}</p>
            </div>
          </div>
        </div>
      </Modal>
      <EvidenceModal
        show={open}
        previewData={previewData}
        handleCancel={() => setOpen(!open)}
      />
    </>
  );
}

const DisputeDetails = React.memo(Details);
export default DisputeDetails;
