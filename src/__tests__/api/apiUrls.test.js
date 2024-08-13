import { apiUrls } from '../../api/apiUrls';
import { constructQueryString } from '../../utils/helpers/commonHelper';

// Mock the constructQueryString function
jest.mock('../../utils/helpers/commonHelper', () => ({
  constructQueryString: jest.fn(),
}));

describe('apiUrls', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  test('logout URL should be "/api/user/logout"', () => {
    expect(apiUrls.logout()).toBe('/api/user/logout');
  });

  test('checkSession URL should be "/api/user/me"', () => {
    expect(apiUrls.checkSession()).toBe('/api/user/me');
  });

  test('totalUser URL should be "/api/user/getTotalUser"', () => {
    expect(apiUrls.totalUser()).toBe('/api/user/getTotalUser');
  });

  test('getCoins URL should be "/api/currency/getTopMarket"', () => {
    expect(apiUrls.getCoins()).toBe('/api/currency/getTopMarket');
  });

  test('totalVolume URL should be "/api/user/getTotalVolume"', () => {
    expect(apiUrls.totalVolume()).toBe('/api/user/getTotalVolume');
  });

  test('raiseDispute URL should be "/api/dispute/raiseDispute"', () => {
    expect(apiUrls.raiseDispute()).toBe('/api/dispute/raiseDispute');
  });

  test('connectWallet URL should be "/api/user/connect-wallet"', () => {
    expect(apiUrls.connectWallet()).toBe('/api/user/connect-wallet');
  });

  test('profileUpload URL should be "/api/user/upload-profile"', () => {
    expect(apiUrls.profileUpload()).toBe('/api/user/upload-profile');
  });

  test('getIpfsUrl URL should be "/api/contract/createIpfsUrl"', () => {
    expect(apiUrls.getIpfsUrl()).toBe('/api/contract/createIpfsUrl');
  });

  test('totalTraded URL should be "/api/contract/totalTraded"', () => {
    expect(apiUrls.totalTraded()).toBe('/api/contract/totalTraded');
  });

  test('volumeTraded URL should be "/api/contract/volumeTraded"', () => {
    expect(apiUrls.volumeTraded()).toBe('/api/contract/volumeTraded');
  });

  test('netPositions URL should be "/api/contract/netPosition"', () => {
    expect(apiUrls.netPositions()).toBe('/api/contract/netPosition');
  });

  test('getPlatformFees URL should be "/api/contract/platFormFee"', () => {
    expect(apiUrls.getPlatformFees()).toBe('/api/contract/platFormFee');
  });

  test('disputeEvents URL should be "/api/dispute/getDisputeEvent"', () => {
    expect(apiUrls.disputeEvents()).toBe('/api/dispute/getDisputeEvent');
  });

  test('totalEvents URL should be "/api/user/getTotalEventCreators"', () => {
    expect(apiUrls.totalEvents()).toBe('/api/user/getTotalEventCreators');
  });

  test('getProfile URL should include query string', () => {
    const params = { userId: 1 };
    const queryString = '?userId=1'; // Adjust this based on actual query string format
    constructQueryString.mockReturnValue(queryString);
    
    expect(apiUrls.getProfile(params)).toBe(`/api/user/get-profile${queryString}`);
    expect(constructQueryString).toHaveBeenCalledWith(params);
  });

  test('getEvents URL should include query string', () => {
    const params = { eventId: 123 };
    const queryString = '?eventId=123'; // Adjust this based on actual query string format
    constructQueryString.mockReturnValue(queryString);
    
    expect(apiUrls.getEvents(params)).toBe(`/api/contract/getEvents${queryString}`);
    expect(constructQueryString).toHaveBeenCalledWith(params);
  });

  // Add similar tests for other methods that use constructQueryString
});
