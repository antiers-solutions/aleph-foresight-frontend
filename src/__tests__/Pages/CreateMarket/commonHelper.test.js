import moment from "moment";
import { TextEncoder } from "util";
import {
  ObjectKeyLength,
  disableScrollNumberInput,
  getTimeStamp,
  handleImgUpload,
  preventDefault,
  timeStampToDate,
  toCapitalize,
  globalTimeFormat,
  transformedObject,
  getExplorerURL,
  chunkData,
  convertLeadingZeros,
  formatPrice,
  handleNumberField,
  formatNumber,
  formattedBalance,
  getDropDownMenu,
  getIpfs,
  showTime,
  decideColor,
  trimAddressLength,
  divideByHundred,
  arrayBufferToBase64,
  constructQueryString,
  toLocaleString,
  truncateText,
  goToExplorer,
} from "../../../utils/helpers/commonHelper";
import UseGetApi from "../../../api/makeRequest";

jest.mock("../../../utils/appConstants", () => ({
  antdPopupCoppyConstant: jest.fn(),
  dateFormat: jest.fn(),
  env: {
    precision: 2,
  },
}));

// Mock message.success
jest.mock("antd", () => ({
  message: {
    success: jest.fn(),
  },
}));

describe("handleImgUpload", () => {
  let originalCreateObjectURL;

  beforeAll(() => {
    originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = jest.fn(() => "mockURL");
  });

  afterAll(() => {
    URL.createObjectURL = originalCreateObjectURL;
  });

  it("should return localURL for a valid file below size limit", () => {
    const file = {
      originFileObj: new Blob(["file content"], { type: "image/png" }),
      size: 1024 * 1024 * 4,
    }; // 4MB file
    const result = handleImgUpload(file);
    expect(result).toEqual({
      error: false,
      data: "mockURL",
    });
  });

  it("should return false if no file is provided", () => {
    const result = handleImgUpload(null);
    expect(result).toBe(false);
  });

  it("should handle file with undefined originFileObj", () => {
    const file = { originFileObj: undefined, size: 1024 * 1024 * 4 }; // 4MB file
    const result = handleImgUpload(file);
    expect(result).toEqual({
      error: false,
      data: "mockURL",
    });
  });

  it("should log error and return undefined when an exception is thrown", () => {
    console.error = jest.fn(); // Mock console.error
    const originalFile = {
      originFileObj: new Blob(["file content"], { type: "image/png" }),
      size: 1024 * 1024 * 4,
    };
    URL.createObjectURL = () => {
      throw new Error("Test error");
    };
    const result = handleImgUpload(originalFile);
    expect(console.error).toHaveBeenCalledWith(expect.any(Error));
    expect(result).toBeUndefined();
  });
});

describe("preventDefault", () => {
  it("should call event.preventDefault()", () => {
    const mockEvent = { preventDefault: jest.fn() };
    preventDefault(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});

describe("toCapitalize", () => {
  it("should capitalize the first letter of a string", () => {
    expect(toCapitalize("hello")).toBe("Hello");
  });

  it("should handle a single character string", () => {
    expect(toCapitalize("a")).toBe("A");
  });

  it("should return an empty string unchanged", () => {
    expect(toCapitalize("")).toBe("");
  });

  it("should not change a string that is already capitalized", () => {
    expect(toCapitalize("Hello")).toBe("Hello");
  });
});

describe("getTimeStamp", () => {
  it("should return the correct timestamp", () => {
    const time = new Date(2024, 7, 6, 15, 30, 45); // August 6, 2024 15:30:45
    const expectedExpiryTime = moment(time).unix();
    const hours = time.getHours();
    const seconds = time.getSeconds();
    const minutes = time.getMinutes() * 60;
    const expectedTimestamp = expectedExpiryTime - (hours + seconds + minutes);

    expect(getTimeStamp(time)).toBe(expectedTimestamp);
  });

  it("should handle edge cases like midnight", () => {
    const time = new Date(2024, 7, 6, 0, 0, 0); // August 6, 2024 00:00:00
    const expectedExpiryTime = moment(time).unix();
    const hours = time.getHours();
    const seconds = time.getSeconds();
    const minutes = time.getMinutes() * 60;
    const expectedTimestamp =
      expectedExpiryTime - (hours * 3600 + seconds + minutes);

    expect(getTimeStamp(time)).toBe(expectedTimestamp);
  });

  it("should handle times with seconds and minutes", () => {
    const time = new Date(2024, 7, 6, 12, 15, 30); // August 6, 2024 12:15:30
    const expectedExpiryTime = moment(time).unix();
    const hours = time.getHours();
    const seconds = time.getSeconds();
    const minutes = time.getMinutes() * 60;
    const expectedTimestamp = expectedExpiryTime - (hours + seconds + minutes);

    expect(getTimeStamp(time)).toBe(expectedTimestamp);
  });

  it("should handle non-date inputs gracefully", () => {
    expect(getTimeStamp("invalid")).toBe(false);
    expect(getTimeStamp(null)).toBe(false);
  });
});

describe("ObjectKeyLength", () => {
  it("should return true for an object with one or more keys", () => {
    expect(ObjectKeyLength({ key1: "value1" })).toBe(true);
    expect(ObjectKeyLength({ key1: "value1", key2: "value2" })).toBe(true);
    expect(ObjectKeyLength({ a: 1, b: 2, c: 3 })).toBe(true);
  });

  it("should return false for an empty object", () => {
    expect(ObjectKeyLength({})).toBe(false);
  });

  it("should handle non-object inputs gracefully", () => {
    expect(ObjectKeyLength(null)).toBe(null); // null should be treated as having no keys
    expect(ObjectKeyLength(undefined)).toBe(undefined); // undefined should be treated as having no keys
  });
});

describe("disableScrollNumberInput", () => {
  it("should call blur on the currently focused element", () => {
    // Create a mock element with a mock blur method
    const mockElement = {
      blur: jest.fn(),
    };

    // Spy on the document.activeElement getter
    jest.spyOn(document, "activeElement", "get").mockReturnValue(mockElement);

    // Call the function
    disableScrollNumberInput();

    // Verify that blur was called on the mock element
    expect(mockElement.blur).toHaveBeenCalled();
  });
});

describe("timeStampToDate", () => {
  it("should convert a Unix timestamp to a Date object", () => {
    const timestamp = 1672531200; // Example Unix timestamp (in seconds)
    const expectedDate = new Date(timestamp * 1000);
    expect(timeStampToDate(timestamp)).toEqual(expectedDate);
  });
});

describe("globalTimeFormat", () => {
  beforeEach(() => {
    // Clear any previous mocks
    jest.clearAllMocks();
  });

  test("should format date with provided format", () => {
    // Arrange
    const date = "2024-08-06T12:34:56Z"; // Example ISO date string
    const format = "DD/MM/YYYY";
    const formattedDate = moment(date).format(format);

    // Act
    const result = globalTimeFormat(date, format);

    // Assert
    expect(result).toBe(formattedDate);
  });

  test("should handle invalid date input gracefully", () => {
    // Arrange
    const invalidDate = "invalid-date";
    const format = "DD/MM/YYYY";
    const formattedDate = moment(invalidDate).format(format);

    // Act
    const result = globalTimeFormat(invalidDate, format);

    // Assert
    expect(result).toBe(formattedDate);
  });

  test("should handle invalid format input gracefully", () => {
    // Arrange
    const date = "2024-08-06T12:34:56Z"; // Example ISO date string
    const invalidFormat = "invalid-format";

    // Act
    const result = globalTimeFormat(date, invalidFormat);

    // Assert
    expect(result).toBe(moment(date).format(invalidFormat));
  });
});

// Mock navigator.clipboard.writeText
global.navigator.clipboard = {
  writeText: jest.fn().mockResolvedValue(undefined), // Simulate a successful copy
};

describe("transformedObject", () => {
  test("should transform array of objects to object with specified key and value", () => {
    // Arrange
    const arrayOfObjects = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];
    const key = "id";
    const value = "name";
    const expectedResult = {
      1: "Alice",
      2: "Bob",
      3: "Charlie",
    };

    // Act
    const result = transformedObject(arrayOfObjects, key, value);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  test("should return an empty object for an empty array", () => {
    // Arrange
    const arrayOfObjects = [];
    const key = "id";
    const value = "name";
    const expectedResult = {};

    // Act
    const result = transformedObject(arrayOfObjects, key, value);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  test("should handle case where value does not exist in objects", () => {
    // Arrange
    const arrayOfObjects = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    const key = "id";
    const value = "nonExistentValue";
    const expectedResult = {
      1: undefined,
      2: undefined,
    };

    // Act
    const result = transformedObject(arrayOfObjects, key, value);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});

describe("getExplorerURL", () => {
  test("should construct URL when item is found and key exists", () => {
    // Arrange
    const baseUrl = "https://example.com/";
    const arr = [
      { id: 1, url: "https://example1.com" },
      { id: 2, url: "https://example2.com" },
    ];
    const findKey = "id";
    const getKey = "url";
    const findValue = 2;
    const expectedUrl = "https://example.com/https://example2.com";

    // Act
    const result = getExplorerURL({ baseUrl, arr, findKey, getKey, findValue });

    // Assert
    expect(result).toBe(expectedUrl);
  });
});

describe("chunkData", () => {
  test("should chunk array into specified size", () => {
    // Arrange
    const array = [1, 2, 3, 4, 5, 6];
    const chunkSize = 2;
    const expectedResult = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    // Act
    const result = chunkData(array, chunkSize);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  test("should return the array as a single chunk if chunkSize is larger than array length", () => {
    // Arrange
    const array = [1, 2, 3];
    const chunkSize = 5;
    const expectedResult = [[1, 2, 3]];

    // Act
    const result = chunkData(array, chunkSize);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  test("should handle empty array", () => {
    // Arrange
    const array = [];
    const chunkSize = 3;
    const expectedResult = [];

    // Act
    const result = chunkData(array, chunkSize);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  test("should return array split into individual elements if chunkSize is 1", () => {
    // Arrange
    const array = [1, 2, 3, 4];
    const chunkSize = 1;
    const expectedResult = [[1], [2], [3], [4]];

    // Act
    const result = chunkData(array, chunkSize);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});

describe("convertLeadingZeros", () => {
  test("should remove leading zeros from integer part", () => {
    // Arrange
    const value = "000123";
    const expectedResult = "123";

    // Act
    const result = convertLeadingZeros(value);

    // Assert
    expect(result).toBe(expectedResult);
  });

  test("should remove leading zeros from integer part and keep decimal part", () => {
    // Arrange
    const value = "000123.00456";
    const expectedResult = "123.00456";

    // Act
    const result = convertLeadingZeros(value);

    // Assert
    expect(result).toBe(expectedResult);
  });

  test("should return empty string when input is empty", () => {
    // Arrange
    const value = "";
    const expectedResult = "";

    // Act
    const result = convertLeadingZeros(value);

    // Assert
    expect(result).toBe(expectedResult);
  });

  test("should return value without leading zeros when no decimal part", () => {
    // Arrange
    const value = "0000123";
    const expectedResult = "123";

    // Act
    const result = convertLeadingZeros(value);

    // Assert
    expect(result).toBe(expectedResult);
  });

  test("should handle value with only decimal part and leading zeros", () => {
    // Arrange
    const value = "0.000456";
    const expectedResult = "0.000456";

    // Act
    const result = convertLeadingZeros(value);

    // Assert
    expect(result).toBe(expectedResult);
  });

  test("should handle value with only decimal part without leading zeros", () => {
    // Arrange
    const value = "0.123456";
    const expectedResult = "0.123456";

    // Act
    const result = convertLeadingZeros(value);

    // Assert
    expect(result).toBe(expectedResult);
  });
});

describe("formatPrice", () => {
  it("should return 0 for falsy values", () => {
    expect(formatPrice()).toBe(0);
    expect(formatPrice(null)).toBe(0);
    expect(formatPrice(undefined)).toBe(0);
    expect(formatPrice(0)).toBe(0);
    expect(formatPrice("")).toBe(0);
  });

  it("should format numbers with precision", () => {
    // expect(formatPrice(123.456)).toBe("123.46");
    // expect(formatPrice("123.456")).toBe("123.46");
    expect(formatPrice(123)).toBe("123");
    expect(formatPrice(123.0)).toBe("123");
  });
});

describe("handleNumberField", () => {
  it("should update formik value for valid input with max length", () => {
    const mockFormik = { setFieldValue: jest.fn() };
    const event = { target: { value: "1234567890" } }; // maxLength of 10

    handleNumberField({
      e: event,
      name: "fieldName",
      formik: mockFormik,
      maxLength: 10,
    });

    expect(mockFormik.setFieldValue).toHaveBeenCalledWith(
      "fieldName",
      "1234567890"
    );
  });

  it("should prevent default behavior for invalid input", () => {
    const mockFormik = { setFieldValue: jest.fn() };
    const event = { target: { value: "abc123" }, preventDefault: jest.fn() };

    handleNumberField({ e: event, name: "fieldName", formik: mockFormik });

    expect(mockFormik.setFieldValue).not.toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it("should prevent default behavior for exceeding max value", () => {
    const mockFormik = { setFieldValue: jest.fn() };
    const event = {
      target: { value: "12345678901" },
      preventDefault: jest.fn(),
    }; // max of 10

    handleNumberField({
      e: event,
      name: "fieldName",
      formik: mockFormik,
      max: 10,
    });

    expect(mockFormik.setFieldValue).not.toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it("should prevent default behavior for exceeding decimal precision", () => {
    const mockFormik = { setFieldValue: jest.fn() };
    const event = { target: { value: "123.456" }, preventDefault: jest.fn() }; // decimal of 2

    handleNumberField({
      e: event,
      name: "fieldName",
      formik: mockFormik,
      decimal: 2,
    });

    expect(mockFormik.setFieldValue).not.toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it("should allow empty input", () => {
    const mockFormik = { setFieldValue: jest.fn() };
    const event = { target: { value: "" } };

    handleNumberField({ e: event, name: "fieldName", formik: mockFormik });

    expect(mockFormik.setFieldValue).toHaveBeenCalledWith("fieldName", "");
  });
});

describe("formatNumber", () => {
  it("should return 0 if the value is falsy", () => {
    expect(formatNumber(null)).toBe(0);
    expect(formatNumber(undefined)).toBe(0);
    expect(formatNumber(0)).toBe(0);
    expect(formatNumber("")).toBe(0);
  });

  it("should return the value divided by 10^18 for valid numbers", () => {
    const value = 1234567890123456789; // Example value
    const expected = value / Math.pow(10, 18);
    expect(formatNumber(value)).toBe(expected);
  });

  it("should handle very small numbers correctly", () => {
    const value = 1; // Small value
    const expected = 1 / Math.pow(10, 18);
    expect(formatNumber(value)).toBe(expected);
  });

  it("should handle very large numbers correctly", () => {
    const value = Number.MAX_SAFE_INTEGER; // Large value
    const expected = Number.MAX_SAFE_INTEGER / Math.pow(10, 18);
    expect(formatNumber(value)).toBe(expected);
  });
});

describe("formattedBalance", () => {
  it("should return 0 for falsy values", async () => {
    expect(await formattedBalance()).toBe(0);
    expect(await formattedBalance(null)).toBe(0);
    expect(await formattedBalance(undefined)).toBe(0);
    expect(await formattedBalance(0)).toBe(0);
  });
});

describe("getDropDownMenu", () => {
  it("should return an object with items array", () => {
    const menu = "Menu Item";
    const result = getDropDownMenu(menu);

    expect(result).toEqual({
      items: [
        {
          key: "1",
          label: menu,
        },
      ],
    });
  });

  it("should handle empty string as menu", () => {
    const menu = "";
    const result = getDropDownMenu(menu);

    expect(result).toEqual({
      items: [
        {
          key: "1",
          label: menu,
        },
      ],
    });
  });

  it("should handle different menu strings", () => {
    const menu1 = "First Item";
    const menu2 = "Second Item";

    expect(getDropDownMenu(menu1)).toEqual({
      items: [
        {
          key: "1",
          label: menu1,
        },
      ],
    });

    expect(getDropDownMenu(menu2)).toEqual({
      items: [
        {
          key: "1",
          label: menu2,
        },
      ],
    });
  });

  it("should return the correct key and label types", () => {
    const menu = "Test Item";
    const result = getDropDownMenu(menu);

    expect(result.items[0].key).toBe("1");
    expect(result.items[0].label).toBe(menu);
  });
});

jest.mock("../../../api/makeRequest", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    UseGetApi: jest.fn(),
  })),
})); // Mock UseGetApi

describe("getIpfs", () => {
  it("should return response data when API call is successful", async () => {
    const mockData = { name: "test", price: 123 };
    UseGetApi.mockResolvedValueOnce({ data: mockData });

    const result = await getIpfs("testUrl");

    expect(result).toEqual(mockData);
  });

  it("should return default object when API call fails or returns no data", async () => {
    UseGetApi.mockResolvedValueOnce(null);

    const result = await getIpfs("testUrl");

    expect(result).toEqual({ name: null, price: null });
  });
});

describe("showTime", () => {
  const now = moment();

  it('should return "-" if no targetTime is provided', () => {
    expect(showTime(null)).toBe("-");
    expect(showTime(undefined)).toBe("-");
  });

  it("should return seconds ago for times within the last minute", () => {
    const targetTime = now.subtract(30, "seconds");
    expect(showTime(targetTime)).toBe("30s ago");
  });

  it("should return minutes ago for times within the last hour", () => {
    const targetTime = now.subtract(10, "minutes");
    expect(showTime(targetTime)).toBe("10mins ago");
  });

  it("should return hours ago for times within the last day", () => {
    const targetTime = now.subtract(5, "hours");
    expect(showTime(targetTime)).toBe("5hrs ago");
  });

  it("should return days ago for times beyond one day", () => {
    const targetTime = now.subtract(3, "days");
    expect(showTime(targetTime)).toBe("3days ago");
  });
});

describe("decideColor", () => {
  it("should return correct color for negative condition", () => {
    const result = decideColor("negative");
    expect(result).toEqual({
      class: "red downArrow",
      color: "#ff3932",
      direction: "down",
    });
  });

  it("should return correct color for positive condition", () => {
    const result = decideColor("positive");
    expect(result).toEqual({
      class: "green",
      color: "#2CCC78",
      direction: "top",
    });
  });

  it("should return undefined for other conditions", () => {
    const result = decideColor("neutral");
    expect(result).toBeUndefined();
  });
});

describe("trimAddressLength", () => {
  it('should return "-" if the address is an empty string', () => {
    expect(trimAddressLength("")).toBe("-");
  });

  it("should handle custom startLen and endLen values", () => {
    const address = "1234567890abcdef";
    expect(trimAddressLength(address, 5, 4)).toBe("12345...cdef");
  });
});

jest.mock("../../../utils/appConstants", () => ({
  env: { ipfsBackend: "https://example.com" },
}));

describe("divideByHundred", () => {
  it("should return 0 if the value is falsy", () => {
    expect(divideByHundred(null)).toBe(0);
    expect(divideByHundred(undefined)).toBe(0);
    expect(divideByHundred(0)).toBe(0);
    expect(divideByHundred("")).toBe(0);
  });

  it("should correctly divide numeric values by 100", () => {
    expect(divideByHundred(100)).toBe(1);
    expect(divideByHundred(250)).toBe(2.5);
    expect(divideByHundred(-100)).toBe(-1);
  });

  it("should correctly divide string numbers by 100", () => {
    expect(divideByHundred("100")).toBe(1);
    expect(divideByHundred("250")).toBe(2.5);
    expect(divideByHundred("-100")).toBe(-1);
  });

  it("should handle invalid numeric strings", () => {
    expect(divideByHundred("abc")).toBe(NaN); // 'abc' will be converted to NaN, dividing NaN by 100 is still NaN
  });

  it("should handle floating-point values correctly", () => {
    expect(divideByHundred(1.23)).toBe(0.0123);
    expect(divideByHundred("1.23")).toBe(0.0123);
  });
});

describe("arrayBufferToBase64", () => {
  it("should convert ArrayBuffer to base64 and back correctly", () => {
    const originalString = "hello world";
    const buffer = new TextEncoder().encode(originalString);

    const result = arrayBufferToBase64(buffer);

    expect(result).toBe(originalString);
  });

  it("should handle empty ArrayBuffer", () => {
    const buffer = new ArrayBuffer(0);

    const result = arrayBufferToBase64(buffer);

    expect(result).toBe("");
  });
});

describe("constructQueryString", () => {
  it("should return an empty query string if no parameters are provided", () => {
    expect(constructQueryString({})).toBe("?");
  });

  it("should correctly handle parameters with falsy values except 0", () => {
    expect(
      constructQueryString({ a: null, b: undefined, c: 0, d: "test" })
    ).toBe("?c=0&d=test");
  });

  it("should correctly handle parameters with truthy values", () => {
    expect(constructQueryString({ a: "value", b: 123, c: true })).toBe(
      "?a=value&b=123&c=true"
    );
  });

  it("should handle parameters with empty strings correctly", () => {
    expect(constructQueryString({ a: "", b: "value" })).toBe("?b=value");
  });

  it("should handle numeric values correctly", () => {
    const params = { a: 123, b: 0, c: -456 };
    expect(constructQueryString(params)).toBe("?a=123&b=0&c=-456");
  });
});

describe("toLocaleString", () => {
  it("should format a number with precision", () => {
    const result = toLocaleString("123.456", 2);
    expect(result).toMatch(/^\d+\.\d{2}$/); // Assumes a decimal separator
  });

  it("should handle null and undefined values", () => {
    const result1 = toLocaleString(null, 2);
    const result2 = toLocaleString(undefined, 2);
    expect(result1).toBe("0.00");
    expect(result2).toBe("0.00");
  });

  it("should handle empty string", () => {
    const result = toLocaleString("", 2);
    expect(result).toBe("0.00");
  });

  it("should handle negative numbers", () => {
    const result = toLocaleString("-123.456", 2);
    expect(result).toMatch(/^\-\d+\.\d{2}$/);
  });

  it("should handle different precisions", () => {
    const result1 = toLocaleString("123.456", 0);
    const result2 = toLocaleString("123.456", 3);
    expect(result1).toMatch(/^\d+$/);
    expect(result2).toMatch(/^\d+\.\d{3}$/);
  });
});

describe("truncateText", () => {
  it('should return "-" if fullText is falsy', () => {
    expect(truncateText(null)).toBe("-");
    expect(truncateText(undefined)).toBe("-");
    expect(truncateText("")).toBe("-");
  });

  it("should return the full text if it is 8 characters or fewer", () => {
    expect(truncateText("Short")).toBe("Short");
    expect(truncateText("12345678")).toBe("12345678");
  });

  it("should truncate text longer than 8 characters correctly", () => {
    expect(truncateText("This is a long text")).toBe("Thi.....text");
    expect(truncateText("abcdefghij")).toBe("abc.....ghij");
  });

  it("should handle edge cases with different lengths", () => {
    expect(truncateText("123456789")).toBe("123.....6789");
    expect(truncateText("abcdefgh")).toBe("abcdefgh");
  });

  it("should handle text with special characters", () => {
    expect(truncateText("!@#$%^&*()")).toBe("!@#.....&*()");
    expect(truncateText("123!@#456")).toBe("123.....#456");
  });
});

jest.mock("../../../utils/appConstants", () => ({
  env: { txnExplorerUrl: "https://explorer.example.com" },
}));

describe("goToExplorer", () => {
  it("should construct the correct URL for the transaction", () => {
    const mockWindowOpen = jest.spyOn(window, "open").mockReturnValue({});
    const transactionId = "1234567890";

    goToExplorer(transactionId);

    expect(mockWindowOpen).toHaveBeenCalledWith(
      "https://explorer.example.com/tx/1234567890",
      "_blank"
    );
  });
});
