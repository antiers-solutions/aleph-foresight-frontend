import axios from "axios";
import { message } from "antd";
import UseGetApi from "../../api/makeRequest";
import { handleLogout } from "../../Common/Header/header.helper";
import { antdPopupConstant, env } from "../../utils/appConstants";

// Mock dependencies
jest.mock("axios");
jest.mock("antd", () => ({
  message: {
    error: jest.fn(),
  },
}));
jest.mock("../../Common/Header/header.helper", () => ({
  handleLogout: jest.fn(),
}));
jest.mock("../../utils/appConstants", () => ({
  antdPopupConstant: "popupKey",
  env: {
    baseUrl: "http://localhost:3000",
  },
}));

describe("UseGetApi", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
    sessionStorage.clear(); // Clear session storage before each test
  });

  test("should return data on successful GET request", async () => {
    const url = "/test-url";
    const responseData = { data: "test data" };
    axios.mockResolvedValue({ data: responseData });

    const result = await UseGetApi(url, "get");

    expect(result).toEqual({ error: false, data: responseData });
    expect(axios).toHaveBeenCalledWith({
      method: "get",
      url: env.baseUrl + url,
      withCredentials: true,
      headers: undefined,
    });
  });

  test("should return data on successful POST request", async () => {
    const url = "/test-url";
    const body = { data: "test data" };
    const responseData = { data: "test data" };
    axios.mockResolvedValue({ data: responseData });

    const result = await UseGetApi(url, "post", body);

    expect(result).toEqual({ error: false, data: responseData });
    expect(axios).toHaveBeenCalledWith({
      method: "post",
      url: env.baseUrl + url,
      data: responseData,
      withCredentials: true,
      headers: undefined,
    });
  });

  test("should handle error and call handleLogout on 401 status", async () => {
    const url = "/test-url";
    const errorResponse = {
      response: { status: 401, data: { message: "Unauthorized" } },
    };
    axios.mockRejectedValue(errorResponse);
    sessionStorage.setItem("isLogged", "true");

    const result = await UseGetApi(url);

    expect(result).toEqual({ error: true, stack: errorResponse });
    expect(handleLogout).toHaveBeenCalled();
    expect(message.error).toHaveBeenCalledWith({
      content: "Unauthorized",
      key: antdPopupConstant,
    });
  });

  test("should handle error and not call handleLogout on non-401 status", async () => {
    const url = "/test-url";
    const errorResponse = {
      response: { status: 500, data: { message: "Server Error" } },
    };
    axios.mockRejectedValue(errorResponse);
    sessionStorage.setItem("isLogged", "true");

    const result = await UseGetApi(url);

    expect(result).toEqual({ error: true, stack: errorResponse });
    expect(handleLogout).not.toHaveBeenCalled();
    expect(message.error).toHaveBeenCalledWith({
      content: "Server Error",
      key: antdPopupConstant,
    });
  });

  test("should handle error with default message", async () => {
    const url = "/test-url";
    const errorResponse = { message: "Default Error" };
    axios.mockRejectedValue(errorResponse);

    const result = await UseGetApi(url);

    expect(result).toEqual({ error: true, stack: errorResponse });
    expect(message.error).toHaveBeenCalledWith({
      content: "Default Error",
      key: antdPopupConstant,
    });
  });
});
