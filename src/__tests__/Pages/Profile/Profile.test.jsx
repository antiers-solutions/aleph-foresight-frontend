// Profile.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import UserDetails from '../../../Pages/Profile/Userdetails/UserDetails';
import InfoCard from '../../../Pages/Profile/InfoCard/InfoCard';
import InfoTable from '../../../Pages/Profile/InfoTable/InfoTable';
import Profile from '../../../Pages/Profile/Profile';

// Mock child components
jest.mock('../../../Pages/Profile/Userdetails/UserDetails', () => () => <div>UserDetails</div>);
jest.mock('../../../Pages/Profile/InfoCard/InfoCard', () => () => <div>InfoCard</div>);
jest.mock('../../../Pages/Profile/InfoTable/InfoTable', () => () => <div>InfoTable</div>);

describe('Profile', () => {
  test('renders UserDetails, InfoCard, and InfoTable components', () => {
    render(<Profile />);

    // Check if all child components are present in the document
    expect(screen.getByText('UserDetails')).toBeInTheDocument();
    expect(screen.getByText('InfoCard')).toBeInTheDocument();
    expect(screen.getByText('InfoTable')).toBeInTheDocument();
  });
});
