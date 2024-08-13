import { render, screen } from "@testing-library/react";
import React from "react";
import { msgs } from "../../utils/appConstants";
import UploadFileCommon from "../../Common/UploadFileCommon/UploadFileCommon";

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  Spin: ({ children, spinning }) =>
    spinning ? <div data-testid="spin">Loading...</div> : children,
  Upload: ({ children, ...props }) => (
    <div data-testid="upload" {...props}>
      {children}
    </div>
  ),
  Image: ({ preview, src }) => (
    <img
      data-testid="image-preview"
      src={src}
      style={{ display: preview.visible ? "block" : "none" }}
    />
  ),
}));

jest.mock("../../assets/StoreAsset/StoreAsset", () => ({
  UploadIcon: () => <div data-testid="upload-icon">Upload Icon</div>,
}));

describe("UploadFileCommon Component", () => {
  const mockProps = {
    props: {
      action: "https://www.mock-url.com/upload",
    },
    imgInfo: [],
    values: {
      imgFileTypes: [".png", ".jpg"],
    },
    loading: false,
  };

  const renderComponent = (additionalProps = {}) => {
    return render(
      <UploadFileCommon {...{ ...mockProps, ...additionalProps }} />
    );
  };

  test("renders UploadFileCommon component with upload icon and messages", () => {
    renderComponent();

    expect(screen.getByTestId("upload-icon")).toBeInTheDocument();
    expect(screen.getByText(msgs.upload)).toBeInTheDocument();
    expect(screen.getByText(msgs.supportedFormat)).toBeInTheDocument();
  });

  test("shows loading spinner when loading is true", () => {
    renderComponent({ loading: true });

    expect(screen.getByTestId("spin")).toBeInTheDocument();
  });

  test("does not show loading spinner when loading is false", () => {
    renderComponent({ loading: false });

    expect(screen.queryByTestId("spin")).not.toBeInTheDocument();
  });

  test("upload component accepts correct file types", () => {
    renderComponent();

    expect(screen.getByTestId("upload")).toHaveAttribute(
      "accept",
      mockProps.values.imgFileTypes.toString()
    );
  });
});
  