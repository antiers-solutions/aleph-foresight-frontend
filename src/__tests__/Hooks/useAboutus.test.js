import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import useAboutUs from "../../Hooks/useAboutUs";
import UseGetApi from "../../api/makeRequest";
import { apiUrls } from "../../api/apiUrls";
import { initialMetricsData } from "../../Pages/About/about.helper";
import { waitFor } from "@testing-library/react";

// Mock the API requests
jest.mock("../../api/makeRequest");
jest.mock("../../api/apiUrls", () => ({
  apiUrls: {
    totalUser: jest.fn(() => "mockTotalUserUrl"),
    totalVolume: jest.fn(() => "mockTotalVolumeUrl"),
    totalEvents: jest.fn(() => "mockTotalEventsUrl"),
  },
}));
jest.mock("../../Pages/About/about.helper", () => ({
  initialMetricsData: jest.fn((users, volume, creators, dummy) => ({
    users,
    volume,
    creators,
    dummy,
  })),
}));

describe("useAboutUs", () => {
  beforeEach(() => {
    // Reset mock implementations before each test
    UseGetApi.mockReset();
  });

  it("should initialize with the correct initial state", () => {
    const { result } = renderHook(() => useAboutUs());

    expect(result.current.metrics).toEqual({
      users: 0,
      volume: 0,
      creators: 0,
      dummy: 0,
    });
  });

  it("should fetch and set metrics data", async () => {
    // Mock responses
    UseGetApi.mockImplementation((url) => {
      switch (url) {
        case "mockTotalUserUrl":
          return Promise.resolve({ data: { data: { totalUsers: 100 } } });
        case "mockTotalVolumeUrl":
          return Promise.resolve({ data: { data: { totalVolume: 2000 } } });
        case "mockTotalEventsUrl":
          return Promise.resolve({ data: { data: { totalCreators: 50 } } });
        default:
          return Promise.reject(new Error("Unknown URL"));
      }
    });

    const { result, waitForNextUpdate } = renderHook(() => useAboutUs());

    await waitForNextUpdate(); // Wait for the hook to update after the API call

    expect(result.current.metrics).toEqual({
      users: 100,
      volume: 2000,
      creators: 50,
      dummy: 0,
    });
  });

  it("should handle API errors gracefully", async () => {
    // Mock error response
    UseGetApi.mockImplementation(() => Promise.reject(new Error("API Error")));

    const { result } = renderHook(() => useAboutUs());

    // Wait for state update
    await waitFor(() => {
      expect(result.current.metrics).toEqual({
        users: 0,
        volume: 0,
        creators: 0,
        dummy: 0,
      });
    });
  });
});
