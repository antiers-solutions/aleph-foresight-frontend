import React from "react";
import { render, screen } from "@testing-library/react";
import { msgs } from "../../utils/appConstants";
import BetBig from "../../Common/Footer/BetBig/BetBig";

// Mock the VerLogo image import
jest.mock("../../assets/VerLogo.png", () => "mocked-logo.png");

describe("BetBig Component", () => {
  test("renders logo image with correct src and alt attributes", () => {
    render(<BetBig />);

    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "mocked-logo.png");
  });

  test("renders heading text with correct content", () => {
    const expectedQuestion = msgs.betBigText?.question;
    const expectedAnswer = msgs.betBigText?.answer;

    render(<BetBig />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(expectedQuestion);
    expect(heading).toHaveTextContent(expectedAnswer);
  });
});
