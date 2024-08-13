import axios from "axios";
import { message } from "antd";
import { antdPopupConstant, env } from "../utils/appConstants";
import { handleLogout } from "../Common/Header/header.helper";
import Path from "../Routing/Constant/RoutePaths";

const UseGetApi = async (url, method, body, headers, isIpfs) => {
  try {
    const result = await axios({
      method: method || "get",
      url: isIpfs ? url : env.baseUrl + url,
      data: body || undefined,
      withCredentials: !isIpfs,
      headers: headers || undefined,
    });
    return { error: false, data: result?.data };
  } catch (error) {
    if (error?.response?.status === 401 && sessionStorage.getItem("isLogged")) {
      sessionStorage.clear();
      if (window.location.pathname != Path.HOME)
        window.location.replace(Path?.HOME);
      message.success("Session Expired");
    }
    message.error({
      content: error?.response?.data?.message || error?.message,
      key: antdPopupConstant,
    });
    return { error: true, stack: error };
  }
};

export default UseGetApi;
