// ActivityProfile.test.js
import React from 'react'
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useGetActivity } from "../../../Hooks/useGetActivity";
import { useTablePagination } from "../../../Hooks/useTablePagination";
import ActivityProfile from "../../../Pages/Profile/InfoTable/ActivityProfile.jsx";

// Mock window.matchMedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: true,
      addListener: function () {},
      removeListener: function () {},
    };
  };

jest.mock("antd", () => {
  return {
    Skeleton: jest.fn(({ active }) =>
      active ? <div>loading</div> : null
    ),
  };
});
// Mock the hooks
jest.mock("../../../Hooks/useGetActivity", () => ({
  useGetActivity: jest.fn(),
}));

jest.mock("../../../Hooks/useTablePagination", () => ({
  useTablePagination: jest.fn(),
})); 

describe('ActivityProfile Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should render a skeleton loader when loading', () => {
    useGetActivity.mockReturnValue({
      metaData: { loading: true },
      getActivities: jest.fn(),
      activityProfileColumns: [],
      onRowActivityProfile: jest.fn()
    });
    useTablePagination.mockReturnValue({
      handleTableChange: jest.fn(),
      tableParams: {},
      setParams: jest.fn()
    });

    render(<ActivityProfile key="test" />);

    expect(screen.getByTestId('skeleton-container')).toBeInTheDocument();
  });

//   it('should render table with data when not loading', async () => {
//     const mockData = [{ key: '1', name: 'Activity 1' }];
//     useGetActivity.mockReturnValue({
//       metaData: {
//         loading: false,
//         data: mockData,
//         total: 20
//       },
//       getActivities: jest.fn(),
//       activityProfileColumns: [{ title: 'Name', dataIndex: 'name', key: 'name' }],
//       onRowActivityProfile: jest.fn()
//     });
//     useTablePagination.mockReturnValue({
//       handleTableChange: jest.fn(),
//       tableParams: { pagination: { pageSize: 10 } },
//       setParams: jest.fn()
//     });

//     render(<ActivityProfile key="test" />);

//     // Check if table is rendered
//     expect(screen.getByRole('table')).toBeInTheDocument();

//     // Check if table data is present
//     await waitFor(() => {
//       expect(screen.getByText('Activity 1')).toBeInTheDocument();
//     });
//   });

//   it('should handle pagination correctly', () => {
//     useGetActivity.mockReturnValue({
//       metaData: {
//         loading: false,
//         data: [{ key: '1', name: 'Activity 1' }],
//         total: 20
//       },
//       getActivities: jest.fn(),
//       activityProfileColumns: [{ title: 'Name', dataIndex: 'name', key: 'name' }],
//       onRowActivityProfile: jest.fn()
//     });
//     useTablePagination.mockReturnValue({
//       handleTableChange: jest.fn(),
//       tableParams: { pagination: { pageSize: 10, current: 1 } },
//       setParams: jest.fn()
//     });

//     render(<ActivityProfile key="test" />);

//     // Verify pagination setup
//     expect(screen.getByRole('table')).toBeInTheDocument();
//     // Additional checks on pagination could be added if needed
//   });
});
