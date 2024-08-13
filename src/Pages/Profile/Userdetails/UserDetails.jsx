import React, { useContext } from "react";
import { msgs } from "../../../utils/appConstants";
import useGetProfile from "../../../Hooks/useGetProfile";
import { CopyIcon } from "../../../assets/StoreAsset/StoreAsset";
import { Context } from "../../ContextProvider/ContextProvider";
import EditUserDetails from "../EditUserDetails/EditUserDetails";
import { isLoggedIn } from "../../../utils/helpers/walletHelpers";
import { copyToClipBoard } from "../../../utils/helpers/commonHelper";
import { ButtonCustom } from "../../../Common/ButtonCustom/ButtonCustom";

const UserDetails = () => {
  const { profileDetails } = useContext(Context); // Use context to get setProfile function
  const { isModalOpen, toggleModal } = useGetProfile(); // Custom hook to get user profile details

  return (
    <>
      <div className="profileNameDetail">
        <div className="profileImg">
          <img src={profileDetails?.img} alt="ProfileLogo" />
        </div>
        {/* userDetails */}
        <div className="nameSec">
          <h2>{profileDetails?.name}</h2>
          {/* enable in future */}
          {/* <h3>{profileDetails?.ensId}</h3> */}
          {/* copy user address */}
          <p>
            {isLoggedIn() ? (
              <>
                {isLoggedIn()}
                <span
                  onClick={() => {
                    copyToClipBoard(isLoggedIn());
                  }}
                >
                  <CopyIcon />
                </span>
              </>
            ) : null}
          </p>
        </div>
        {/* edit proile button */}
        <div className="editProfile">
          <ButtonCustom
            label={msgs.editProfile}
            btnBorder={true}
            onClick={toggleModal}
          />
        </div>
      </div>
      {/* edit deatils modal */}
      <EditUserDetails
        userDetails={profileDetails}
        showModal={isModalOpen}
        closeModal={() => toggleModal(true)}
      />
    </>
  );
};

export default UserDetails;
