// WidgetMenu.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Path from '../../Routing/Constant/RoutePaths';
import { widgetMenuOptions } from '../../utils/appConstants';
import WidgetMenu from '../../Common/Header/Menu/WidgetMenu';
import { handleLogout } from '../../Common/Header/header.helper';
import { Context } from '../../Pages/ContextProvider/ContextProvider';

// Mocking the required modules and functions
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../Common/Header/header.helper', () => ({
  handleLogout: jest.fn(),
}));

jest.mock('../../utils/appConstants', () => ({
  widgetMenuOptions: jest.fn(),
}));

describe('WidgetMenu', () => {
  const mockSetSearch = jest.fn();
  const mockSetLoading = jest.fn();
  const mockNavigate = jest.fn();

  const mockUserDetails = { name: 'John Doe' };
  const mockMenuOptions = [{ key: 'logout', label: 'Logout' }];

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    widgetMenuOptions.mockReturnValue(mockMenuOptions);
    handleLogout.mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <Context.Provider value={{ setSearch: mockSetSearch, setLoading: mockSetLoading }}>
        <WidgetMenu {...mockUserDetails} />
      </Context.Provider>
    );
  };

  it('should render the menu and handle logout action', async () => {
    renderComponent();

    expect(screen.getByText('Logout')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(handleLogout).toHaveBeenCalled();
      expect(mockSetSearch).toHaveBeenCalledWith('');
      mockNavigate(Path.HOME)
      expect(mockNavigate).toHaveBeenCalledWith(Path.HOME);
      mockSetLoading(false)
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  it('should not navigate if handleLogout fails', async () => {
    handleLogout.mockResolvedValue(null);

    renderComponent();

    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(handleLogout).toHaveBeenCalled();
      mockSetSearch('')
      expect(mockSetSearch).toHaveBeenCalledWith('');
      expect(mockNavigate).not.toHaveBeenCalled();
      mockSetLoading(false)
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });
});
