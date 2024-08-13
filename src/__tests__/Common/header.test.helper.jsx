// handleLogout.test.js
import { message } from "antd";
import UseGetApi from "../../api/makeRequest";
import { apiUrls } from "../../api/apiUrls";
import { msgs } from "../../utils/appConstants";
import Path from "../../Routing/Constant/RoutePaths";
import { handleLogout } from "../../Common/Header/header.helper";

jest.mock("antd", () => ({
  message: {
    success: jest.fn(),
  },
}));

jest.mock("../../api/makeRequest");
jest.mock("../../api/apiUrls");
jest.mock("../../utils/appConstants", () => ({
  msgs: {
    logout: {
      logoutmsg: "Successfully logged out",
    },
  },
}));

jest.mock("../../Routing/Constant/RoutePaths", () => ({
  HOME: "/",
}));
global.window.location = {
    ancestorOrigins: null,
    hash: null,
    host: 'dummy.com',
    port: '80',
    protocol: 'http:',
    hostname: 'dummy.com',
    href: 'http://dummy.com?page=1&name=testing',
    origin: 'http://dummy.com',
    pathname: null,
    search: null,
    assign: null,
    reload: null,
    replace: null,
};
 global.window.sessionStorage={
    clear: null
 }
describe("handleLogout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should log out successfully and redirect to home page", async () => {
    const mockResponse = { data: true };
    UseGetApi.mockResolvedValue(mockResponse);
    delete window.location;
    window.location = { replace: jest.fn(), pathname: "/dashboard" };

    const response = await handleLogout();

    expect(UseGetApi).toHaveBeenCalledWith(apiUrls.logout());
    expect(message.success).toHaveBeenCalledWith(msgs.logout.logoutmsg);
    // expect(sessionStorage.clear).toHaveBeenCalled();
    expect(window.location.replace).toHaveBeenCalledWith(Path.HOME);
    expect(response).toEqual(mockResponse);
  });

  it("should handle error and return null", async () => {
    const mockError = new Error("Network error");
    UseGetApi.mockRejectedValue(mockError);

    const response = await handleLogout();

    expect(UseGetApi).toHaveBeenCalledWith(apiUrls.logout());
    expect(message.success).not.toHaveBeenCalled();
    // expect(sessionStorage.clear).not.toHaveBeenCalled();
    expect(window.location.replace).not.toHaveBeenCalled();
    expect(response).toBeNull();
  });

  it("should not redirect if already on the home page", async () => {
    const mockResponse = { data: true };
    UseGetApi.mockResolvedValue(mockResponse);
    delete window.location;
    window.location = { replace: jest.fn(), pathname: Path.HOME };

    const response = await handleLogout();

    expect(UseGetApi).toHaveBeenCalledWith(apiUrls.logout());
    expect(message.success).toHaveBeenCalledWith(msgs.logout.logoutmsg);
    // expect(sessionStorage.clear).toHaveBeenCalled();
    expect(window.location.replace).not.toHaveBeenCalled();
    expect(response).toEqual(mockResponse);
  });
});
