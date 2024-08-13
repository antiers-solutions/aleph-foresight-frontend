import { renderHook, act } from '@testing-library/react-hooks';
import { apiUrls } from '../../api/apiUrls';
import UseGetApi from '../../api/makeRequest';
import { useGetCoins } from '../../Hooks/useGetCoins';
import { transformedObject } from '../../utils/helpers/commonHelper';

// Mock the UseGetApi module
jest.mock('../../api/makeRequest', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the transformedObject function
jest.mock('../../utils/helpers/commonHelper', () => ({
  transformedObject: jest.fn(),
}));

describe('useGetCoins', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with loading state', () => {
    UseGetApi.mockResolvedValue({ data: { data: { Currency: [] } } });
    const { result } = renderHook(() => useGetCoins());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.coinList).toEqual([]);
    expect(result.current.coinUrl).toEqual({});
    expect(result.current.error).toBeNull();
  });

  test('should update state with fetched data', async () => {
    const mockData = { data: { Currency: [{ symbol: 'BTC', iconUrl: 'url1' }] } };
    const transformedData = { BTC: 'url1' };
    UseGetApi.mockResolvedValue(mockData);
    transformedObject.mockReturnValue(transformedData);

    const { result, waitForNextUpdate } = renderHook(() => useGetCoins());

    // Wait for useEffect to complete
    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.coinUrl).toEqual(transformedData);
    expect(result.current.error).toBeNull();
  });

  test('should handle errors correctly', async () => {
    const mockError = new Error('Something went wrong');
    UseGetApi.mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useGetCoins());

    // Wait for useEffect to complete
    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.coinList).toEqual([]);
    expect(result.current.coinUrl).toEqual({});
    expect(result.current.error).toBe(mockError);
  });
});
