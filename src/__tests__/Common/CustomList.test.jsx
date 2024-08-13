import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CustomList from "../../Common/CustomList/CustomList";

// Mock the Tooltip component
jest.mock("antd", () => ({
  Tooltip: ({ title, children }) => <div title={title}>{children}</div>,
}));

describe("CustomList", () => {
  const mockList = [
    { label: "Home", to: "/", icon: <span>🏠</span> },
    { label: "Profile", to: "/profile", icon: <span>👤</span> },
    { label: "Points", to: "/points", icon: <span>⭐</span> },
  ];

  it("renders list items with links and icons", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CustomList
          list={mockList}
          liClassName="list-item"
          ulClassName="list"
          linkClasName="active-link"
        />
      </MemoryRouter>
    );

    // Check if the list items are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Points")).toBeInTheDocument();

    // Check if icons are rendered
    expect(screen.getByText("🏠")).toBeInTheDocument();
    expect(screen.getByText("👤")).toBeInTheDocument();
    expect(screen.getByText("⭐")).toBeInTheDocument();
  });

  it("applies the correct className to the active link", () => {
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <CustomList
          list={mockList}
          liClassName="list-item"
          ulClassName="list"
          linkClasName="active-link"
        />
      </MemoryRouter>
    );

    // Check if the correct link has the active class
    expect(screen.getByText("Profile")).toHaveClass("active-link");
    expect(screen.queryByText("Home")).not.toHaveClass("active-link");
    expect(screen.queryByText("Points")).not.toHaveClass("active-link");
  });

  it("renders a tooltip for items with the label 'Points'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CustomList
          list={mockList}
          liClassName="list-item"
          ulClassName="list"
          linkClasName="active-link"
        />
      </MemoryRouter>
    );

    // Check if the tooltip is rendered for the "Points" item
    const pointsElement = screen.getByText("Points").closest("div");
    expect(pointsElement).toHaveAttribute("title", "Coming Soon");
  });

  it("renders list items without tooltips if the label is not 'Points'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CustomList
          list={mockList}
          liClassName="list-item"
          ulClassName="list"
          linkClasName="active-link"
        />
      </MemoryRouter>
    );

    // Ensure tooltips are not present for non-"Points" items
    expect(screen.queryByText("Home").closest("div")).not.toHaveAttribute(
      "title"
    );
    expect(screen.queryByText("Profile").closest("div")).not.toHaveAttribute(
      "title"
    );
  });
});
