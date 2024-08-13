import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { msgs } from '../../../utils/appConstants';
import usePublish from '../../../Hooks/usePublish';
import PreviewModal from '../../../Pages/CreateMarket/PreviewModal';

// Mock dependencies
jest.mock('../../../Hooks/usePublish', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    publish: jest.fn(),
    loading: false,
    fees: { platformFee: 5, rewards: 10 }
  }))
}));

jest.mock('../../../assets/StoreAsset/StoreAsset', () => ({
  InfoIcon: () => <div>InfoIcon</div>
}));

jest.mock('../../../utils/appConstants', () => ({
  msgs: {
    previewEvent: 'Preview Event',
    platformFee: 'Platform Fee',
    rewards: 'Rewards',
    toolTip: {
      platformFee: 'Platform fee description',
      reward: 'Reward description'
    },
    back: 'Back',
    publish: 'Publish'
  }
}));

describe('PreviewModal Component', () => {
  const defaultProps = {
    show: true,
    eventEdited: false,
    eventId: 1,
    coinUrl: 'http://example.com/coin',
    handleCancel: jest.fn(),
    successModal: jest.fn(),
    values: {
      closureTime: new Date(),
      priceLevel: 100,
      targetDate: new Date(),
      coin: 'Bitcoin',
      eventDurationDays: 1,
      eventDurationHours: 2
    }
  };

  it('should render without crashing', () => {
    render(<PreviewModal {...defaultProps} />);
    expect(screen.getByText(msgs.previewEvent)).toBeInTheDocument();
  });

  it('should display details correctly', () => {
    render(<PreviewModal {...defaultProps} />);
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText(/1 Day | 2 Hours/i)).toBeInTheDocument();
    expect(screen.getByText('Platform Fee')).toBeInTheDocument();
    expect(screen.getByText('Rewards')).toBeInTheDocument();
  });

  it('should call handleCancel when back button is clicked', () => {
    render(<PreviewModal {...defaultProps} />);
    fireEvent.click(screen.getByText(msgs.back));
    expect(defaultProps.handleCancel).toHaveBeenCalled();
  });

  it('should call publish when publish button is clicked', () => {
    const publishMock = jest.fn();
    usePublish.mockReturnValue({
      publish: publishMock,
      loading: false,
      fees: { platformFee: 5, rewards: 10 }
    });
    render(<PreviewModal {...defaultProps} />);
    fireEvent.click(screen.getByText(msgs.publish));
    expect(publishMock).toHaveBeenCalled();
  });

  it('should display a loading spinner when loading is true', () => {
    usePublish.mockReturnValue({
      publish: jest.fn(),
      loading: true,
      fees: { platformFee: 5, rewards: 10 }
    });
    render(<PreviewModal {...defaultProps} />);
    const infoicons = screen.getAllByText(/InfoIcon/i);

    expect(infoicons).toHaveLength(2);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2); // Verify spinner is displayed
  });
});
