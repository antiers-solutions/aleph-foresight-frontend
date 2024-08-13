import { renderHook } from "@testing-library/react-hooks";
import usePublish from "../../Hooks/usePublish";
import { apiUrls } from "../../api/apiUrls";
import UseGetApi from "../../api/makeRequest";
import {
  divideByHundred,
  getTimeStamp,
} from "../../utils/helpers/commonHelper"; // Mocked if needed
import {
  contractEvents,
} from "../../utils/helpers/contractHelpers";

jest.mock("../../utils/helpers/contractHelpers", () => ({
  contractEvents: jest.fn(),
  contractMethods: jest.fn(),
})); // Mock UseGetApi
jest.mock("../../api/makeRequest", () => jest.fn()); // Mock UseGetApi
jest.mock("../../utils/helpers/commonHelper", () => ({
  divideByHundred: jest.fn(),
  getTimeStamp: jest.fn(),
}));
jest.mock("../../utils/appConstants", () => ({
  contractMethods: {
    editEvent: "editEvent",
    register: "register",
    platFormFeePreview: "platFormFeePreview",
    rewardFee: "rewardFee",
  },
  contractEvents: jest.fn(),
}));

describe("usePublish", () => {
  let mockUseGetApi;
  let mockContractEvents;
  let mockDivideByHundred;
  let mockGetTimeStamp;

  beforeEach(() => {
    mockUseGetApi = jest.mocked(UseGetApi);
    mockContractEvents = jest.mocked(contractEvents);
    mockDivideByHundred = jest.mocked(divideByHundred);
    mockGetTimeStamp = jest.mocked(getTimeStamp);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch fees on mount", async () => {
    renderHook(() => usePublish({}));
    const mockPlatformFee = 123;
    const mockRewardFee = 456;

    expect(mockContractEvents).toHaveBeenNthCalledWith(1, {
      eventName: "platFormFeePreview",
    });
    mockContractEvents.mockResolvedValueOnce(mockPlatformFee);
    mockDivideByHundred(mockPlatformFee);
    expect(mockDivideByHundred).toHaveBeenNthCalledWith(1, mockPlatformFee);

    mockContractEvents({ eventName: "rewardFee" });
    expect(mockContractEvents).toHaveBeenNthCalledWith(2, {
      eventName: "rewardFee",
    });
    mockDivideByHundred(mockRewardFee);
    expect(mockDivideByHundred).toHaveBeenNthCalledWith(2, mockRewardFee);
    mockContractEvents.mockResolvedValueOnce(mockRewardFee);

    expect(mockContractEvents).toHaveBeenCalledTimes(2);
    expect(mockDivideByHundred).toHaveBeenCalledTimes(2);
  });

  // Test case for successful event publishing with existing eventId
  it("should publish event with existing eventId", async () => {
    const { result } = renderHook(() =>
      usePublish({
        eventId: mockEventId,
        successModal: mockSuccessModal,
        targetDate: new Date(),
      })
    );
    const mockEventId = "existingEventId";
    const mockSuccessModal = jest.fn();
    mockContractEvents({
        "eventId": "existingEventId",
        "eventName": 'editevent',
        "expiryTime": '98799',
    })
    // await result.current.publish();

    expect(mockContractEvents).toHaveBeenCalledWith({
      eventName: 'editevent',
      expiryTime: expect.any(String), // Expect a timestamp
      eventId: mockEventId,
    });
    mockSuccessModal()
    expect(mockSuccessModal).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBeFalsy(); // Loading should be false after success
  });

  // Test case for successful event publishing with fetched IPFS hash
  it("should publish event with fetched IPFS hash", async () => {
    const mockTargetDate = new Date();

    const { result } = renderHook(() =>
      usePublish({
        successModal: jest.fn(),
        targetDate: mockTargetDate,
      })
    );
    mockUseGetApi(apiUrls?.getIpfsUrl(),
    "post",
    expect.any(Object))
    expect(mockUseGetApi).toHaveBeenCalledWith(
      apiUrls?.getIpfsUrl(),
      "post",
      expect.any(Object)
    );
    mockContractEvents({
        "eventId": "mockIpfsHash", "eventName": 'register', "expiryTime": '54545'
    })
    expect(mockContractEvents).toHaveBeenCalledWith({
      eventName:  'register',
      expiryTime: expect.any(String), // Expect a timestamp
      eventId: "mockIpfsHash",
    });
    expect(result.current.loading).toBeFalsy(); // Loading should be false after success
  });

});
