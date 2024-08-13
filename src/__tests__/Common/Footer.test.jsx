import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../Common/Footer/Footer";
import { msgs } from "../../utils/appConstants";
import CustomList from "../../Common/CustomList/CustomList";
import { socialLink, footerMenu } from "../../Common/Footer/footer.helper";

// Mock the BetBig and CustomList components
jest.mock("../../Common/CustomList/CustomList", () =>
  jest.fn(({ list }) => (
    <ul>
      {list.map((item, index) => (
        <li key={index}>{item.label || "Social Link"}</li>
      ))}
    </ul>
  ))
);
jest.mock("react-router-dom", () => ({
  useLocation: () => jest.fn(),
}));
describe("Footer Component", () => {
  test("renders BetBig component", () => {
    render(<Footer />);

    // Check if the BetBig component is rendered
    expect(
      screen.getByText(new RegExp(msgs.betBigText?.question, "i"))
    ).toBeInTheDocument();
  });

  test("renders CustomList with footerMenu and socialLink", () => {
    render(<Footer />);
    expect(CustomList).toHaveBeenCalledWith(
      { list: footerMenu, linkClasName: "active" },
      {}
    );

    // Check if CustomList is called with socialLink
    expect(CustomList).toHaveBeenCalledWith({ list: socialLink }, {});
  });
});
