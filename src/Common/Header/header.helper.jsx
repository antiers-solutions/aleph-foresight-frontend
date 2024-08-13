/**
 * Handles the logout functionality.
 *
 */
import { message } from "antd";
import UseGetApi from "../../api/makeRequest";
import { apiUrls } from "../../api/apiUrls";
import { msgs } from "../../utils/appConstants";
import Path from "../../Routing/Constant/RoutePaths";

export const handleLogout = async () => {
  try {
    const response = await UseGetApi(apiUrls?.logout());
    if (response?.data) {
      message.success(msgs.logout?.logoutmsg);
      sessionStorage.clear();
      if (window.location.pathname != Path?.HOME)
        window.location.replace(Path?.HOME);
    }
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
