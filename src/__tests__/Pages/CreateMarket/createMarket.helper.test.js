import React from "react";
import dayjs from "dayjs";
import moment from "moment";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  modifyDate,
  getDaysAndHours,
  handleNull,
  disabledDatePickerTime,
  anyMinutes,
  defaultTargetDate,
  defaultClosureDate,
  maxDateTime,
  minDateTime,
} from "../../../Pages/CreateMarket/createMarket.helper";

dayjs.extend(customParseFormat);

jest.mock("../../../utils/appConstants", () => ({
  msgs: {
    bettingCrypto: "Betting Crypto",
    priceLevel: "Price Level",
    usdt: "USDT",
    bettingClosureTime: "Betting Closure Date & Time",
    targetDateTime: "Target Date & Time",
    eventDuration: "Event Duration",
  },
  dateFormat: {
    five: "YYYY-MM-DD | HH:mm", // default
    calendar: "YYYY-MM-DD | HH:00",
  },
}));

jest.mock("../../../utils/helpers/commonHelper", () => ({
  formatDuration: jest.fn(),
}));

describe("getDaysAndHours", () => {
  it("should return the correct gap in days and hours when targetDate is after the current time", () => {
    const startTime = new Date();
    const targetDate = dayjs(startTime)
      .add(5, "days")
      .add(12, "hours")
      .toDate(); // 5 days and 12 hours ahead
    const result = getDaysAndHours(targetDate);
    expect(result).toEqual({
      gapInDays: 5,
      gapInHours: 12,
    });
  });

  it("should return zero gap when targetDate is the same as the current time", () => {
    const now = moment().toDate();
    const result = getDaysAndHours(now);
    expect(result).toEqual({
      gapInDays: 0,
      gapInHours: 0,
    });
  });

  it("should return zero gap when targetDate is before the current time", () => {
    const pastDate = moment().subtract(1, "days").toDate(); // 1 day in the past
    const result = getDaysAndHours(pastDate);
    expect(result).toEqual({
      gapInDays: 0,
      gapInHours: 0,
    });
  });
});
describe("disabledDatePickerTime function", () => {
  // Mock minDateTime and maxDateTime for testing
  const minDateTime = modifyDate(new Date(), 24, "addHours");
  const maxDateTime = dayjs().add(365, "day");

  it("should return empty disabled hours if current is null", () => {
    const result = disabledDatePickerTime(null);
    expect(result).toEqual({});
  });

  it("should return empty disabled hours if current is undefined", () => {
    const result = disabledDatePickerTime(undefined);
    expect(result).toEqual({});
  });

  it("should return disabled hours for the same minDateTime", () => {
    const current = minDateTime;
    const { disabledHours } = disabledDatePickerTime(current);
    expect(disabledHours()).toEqual(
      Array.from({ length: 24 }, (_, i) => i).filter(
        (hour) => hour < minDateTime.hour()
      )
    );
  });

  it("should return disabled hours for the same maxDateTime", () => {
    const current = maxDateTime;
    const { disabledHours } = disabledDatePickerTime(current);
    expect(disabledHours()).toEqual(
      Array.from({ length: 24 }, (_, i) => i).filter(
        (hour) => hour > maxDateTime.hour()
      )
    );
  });
});

describe("Utility Functions", () => {
  test("handleNull should set formik values to default", () => {
    const formik = {
      setFieldValue: jest.fn(),
    };
    handleNull(formik);
    expect(formik.setFieldValue).toHaveBeenCalledWith("eventDurationDays", 0);
    expect(formik.setFieldValue).toHaveBeenCalledWith("eventDurationHours", 0);
    expect(formik.setFieldValue).toHaveBeenCalledWith("closureTime", "");
  });
});

describe("anyMinutes", () => {
  test("should return true when minutes of the provided date are not zero", () => {
    // Arrange
    const date = new Date(2024, 7, 5, 12, 15); // 15 minutes past the hour

    // Act
    const result = anyMinutes(date);

    // Assert
    expect(result).toBe(true);
  });

  test("should return false when minutes of the provided date are zero", () => {
    // Arrange
    const date = new Date(2024, 7, 5, 12, 0); // 0 minutes past the hour

    // Act
    const result = anyMinutes(date);

    // Assert
    expect(result).toBe(false);
  });

  test("should return true when no date is provided and current minutes are not zero", () => {
    // Arrange
    const currentMinutes = new Date().getMinutes();
    if (currentMinutes === 0) {
      // Ensure we have non-zero minutes for this test
      const date = new Date(2024, 7, 5, 12, 1); // Set minutes to 1
      jest.spyOn(global, "Date").mockImplementation(() => date);
    }

    // Act
    const result = anyMinutes();

    // Assert
    expect(result).toBe(true);
  });

  test("should return false when no date is provided and current minutes are zero", () => {
    // Arrange
    const date = new Date(2024, 7, 5, 12, 0); // Set minutes to 0
    jest.spyOn(global, "Date").mockImplementation(() => date);

    // Act
    const result = anyMinutes();

    // Assert
    expect(result).toBe(false);
  });

  // Optional: Edge cases for invalid input types
  test("should handle invalid input types", () => {
    // Act & Assert
    expect(anyMinutes(null)).toBe(false); // Invalid date, should default to current date which might have minutes other than 0
    expect(anyMinutes("string")).toBe(false); // Invalid date, should default to current date which might have minutes other than 0
    expect(anyMinutes({})).toBe(false); // Invalid date, should default to current date which might have minutes other than 0
  });
});

describe("modifyDate", () => {
  // Helper function to format the date for easier comparison
  const formatDate = (date) => dayjs(date).format("YYYY-MM-DD HH:mm:ss");

  it("should add hours to the date", () => {
    const date = "2024-08-01T12:00:00";
    const value = 3;
    const result = modifyDate(date, value, "addHours");
    expect(formatDate(result)).toBe(
      formatDate(
        dayjs(date)
          .add(value, "hour")
          .add(anyMinutes(date) ? 1 : 0, "hour")
      )
    );
  });

  it("should subtract hours from the date", () => {
    const date = "2024-08-01T12:00:00";
    const value = 2;
    const result = modifyDate(date, value, "minusHours");
    expect(formatDate(result)).toBe(
      formatDate(dayjs(date).subtract(value, "hour"))
    );
  });

  it("should add days to the date", () => {
    const date = "2024-08-01T12:00:00";
    const value = 5;
    const result = modifyDate(date, value, "addDays");
    expect(formatDate(result)).toBe("2024-08-10 12:00:00");
  });

  it("should return current date for unknown operation", () => {
    const result = modifyDate("2024-08-01T12:00:00", 5, "unknownOperation");
    expect(formatDate(result)).toBe(formatDate(dayjs()));
  });
});

describe("Date Constants", () => {
  const now = dayjs(); // Current date and time for comparison

  it("should correctly compute defaultTargetDate as 24 hours from now", () => {
    const expectedDefaultTargetDate = modifyDate(now.toDate(), 24, "addHours");
    expect(
      dayjs(defaultTargetDate).isSame(expectedDefaultTargetDate, "minute")
    ).toBe(true);
  });

  it("should correctly compute defaultClosureDate as 12 hours before defaultTargetDate", () => {
    const expectedDefaultClosureDate = modifyDate(
      defaultTargetDate,
      12,
      "minusHours"
    );
    expect(
      dayjs(defaultClosureDate).isSame(expectedDefaultClosureDate, "minute")
    ).toBe(true);
  });

  it("should correctly compute maxDateTime as 365 days from now", () => {
    const expectedMaxDateTime = now.add(365, "day");
    expect(dayjs(maxDateTime).isSame(expectedMaxDateTime, "day")).toBe(true);
  });

  it("should correctly compute minDateTime as equal to defaultTargetDate", () => {
    expect(dayjs(minDateTime).isSame(defaultTargetDate, "minute")).toBe(true);
  });
});

describe("handleNull", () => {
  it("should set eventDurationDays to 0", () => {
    const formik = {
      setFieldValue: jest.fn(),
    };
    handleNull(formik);
    expect(formik.setFieldValue).toHaveBeenCalledWith("eventDurationDays", 0);
  });

  it("should set eventDurationHours to 0", () => {
    const formik = {
      setFieldValue: jest.fn(),
    };
    handleNull(formik);
    expect(formik.setFieldValue).toHaveBeenCalledWith("eventDurationHours", 0);
  });

  it("should set closureTime to an empty string", () => {
    const formik = {
      setFieldValue: jest.fn(),
    };
    handleNull(formik);
    expect(formik.setFieldValue).toHaveBeenCalledWith("closureTime", "");
  });
});
