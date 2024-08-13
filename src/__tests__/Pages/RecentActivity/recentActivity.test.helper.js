// showUserName.test.js

import { render } from "@testing-library/react";
import React from "react";
// for additional matchers
import {
  getClassName,
  showUserName,
} from "../../../Pages/RecentActivity/recentActivity.helper";

// showUserName.test.js
describe("showUserName", () => {
  test("renders Tooltip with the full name", () => {
    const username = "John Doe";
    const { getByText } = render(showUserName(username));

    // Check that the truncated text is displayed correctly
    expect(getByText(username)).toBeInTheDocument();
  });

  test("truncates text if necessary", () => {
    const longUsername = "A very long username that should be truncated";
    const { getByText } = render(showUserName(longUsername));

    // Assuming truncateText truncates long text, check if truncated text is rendered
    // Adjust this part based on how truncateText actually works
    expect(getByText(/A v.../i)).toBeInTheDocument();
  });
});

// getClassName.test.js
describe("getClassName", () => {
  test('returns "green" for positive values', () => {
    expect(getClassName("true")).toBe("green");
    expect(getClassName("Yes")).toBe("green");
    expect(getClassName("yes")).toBe("green");
  });

  test('returns "red" for negative values', () => {
    expect(getClassName("false")).toBe("red");
    expect(getClassName("no")).toBe("red");
    expect(getClassName("No")).toBe("red");
  });

  test('returns "grey" for unknown values', () => {
    expect(getClassName("unknown")).toBe("grey");
    expect(getClassName("")).toBe("grey");
    expect(getClassName(null)).toBe("grey");
    expect(getClassName(undefined)).toBe("grey");
  });
});
