// HeaderMenu.test.js
import React from 'react';
import { render } from '@testing-library/react';
import HeaderMenu from '../../Common/Header/Menu/HeaderMenu';
import CustomList from '../../Common/CustomList/CustomList';
import { headerMenuData } from '../../utils/appConstants';

// Mocking CustomList component
jest.mock('../../Common/CustomList/CustomList', () => {
  return jest.fn(() => <div>Mocked CustomList</div>);
});

describe('HeaderMenu', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const { container } = render(<HeaderMenu />);
    expect(container).toBeInTheDocument();
  });

  it('should render with the given className', () => {
    const className = 'testClassName';
    const { container } = render(<HeaderMenu className={className} />);
    expect(container.firstChild).toHaveClass(`headerLink ${className}`);
  });

  it('should render CustomList with correct props', () => {
    render(<HeaderMenu />);
    expect(CustomList).toHaveBeenCalledWith(
      expect.objectContaining({
        list: headerMenuData,
        liClassName: 'headerLink_menu_item',
        ulClassName: 'headerLink_menu',
        linkClasName: 'active'
      }),
      {}
    );
  });
});
