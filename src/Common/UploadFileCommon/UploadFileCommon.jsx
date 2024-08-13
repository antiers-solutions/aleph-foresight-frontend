/**
 * UploadFileCommon Component
 *
 * A reusable upload file component that supports multiple file uploads,
 * image preview, and loading state.
 *
 * @param {object} allProps - Component props
 * @param {object} allProps.props - Upload component props
 * @param {array} allProps.imgInfo - List of uploaded images
 * @param {object} allProps.values - List of File types to be uploaded
 * @param {boolean} allProps.loading - Loading state
 *
 *
 */
import React, { useState } from "react";
import { Image, Spin, Upload } from "antd";
import "./UploadFileCommon.scss";
import { msgs } from "../../utils/appConstants";
import { UploadIcon } from "../../assets/StoreAsset/StoreAsset";

function UploadFileCommon(allProps) {
  const { props, imgInfo, values, loading } = allProps;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  return (
    <>
      <Spin spinning={loading}>
        <Upload
          {...props}
          name="img"
          listType="picture-card"
          multiple={true}
          fileList={imgInfo}
          onPreview={handlePreview}
          accept={values?.imgFileTypes?.toString()}
        >
          <p className="ant-upload-drag-icon">
            <UploadIcon /> {msgs.upload}
          </p>
          <p className="ant-upload-text">{msgs.supportedFormat}</p>
          {previewImage ? (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          ) : null}
        </Upload>
      </Spin>
    </>
  );
}

export default UploadFileCommon;
