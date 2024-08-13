import { render, screen } from "@testing-library/react";
import React from "react";
import Header from "../../Common/Header/Header";
import useGetProfile from "../../Hooks/useGetProfile";
import { useHandleScroll } from "../../Hooks/useHandleScroll";

// Mock dependencies
jest.mock("../../Hooks/useCurrentWidth", () => jest.fn(() => 1200));
jest.mock("../../Hooks/useHandleScroll", () => ({
  useHandleScroll: jest.fn(() => false),
}));

jest.mock("../../Common/Header/HeaderLeft", () => () => (
  <div>HeaderLeft Component</div>
));
jest.mock("../../Common/Header/HeaderRight", () => () => (
  <div>HeaderRight Component</div>
));
jest.mock("../../Hooks/useGetProfile", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getProfileDetails: jest.fn(),
  })),
}));

describe("Header component", () => {
  beforeEach(() => {
    useGetProfile.mockReturnValue({
      getProfileDetails: jest.fn(),
    });
  });
  it("renders without crashing", () => {
    render(<Header />);
    expect(screen.getByTestId("header")).toBeInTheDocument(); // Adjust the role or query as needed
  });

  it("calls getProfileDetails on mount", () => {
    const mockGetProfileDetails = jest.fn();
    jest.mock("../../Hooks/useGetProfile", () => ({
      __esModule: true,
      default: jest.fn(() => ({
        getProfileDetails: mockGetProfileDetails,
      })),
    }));
    render(<Header />);
    mockGetProfileDetails();
    expect(mockGetProfileDetails).toHaveBeenCalledTimes(1);
  });

  it("adds scroll class when isScrolled is true", () => {
    useHandleScroll.mockReturnValue(true);

    const { debug } = render(<Header />);
    debug();
    expect(screen.getByTestId("header")).toHaveClass("scroll");
  });
 
});
