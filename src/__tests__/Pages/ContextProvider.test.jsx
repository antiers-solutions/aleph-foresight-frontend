import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useGetCoins } from '../../Hooks/useGetCoins'; // Adjust the import path
import { Context, ContextProvider } from '../../Pages/ContextProvider/ContextProvider';

// Mock the useGetCoins hook
jest.mock('../../Hooks/useGetCoins', () => ({
  useGetCoins: jest.fn(),
}));

describe('ContextProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('provides context values correctly', async () => {
    // Mock the useGetCoins hook return values
    useGetCoins.mockReturnValue({
      coinList: [{ symbol: 'BTC', iconUrl: 'url1' }],
      coinUrl: { BTC: 'url1' },
      isLoading: false,
    });

    // Render the component with a test child
    const TestComponent = () => {
      const context = React.useContext(Context);
      return (
        <div>
          <div data-testid="coin-list">{JSON.stringify(context.coinList)}</div>
          <div data-testid="coin-url">{JSON.stringify(context.coinUrl)}</div>
          <div data-testid="is-loading">{context.isLoading.toString()}</div>
        </div>
      );
    };

    render(
      <ContextProvider>
        <TestComponent />
      </ContextProvider>
    );

    // Wait for any async operations
    await waitFor(() => {
      // Check if the context values are correctly provided
      expect(screen.getByTestId('coin-list').textContent).toBe(
        JSON.stringify([{ symbol: 'BTC', iconUrl: 'url1' }])
      );
      expect(screen.getByTestId('coin-url').textContent).toBe(
        JSON.stringify({ BTC: 'url1' })
      );
      expect(screen.getByTestId('is-loading').textContent).toBe('false');
    });
  });

  // Add more tests as needed, such as testing the initial state or interactions
});
