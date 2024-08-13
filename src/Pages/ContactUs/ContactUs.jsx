/**
 * ContactUs component: Handles user input for sending a message.
 *
 */
import React, { useState } from "react";
import InputCustom from "../../Common/InputCustom/InputCustom";
import { FormikProvider, useFormik } from "formik";
import "./ContactUs.scss";
import { msgs } from "../../utils/appConstants";
import { creatMarket } from "../../utils/validationSchema";
import { initialValues } from "../CreateMarket/createMarket.helper";
import CustomTextBox from "../../Common/CustomTextBox/CustomTextBox";
import { ButtonCustom } from "../../Common/ButtonCustom/ButtonCustom";

function ContactUs() {
  const [previewOpen, setPreviewOpen] = useState(false);

  const formik = useFormik({
    onSubmit,
    initialValues: creatMarket?.initialValues(initialValues),
    validationSchema: creatMarket?.validationSchema(initialValues),
  });

  function onSubmit() {
    setPreviewOpen(true);
    formik.setSubmitting(false);
  }
  return (
    <FormikProvider value={formik}>
      <div className="container ContactUs">
        <h2>{msgs.contactUs}</h2>
        <InputCustom
          name="name"
          label={msgs.fullName}
          placeholder="Enter Name"
        />
        <InputCustom
          name="email"
          label={msgs.emailAddress}
          placeholder={msgs.enterEmail}
        />
        <div className="commonTextArea">
          <label>{msgs.msg}</label>
          <CustomTextBox name="message" placeholder={msgs.writeHere} />
        </div>
        <ButtonCustom label={msgs.send} />
      </div>
    </FormikProvider>
  );
}

export default ContactUs;
