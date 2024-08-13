import { message } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { apiUrls } from "../api/apiUrls";
import UseGetApi from "../api/makeRequest";
import ProfileImg from "../assets/BlueLogo.svg";
import { profile } from "../utils/validationSchema";
import { handleImgUpload } from "../utils/helpers/commonHelper";
import { values as fileTypes, antdPopupConstant } from "../utils/appConstants";

const useEditUserDetails = ({ userDetails, closeModal }) => {
  const [profileImg, setProfileImg] = useState(ProfileImg);

  /**
   * API call to update user details.
   *
   * @param {object} values - Form values.
   * @param {function} resetForm - Function to reset the form.
   * @param {function} setSubmitting - Function to set submitting state.
   */
  const apiCall = async (values, resetForm, setSubmitting) => {
    try {
      const formData = new FormData();

      const { img, userName, chainId } = values;
      const currentUserName = userDetails?.name;
      const currentUserId = userDetails?.ensID;

      if (img) {
        if (typeof img !== "string") {
          formData.append("file", img, img.name);
        }
      }

      if (userName && userName !== currentUserName) {
        formData.append("userName", userName);
      }
      // enable in future
      // if (chainId && chainId !== currentUserId) {
      //   formData.append("ensId", chainId);
      // }

      const res = await UseGetApi(apiUrls?.profileUpload(), "put", formData, {
        "Content-Type": "multipart/form-data",
      });

      if (res?.data) {
        resetForm();
        setProfileImg(ProfileImg);
        closeModal({
          img: res.data.img,
          userName: userName,
        });
        message.success({ content: res.data.message });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Form submission handler.
   *
   * @param {object} values - Form values.
   * @param {object} actions - Form actions.
   */
  const onSubmit = (values, { resetForm, setSubmitting }) => {
    apiCall(values, resetForm, setSubmitting);
  };

  /**
   * Formik instance.
   */
  const formik = useFormik({
    initialValues: profile?.initialValues(),
    validationSchema: profile?.validationSchema,
    onSubmit,
  });

  /**
   * Upload props.
   */
  const props = {
    id: "img",
    name: "img",
    showUploadList: false,
    accept: fileTypes?.imgFileTypes?.toString(),
    async onChange(info) {
      try {
        if (info?.fileList[0]) {
          const response = await handleImgUpload(info);
          if (!response?.error) {
            setProfileImg(response?.data);
            formik.setFieldValue("img", info?.file?.originFileObj);
          } else {
            message.error({ content: response?.msg, key: antdPopupConstant });
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    onRemove() {
      setProfileImg(ProfileImg);
      formik.setFieldValue("img", "");
    },
  };

  /**
   * Effect to set initial form values.
   */
  useEffect(() => {
    formik.setFieldValue("userName", userDetails?.name);
    formik.setFieldValue("img", userDetails?.img);
    formik.setFieldValue("chainId", userDetails?.ensId || "");
    setProfileImg(userDetails?.img);
  }, [userDetails]);

  return {
    props,
    profileImg,
    formik,
    setProfileImg,
  };
};

export default useEditUserDetails;
