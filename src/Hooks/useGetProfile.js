/**
 * Custom hook to fetch and manage user profile details.
 *
 * @returns {object} An object containing the following properties:
 *  - `isModalOpen`: A boolean indicating whether the modal is open or not.
 *  - `getProfileDetails`: A function to fetch the user's profile details from the API.
 *  - `toggleModal`: A function to toggle the modal's visibility and optionally fetch the user's profile details.
 *
 */
import { useContext, useState } from "react";
import { apiUrls } from "../api/apiUrls";
import UseGetApi from "../api/makeRequest";
import ProfileImg from "../assets/BlueLogo.svg";
import { isLoggedIn } from "../utils/helpers/walletHelpers";
import { Context } from "../Pages/ContextProvider/ContextProvider";

const useGetProfile = () => {
  const { setProfile } = useContext(Context);

  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Fetches the user's profile details from the API.
   *
   * @async
   */
  const getProfileDetails = async () => {
    try {
      if (isLoggedIn()) {
        setProfile((prev) => ({ ...prev, loading: true }));
        const { data } = await UseGetApi(
          apiUrls?.getProfile({ "wallet-address": isLoggedIn() }),
          "get"
        );
        if (data?.data) {
          const { profilePicture, userName, walletAddress, ensId } =
            data?.data?.userCheckdata;
          const payload = {
            img: profilePicture?.small ?? ProfileImg,
            name: userName,
            ensId,
            walletAddress,
          };
          setProfile((prev) => ({
            ...prev,
            ...payload,
          }));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProfile((prev) => ({ ...prev, loading: false }));
    }
  };

  /**
   * Toggles the modal's visibility and optionally fetches the user's profile details.
   *
   * @param {boolean} callApi Whether to fetch the user's profile details or not.
   */
  const toggleModal = (callApi) => {
    setIsModalOpen(!isModalOpen);
    if (callApi) {
      getProfileDetails(true);
    }
  };

  return {
    isModalOpen,
    getProfileDetails,
    toggleModal,
  };
};

export default useGetProfile;
